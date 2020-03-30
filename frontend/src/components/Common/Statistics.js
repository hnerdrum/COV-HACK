import React, { useEffect } from  'react';
import {XYPlot, LineSeries, VerticalGridLines, HorizontalGridLines, XAxis, YAxis, DiscreteColorLegend, MarkSeries} from 'react-vis';
import '../../../node_modules/react-vis/dist/style.css';

const Statistics = () => {

  // plot 1
  const data_plot1 = [
      {x: 0, y: 220},
      {x: 1, y: 250},
      {x: 2, y: 230},
      {x: 3, y: 225},
      {x: 4, y: 217},
      {x: 5, y: 190},
      {x: 6, y: 185},
      {x: 7, y: 163},
      {x: 8, y: 150},
      {x: 9, y: 140},
    ];

    const data_plot1_projection = [
      {x: 9, y: 140},
      {x: 10, y: 150},
      {x: 11, y: 152},
      {x: 12, y: 144},
      {x: 13, y: 140},
      {x: 14, y: 138},
    ]

    const data_plo1_hospital2 = [
        {x: 0, y: 100},
        {x: 1, y: 105},
        {x: 2, y: 99},
        {x: 3, y: 90},
        {x: 4, y: 84},
        {x: 5, y: 76},
        {x: 6, y: 50},
        {x: 7, y: 40},
        {x: 8, y: 37},
        {x: 9, y: 32},
    ];

    const data_plot1_hospital_2_projection = [
      {x: 9, y: 32},
      {x: 10, y: 29},
      {x: 11, y: 25},
      {x: 12, y: 23},
      {x: 13, y: 22},
      {x: 14, y: 19},
    ]

    // plot 2
    const data_plot2 = [
        {x: 0, y: 10},
        {x: 1, y: 20},
        {x: 2, y: 50},
        {x: 3, y: 63},
        {x: 4, y: 70},
        {x: 5, y: 90},
        {x: 6, y: 150},
        {x: 7, y: 190},
        {x: 8, y: 242},
        {x: 9, y: 255},
      ];

      const data_plot2_projection = [
        {x: 9, y: 255},
        {x: 10, y: 290},
        {x: 11, y: 350},
        {x: 12, y: 410},
        {x: 13, y: 480},
        {x: 14, y: 510},
      ]

      const data_plot2_hospital2 = [
          {x: 0, y: 10},
          {x: 1, y: 22},
          {x: 2, y: 36},
          {x: 3, y: 55},
          {x: 4, y: 68},
          {x: 5, y: 90},
          {x: 6, y: 110},
          {x: 7, y: 120},
          {x: 8, y: 130},
          {x: 9, y: 145},
      ];

      const data_plot2_hospital_2_projection = [
        {x: 9, y: 145},
        {x: 10, y: 155},
        {x: 11, y: 160},
        {x: 12, y: 180},
        {x: 13, y: 205},
        {x: 14, y: 225},
      ]

      var scatter_data_1 = [
        {x: 60, y: 55, size: 15},
      ]

      var scatter_data_2 = [
        {x: 5, y: 110, size: 10},
      ]

      var scatter_data_3 = [
        {x: 15, y: 200, size: 10},
      ]

      var vertical_line_data = [
        {x: 40, y: 0},
        {x: 40, y: 250},
      ]

      var horizontal_line_data = [
        {x: 0, y: 125},
        {x: 80, y: 125},
      ]

  return (
    <div className="plot-wrapper">
      <div className="row">
        <div id="plot1" className="col plot">
          <DiscreteColorLegend
          width={180}
          items={["St. Judes", "St.Judes predicton", "St. Patricks", "St. Patricks prediction"]}
          />
          <XYPlot width={300} height={250}>
              <VerticalGridLines />
              <HorizontalGridLines />
              <XAxis title="Time in days" titlePosition="middle-under" style={{
                title: {fontSize: '14px'}
              }}/>
            <YAxis title="Masks available" titlePosition="middle-under" style={{
                title: {fontSize: '14px'}
              }}/>
            <LineSeries data={data_plot1} />
            <LineSeries strokeStyle={"dashed"} data={data_plot1_projection} />
              <LineSeries data={data_plo1_hospital2} />
              <LineSeries strokeStyle={"dashed"} data={data_plot1_hospital_2_projection} />
        </XYPlot>
        </div>
        <div id="plot2" className="col plot">
          <DiscreteColorLegend
          width={180}
          items={["St. Judes", "St.Judes predicton", "St. Patricks", "St. Patricks prediction"]}
          />
          <XYPlot width={300} height={250}>
              <VerticalGridLines />
              <HorizontalGridLines />
              <XAxis title="Time in days" titlePosition="middle-under" style={{
                title: {fontSize: '14px'}
              }}/>
            <YAxis title="Masks in use" titlePosition="middle-under" style={{
                title: {fontSize: '14px'}
              }}/>
            <LineSeries data={data_plot2} />
              <LineSeries strokeStyle={"dashed"} data={data_plot2_projection} />
                <LineSeries data={data_plot2_hospital2} />
                <LineSeries strokeStyle={"dashed"} data={data_plot2_hospital_2_projection} />
          </XYPlot>
        </div>
        <div id="plot3" className="col plot">
          <DiscreteColorLegend
          width={180}
          items={["St. Judes", "St. Patricks", "St. Johns"]}
          />
        <XYPlot className="plot3inner" xDomain={[0, 80]} yDomain={[0, 250]} width={300} height={250}>
              <VerticalGridLines />
              <HorizontalGridLines />
              <XAxis title="Available" titlePosition="middle-under" style={{
                title: {fontSize: '14px'}
              }}/>
            <YAxis title="In use" titlePosition="middle-under" style={{
                title: {fontSize: '15px'}
              }}/>
              <MarkSeries
                className="Hospital status"
                sizeRange={[5, 15]}
                data={scatter_data_1}/>
              <MarkSeries
                className="Hospital status"
                sizeRange={[5, 15]}
                data={scatter_data_2}/>
              <MarkSeries
                className="Hospital status"
                sizeRange={[5, 15]}
                data={scatter_data_3}/>
              <LineSeries color={"black"} data={vertical_line_data} />
              <LineSeries color={"black"} data={horizontal_line_data} />
          </XYPlot>
        </div>
      </div>
    </div>
  )
};

export default Statistics;
