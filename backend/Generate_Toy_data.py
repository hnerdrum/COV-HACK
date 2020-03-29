#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Created on Sat Mar 28 23:45:42 2020

@author: phg17

This program does not reflect the finished algorithm as it was not optimized for 
bigger database and does not use optimization algorithm for the repartition
of the supplies. This algorithm only demonstrates the interest of the product
for a small-world problem.

"""

import numpy as np
import matplotlib.pyplot as plt
import pandas as pd
import os.path as path
import datetime
import plotly.graph_objects as go
import plotly.express as px
from plotly.offline import plot
import plotly.express as px
import csv


path_hospital = 'hospital_data'

l = 30
add = 5
time = np.arange(l+add)

x = []
x_add= [datetime.datetime(year = 2019, month=4, day=30)]
for i in range(l):
    x.append(datetime.datetime(year = 2019, month=4, day=i+1))
for i in range(1,1+add):
    x_add.append(datetime.datetime(year = 2019, month=5, day=i))



A = np.zeros([4,l])
B = np.zeros([4,l])
C = np.zeros([4,l])

A_add = np.zeros([4,add+1])
B_add = np.zeros([4,add+1])
C_add = np.zeros([4,add+1])

A_status = ['green']
B_status = ['green']
C_status = ['green']
A_null = np.zeros([3,l])
B_null = np.zeros([3,l])
C_null = np.zeros([3,l])

base_number_A = 100
base_number_B = 250
base_number_C = 150

init_A = 5
init_B = 5
init_C = 5

reserve_buffer_A = 40
reserve_buffer_B = 30
reserve_buffer_C = 50

critical_supply_A = 20
critical_supply_B = 30
critical_supply_C = 10

#Masks Evolution
critical_patients_A_add = (np.exp(time/25)-1)*7 + np.random.randn(l+add) * 3
critical_patients_B_add = (np.exp(time/190)-1)*10 + np.random.randn(l+add) * 3
critical_patients_C_add = (np.exp(time/60)-1)*10 + np.random.randn(l+add) * 3

#Gloves Evolution
#critical_patients_A_add = (np.exp(time/35)-1)*9 + np.random.randn(l+add) * 3
#critical_patients_B_add = (np.exp(time/160)-1)*10 + np.random.randn(l+add) * 3
#critical_patients_C_add = (np.exp(time/80)-1)*5 + np.random.randn(l+add) * 3

critical_patients_A = critical_patients_A_add[0:30]
critical_patients_B = critical_patients_B_add[0:30]
critical_patients_C = critical_patients_C_add[0:30]

noise_exchange = 30

#plt.plot(critical_patients_A)
#plt.plot(critical_patients_B)
#plt.plot(critical_patients_C)

#%% Initialization

A_null[:,0]=[critical_patients_A[0]+init_A, base_number_A-critical_patients_A[0], base_number_A]
B_null[:,0]=[critical_patients_B[0]+init_B, base_number_B-critical_patients_B[0], base_number_B]
C_null[:,0]=[critical_patients_C[0]+init_C, base_number_C-critical_patients_C[0], base_number_C]

for i in range(1,l):
    A_null[0,i] = A_null[0,i-1] + critical_patients_A[i] 
    A_null[1,i] = base_number_A - A_null[0,i]
    A_null[2,i] = base_number_A
    B_null[0,i] = B_null[0,i-1] + critical_patients_B[i] 
    B_null[1,i] = base_number_B - B_null[0,i]
    B_null[2,i] = base_number_B
    C_null[0,i] = C_null[0,i-1] + critical_patients_C[i] 
    C_null[1,i] = base_number_C - C_null[0,i]
    C_null[2,i] = base_number_C 

'''
plt.figure()
plt.plot(A_null.T)
plt.figure()
plt.plot(B_null.T)
plt.figure()
plt.plot(C_null.T)
'''
#%% Actual Evolution

A_status = ['green']
B_status = ['green']
C_status = ['green']

change_A = 0
change_B = 0
change_C = 0

A[:,0]=[critical_patients_A[0]+init_A, reserve_buffer_A - init_A, base_number_A - reserve_buffer_A -critical_patients_A[0],base_number_A]
B[:,0]=[critical_patients_B[0]+init_B, reserve_buffer_A - init_B, base_number_B - reserve_buffer_B -critical_patients_B[0],base_number_B]
C[:,0]=[critical_patients_C[0]+init_C, reserve_buffer_A - init_C, base_number_C - reserve_buffer_C -critical_patients_C[0],base_number_C]

for i in range(1,l):
    #Number of beds in each hospital before update
    A[3,i] = A[3,i-1]
    B[3,i] = B[3,i-1]
    C[3,i] = C[3,i-1]
    
    #Update status in each hospital
    A[0,i] = A[0,i-1] + critical_patients_A[i]
    if critical_patients_A[i] < A[2,i-1]:
        A[2,i] = A[2,i-1] - critical_patients_A[i]
        A[1,i] = A[1,i-1]
        A_status.append('green')
    else:
        A[2,i] = 0
        A[1,i] = A[1,i-1] + A[2,i-1] - critical_patients_A[i]
        if A[1,i] < critical_supply_A:
            A_status.append('red')
        else:
            A_status.append('orange')

        
    B[0,i] = B[0,i-1] + critical_patients_B[i]
    if critical_patients_B[i] < B[2,i-1]:
        B[2,i] = B[2,i-1] - critical_patients_B[i]
        B[1,i] = B[1,i-1]
        B_status.append('green')
    else:
        B[2,i] = 0
        B[1,i] = B[1,i-1] + B[2,i-1] - critical_patients_B[i]
        if B[1,i] < critical_supply_B:
            B_status.append('red')
        else:
            B_status.append('orange')
        
    C[0,i] = C[0,i-1] + critical_patients_C[i]
    if critical_patients_C[i] < C[2,i-1]:
        C[2,i] = C[2,i-1] - critical_patients_C[i]
        C[1,i] = C[1,i-1]
        C_status.append('green')
    else:
        C[2,i] = 0
        C[1,i] = C[1,i-1] + C[2,i-1] - critical_patients_C[i]
        if C[1,i] < critical_supply_C:
            C_status.append('red')
        else:
            C_status.append('orange')    
    
    #Check if a Hospital Needs Help
    if (A_status[i], B_status[i], C_status[i]).count('red') != 0:
        #Identify the need of each hospital(unoptimized)
        #print('jambon ' + str(i))
        if A_status[i] == 'red':
            change_A = A[1,i] - critical_supply_A - np.random.randint(0,noise_exchange)
        if B_status[i] == 'red':
            change_B = B[1,i] - critical_supply_B - np.random.randint(0,noise_exchange)
        if C_status[i] == 'red':
            change_B = B[1,i] - critical_supply_C - np.random.randint(0,noise_exchange)
        if A_status[i] == 'green':
            change_A = A[2,i]
        if B_status[i] == 'green':
            change_B = B[2,i]
        if C_status[i] == 'green':
            change_B = B[2,i]
        
        if np.sum([change_A, change_B, change_C]) > 0:
            if A_status[i] == 'red':
                A[1,i] = critical_supply_A + np.random.randint(0,noise_exchange)
                #A[3,i] += 20 + np.random.randint(0,noise_exchange)
            if B_status[i] == 'red':
                B[1,i] = critical_supply_B + np.random.randint(0,noise_exchange)
                #B[3,i] += 20 + np.random.randint(0,noise_exchange)
            if C_status[i] == 'red':
                C[1,i] = critical_supply_C + np.random.randint(0,noise_exchange)
                #C[3,i] += 20 + np.random.randint(0,noise_exchange)

            if (A_status[i], B_status[i], C_status[i]).count('green') == 1:
                if A_status[i] == 'green':
                    A[2,i] = np.sum([change_A, change_B, change_C])
                    #A[3,i] += np.min([change_B,change_C,change_B + change_C]) 
                if B_status[i] == 'green':
                    B[2,i] = np.sum([change_A, change_B, change_C])
                    #B[3,i] += np.min([change_A,change_C,change_A + change_C])
                if C_status[i] == 'green':
                    C[2,i] = np.sum([change_A, change_B, change_C])
                    #C[3,i] += np.min([change_B,change_A,change_B + change_A])
                    
            elif (A_status[i], B_status[i], C_status[i]).count('green') == 2:

                if A_status[i] == 'red':
                    ratio = B[2,i]/C[2,i]
                    B[2,i] += change_A * ratio / (1+ratio) 
                    C[2,i] += change_A / (1+ratio) 
                    #B[3,i] += np.min([change_A,change_C,change_C + change_A])/2
                    #C[3,i] += np.min([change_A,change_B,change_B + change_A])/2
                if B_status[i] == 'red':
                    A[2,i] += change_B * ratio / (1+ratio) 
                    C[2,i] += change_B / (1+ratio) 
                    #A[3,i] += np.min([change_B,change_C,change_C + change_B])/2
                    #C[3,i] += np.min([change_A,change_B,change_B + change_A])/2
                if C_status[i] == 'red':
                    B[2,i] += change_C * ratio / (1+ratio) 
                    A[2,i] += change_C / (1+ratio) 
                    #B[3,i] += np.min([change_A,change_C,change_C + change_A])/2
                    #A[3,i] += np.min([change_B,change_C,change_C + change_B])/2
    A[3,i] = np.sum([A[0,i],A[1,i],A[2,i]])
    B[3,i] = np.sum([B[0,i],B[1,i],B[2,i]])
    C[3,i] = np.sum([C[0,i],C[1,i],C[2,i]])


'''
plt.figure()
plt.plot(A[0,:])
plt.plot(A[3,:])

plt.figure()
plt.plot(B[0,:])
plt.plot(B[3,:])

plt.figure()
plt.plot(C[0,:])
plt.plot(C[3,:])
'''

#%% Next Steps

A_add[:,0] = A[:,29]
B_add[:,0] = B[:,29]
C_add[:,0] = C[:,29]

for i in range(1,add+1):
    A_add[3,i] = A_add[3,i-1]
    B_add[3,i] = B_add[3,i-1]
    C_add[3,i] = C_add[3,i-1]
    
    
    A_add[0,i] = A_add[0,i-1] + critical_patients_A_add[29 + i] 
    if A_add[2,i-1] > critical_patients_A_add[29 + i]: 
        A_add[2,i] = A_add[2,i-1] - critical_patients_A_add[29 + i]
    else:
        A_add[2,i] = 0
        A_add[1,i] = np.max([0,A_add[1,i-1] - critical_patients_A_add[29 + i]])
        
        
    B_add[0,i] = B_add[0,i-1] + critical_patients_B_add[29 + i] 
    if B_add[2,i-1] > critical_patients_B_add[29 + i]: 
        B_add[2,i] = B_add[2,i-1] - critical_patients_B_add[29 + i]
    else:
        B_add[2,i] = 0
        B_add[1,i] = np.max([0,B_add[1,i-1] - critical_patients_B_add[29 + i]])
        
        
    C_add[0,i] = C_add[0,i-1] + critical_patients_C_add[29 + i] 
    if C_add[2,i-1] > critical_patients_C_add[29 + i]: 
        C_add[2,i] = C_add[2,i-1] - critical_patients_C_add[29 + i]
    else:
        C_add[2,i] = 0
        C_add[1,i] = np.max([0,C_add[1,i-1] - critical_patients_C_add[29 + i]])
    


#%% In Use
                    
fig = go.Figure()
fig.add_trace(go.Scatter(x=x, y = A[0,:], name = "Hospital A", line_color='red', opacity=0.8))
fig.add_trace(go.Scatter(x=x, y = B[0,:], name = "Hospital B", line_color='green', opacity=0.8))
fig.add_trace(go.Scatter(x=x, y = C[0,:], name = "Hospital C", line_color='orange', opacity=0.8))

fig.add_trace(go.Scatter(x=x_add, y = A_add[0,:], name = "Hospital A projection", line_color='red', opacity=0.3))
fig.add_trace(go.Scatter(x=x_add, y = B_add[0,:], name = "Hospital B projection", line_color='green', opacity=0.3))
fig.add_trace(go.Scatter(x=x_add, y = C_add[0,:], name = "Hospital C projection", line_color='orange', opacity=0.3))


fig.update_layout(xaxis_range=[datetime.datetime(2019, 4, 1),datetime.datetime(2019, 5, add+1)],
                    title_text = 'In Use')
plot(fig)

fig.write_html("Figures/Masks_Used.html")

#%% Available

fig = go.Figure()
fig.add_trace(go.Scatter(x=x, y = A[2,:], name = "Hospital A", line_color='red', opacity=0.8))
fig.add_trace(go.Scatter(x=x, y = B[2,:], name = "Hospital B", line_color='green', opacity=0.8))
fig.add_trace(go.Scatter(x=x, y = C[2,:], name = "Hospital C", line_color='orange', opacity=0.8))

fig.add_trace(go.Scatter(x=x_add, y = A_add[2,:], name = "Hospital A projection", line_color='red', opacity=0.3))
fig.add_trace(go.Scatter(x=x_add, y = B_add[2,:], name = "Hospital B projection", line_color='green', opacity=0.3))
fig.add_trace(go.Scatter(x=x_add, y = C_add[2,:], name = "Hospital C projection", line_color='orange', opacity=0.3))


fig.update_layout(xaxis_range=[datetime.datetime(2019, 4, 1),datetime.datetime(2019, 5, add+1)],
                    title_text = 'Available')
plot(fig)

fig.write_html("Figures/Masks_Available.html")

#%% Create CSV

with open('hospital_A.csv', 'w' ,newline='') as csvfile:
    fieldnames = ['In use','Reserved','Available', 'Status', 'Time']
    writer = csv.DictWriter(csvfile, fieldnames=fieldnames)
    writer.writeheader()
    for i in range(l):
        writer.writerow({'In use' : A[0,i],'Reserved' : A[1,i],'Available' : A[2,i], 'Status' : A_status[i], 'Time' : x[i]})       


with open('hospital_B.csv', 'w' ,newline='') as csvfile:
    fieldnames = ['In use','Reserved','Available', 'Status', 'Time']
    writer = csv.DictWriter(csvfile, fieldnames=fieldnames)
    writer.writeheader()
    for i in range(l):
        writer.writerow({'In use' : B[0,i],'Reserved' : B[1,i],'Available' : B[2,i], 'Status' : B_status[i], 'Time' : x[i]})       


with open('hospital_C.csv', 'w' ,newline='') as csvfile:
    fieldnames = ['In use','Reserved','Available', 'Status', 'Time']
    writer = csv.DictWriter(csvfile, fieldnames=fieldnames)
    writer.writeheader()
    for i in range(l):
        writer.writerow({'In use' : C[0,i],'Reserved' : C[1,i],'Available' : C[2,i], 'Status' : C_status[i], 'Time' : x[i]})       

with open('latest_update.csv', 'w' ,newline='') as csvfile:
    fieldnames = ['Name', 'In use','Reserved','Available', 'Status', 'Time', 'Size']
    writer = csv.DictWriter(csvfile, fieldnames=fieldnames)
    writer.writeheader()
    writer.writerow({'Name' : 'Hospital A' , 'In use' : A[0,-1],'Reserved' : A[1,-1],'Available' : A[2,-1], 'Status' : A_status[-1], 'Time' : x[-1], 'Size' : 7})
    writer.writerow({'Name' : 'Hospital B' , 'In use' : B[0,-1],'Reserved' : B[1,-1],'Available' : B[2,-1], 'Status' : B_status[-1], 'Time' : x[-1], 'Size' : 7})
    writer.writerow({'Name' : 'Hospital C' , 'In use' : C[0,-1],'Reserved' : C[1,-1],'Available' : C[2,-1], 'Status' : C_status[-1], 'Time' : x[-1], 'Size' : 7})       



hosp_A = pd.read_csv('hospital_A.csv')
hosp_B = pd.read_csv('hospital_B.csv')
hosp_C = pd.read_csv('hospital_C.csv')
status = pd.read_csv('latest_update.csv')

#%% Availability vs In Use

fig = px.scatter(status, x="Available", y="In use", color="Available",
                 color_continuous_scale=["red", "orange", "green"], size = 'Size', hover_name = 'Name')

fig.update_layout(coloraxis_showscale=False, title_text = 'Hospitals Status')
plot(fig)
fig.write_html("Figures/Masks_Status.html")

#%% Nicer Vizualization
'''
fig = go.Figure(data = [go.Scatter(x=x, y = A[0,:])])
fig.update_layout(xaxis_range=[datetime.datetime(2019, 4, 1),datetime.datetime(2019, 4, 30)],
                    title_text = 'Occupied Beds')
plot(fig)

#%% Nicerer Vizu

fig = go.Figure()
fig.add_trace(go.Scatter(x=x, y = A[0,:], name = "Occupied Beds", line_color='red', opacity=0.8))
fig.add_trace(go.Scatter(x=x, y = A[1,:], name = "Reserved Beds", line_color='orange', opacity=0.8))
fig.add_trace(go.Scatter(x=x, y = A[2,:], name = "Available Beds", line_color='green', opacity=0.8))
fig.add_trace(go.Scatter(x=x, y = A[3,:], name = "Total Beds", line_color='blue', opacity=0.8))

fig.update_layout(xaxis_range=[datetime.datetime(2019, 4, 1),datetime.datetime(2019, 4, 30)],
                    title_text = 'Hospital A')
plot(fig)



fig = go.Figure()
fig.add_trace(go.Scatter(x=x, y = B[0,:], name = "Occupied Beds", line_color='red', opacity=0.8))
fig.add_trace(go.Scatter(x=x, y = B[1,:], name = "Reserved Beds", line_color='orange', opacity=0.8))
fig.add_trace(go.Scatter(x=x, y = B[2,:], name = "Available Beds", line_color='green', opacity=0.8))
fig.add_trace(go.Scatter(x=x, y = B[3,:], name = "Total Beds", line_color='blue', opacity=0.8))

fig.update_layout(xaxis_range=[datetime.datetime(2019, 4, 1),datetime.datetime(2019, 4, 30)],
                    title_text = 'Hospital B')
plot(fig)



fig = go.Figure()
fig.add_trace(go.Scatter(x=x, y = C[0,:], name = "Occupied Beds", line_color='red', opacity=0.8))
fig.add_trace(go.Scatter(x=x, y = C[1,:], name = "Reserved Beds", line_color='orange', opacity=0.8))
fig.add_trace(go.Scatter(x=x, y = C[2,:], name = "Available Beds", line_color='green', opacity=0.8))
fig.add_trace(go.Scatter(x=x, y = C[3,:], name = "Total Beds", line_color='blue', opacity=0.8))

fig.update_layout(xaxis_range=[datetime.datetime(2019, 4, 1),datetime.datetime(2019, 4, 30)],
                    title_text = 'Hospital C')
plot(fig)


#%% Nicererer Vizu

fig = go.Figure()

for i in range(l-1):
    fig.add_trace(go.Scatter(x=[x[i],x[i+1]], y = [A[0,i],A[0,i+1]], name = A_status[i],  line_color = A_status[i], opacity = 0.8))
    
fig.add_trace(go.Scatter(x=x, y = A[3,:], name = A_status[i],  line_color = 'black', opacity = 1))

plot(fig)


fig = go.Figure()

for i in range(l-1):
    fig.add_trace(go.Scatter(x=[x[i],x[i+1]], y = [B[0,i],B[0,i+1]], name = B_status[i],  line_color = B_status[i], opacity = 0.8))

fig.add_trace(go.Scatter(x=x, y = B[3,:], name = B_status[i],  line_color = 'black', opacity = 1))

plot(fig)


fig = go.Figure()

for i in range(l-1):
    fig.add_trace(go.Scatter(x=[x[i],x[i+1]], y = [C[0,i],C[0,i+1]], name = C_status[i],  line_color = C_status[i], opacity = 0.8))

fig.add_trace(go.Scatter(x=x, y = C[3,:], name = C_status[i],  line_color = 'black', opacity = 1))

plot(fig)


#%% All three hospitals

fig = go.Figure()
fig.add_trace(go.Scatter(x=x, y = A[0,:], name = "A", line_color='red', opacity=0.8))
fig.add_trace(go.Scatter(x=x, y = B[0,:], name = "B", line_color='orange', opacity=0.8))
fig.add_trace(go.Scatter(x=x, y = C[0,:], name = "C", line_color='green', opacity=0.8))


fig.update_layout(xaxis_range=[datetime.datetime(2019, 4, 1),datetime.datetime(2019, 4, 30)],
                    title_text = 'Hospital A')
plot(fig)

'''