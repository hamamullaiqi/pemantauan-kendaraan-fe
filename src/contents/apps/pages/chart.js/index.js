import React from 'react'
import Chart from "react-apexcharts";

export default function ApexChart() {
    const opts = {
      
        colors: ['#4576b5', "#4d3a96"],
        chart: {
          type: 'line',
          id: "basic-bar",
          events: {
            click: (event, chartContext, config)=> console.log('yes', event,chartContext, config)
          },
          

        },
        markers: {
          size: [4, 7]
        },
        
        xaxis: {
          categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999],
        },
        plotOptions: {
            bar: {
              horizontal: false,
            },
          },
      }

      const opts2 = {
        colors: ['#4576b5', "#4d3a96"],
        chart: {
          id: "basic-bar",
          
          events: {
            click: (event, chartContext, config)=> console.log('yes', event,chartContext, config)
          },
          

        },
        markers: {
          size: [4, 7]
        },
        xaxis: {
          labels:{
            show:false,
          },
          categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999],
        },
        // yaxis:{
        //   show: false
        // },
        
          
        plotOptions: {
            bar: {
              horizontal: true,
            },
          },
          
      }

      const series =  [
        {
          type: 'line',
          name: "series-1",
          data: [30, 40, 45, 50, 49, 60, 70, 91]
        },
        {
          type: 'column',
          name: "series-2",
          data: [30, 40, 45, 50, 49, 60, 70, 91],
        }
      ]
      const series2 =  [
        {
          name: "series-1",
          data: [91, 70, 60, 50, 45, 40, 38, 1]
        }
      ]
  return (
    <div>
        <Chart
              options={opts}
              series={series}
              type="line"
              width="500"
            />
            <Chart
              options={opts2}
              series={series2}
              type="bar"
              width="500"
            />
    </div>
  )
}
