#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Created on Sat Mar 28 17:31:14 2020

@author: phg17
"""

import matplotlib.pyplot as plt
import matplotlib.cm
import pandas as pd
import csv
from mpl_toolkits.basemap import Basemap
from matplotlib.patches import Polygon
from matplotlib.collections import PatchCollection
from matplotlib.colors import Normalize
import numpy as np

#%% Import Data

api = overpy.Overpass()
r = api.query("""
node
  [amenity=hospital]
  (49.724479188712984,-10.72265625,57.868131763328826,2.1533203125);
out;
out center;
""")
coords  = []
coords += [(float(node.lon), float(node.lat)) 
           for node in r.nodes]
coords += [(float(way.center_lon), float(way.center_lat)) 
           for way in r.ways]
coords += [(float(rel.center_lon), float(rel.center_lat)) 
           for rel in r.relations]




#%% Display the Data

with open('position_hospitals.csv','w', newline='') as csvfile:
    fieldnames = ['Name', 'Status', 'x', 'y']
    writer = csv.DictWriter(csvfile, fieldnames = fieldnames)
    writer.writeheader()
    for i in range(len(coords)):
        coor = coords[i]
        writer.writerow({'Name' : str(i), 'Status' : 'Not Registered', 'x' : coor[0], 'y' : coor[1]})

csvfile.close()

#%% Map Making

data_hospitals = pd.read_csv('position_hospitals.csv')

fig, ax = plt.subplots()

m=Basemap(resolution='i', #c,l,i,h,f or None
          projection='merc',
          lat_0=54.5, lon_0=-4.36,
          llcrnrlon = -11., llcrnrlat=49.5,urcrnrlon=2., urcrnrlat=59.2
          )


m.drawmapboundary(fill_color = '#46bcec')
m.fillcontinents(color='#f2f2f2',lake_color='#46bcec')
m.drawcoastlines()

def plot_area(data_hospitals):
    for j in range(len(data_hospitals)):
        color = data_hospitals.Color[j]
        x, y = m(data_hospitals['x'][j], data_hospitals['y'][j])
        color = color
        m.plot(x, y, 'o', markersize=1, color=color, alpha=0.8)
        m.plot(x, y, 'o', markersize=5, color=color, alpha=0.3)

plot_area(data_hospitals)
m.readshapefile('boundaries/Distribution/Areas','areas')
           


