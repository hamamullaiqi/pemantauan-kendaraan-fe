import { Button, Typography, DatePicker } from 'antd'
import dayjs from 'dayjs';
import moment from 'moment/moment';
import React, { useState } from 'react';
import * as tf from '@tensorflow/tfjs';
import { dataSemple } from './data';
import timeseries from 'timeseries-analysis'
const { RangePicker } = DatePicker;
const setupForecast = require('nostradamus').memo 

const holtWinters = require('holtwinters')
export default function Home() {

const data=dataSemple.map((item)=>(item.totalChw))
const lgPredict = 4


// const getAugumentedDataset  = holtWinters.get

// const result = 
// console.log(result);
// console.log(data);
// const train = new timeseries.main(data)
// const LWMA = train.lwma({period:2}).save('LWMA')
// // const ma = train.ma({period: 365}).save('moving average')
// console.log(LWMA);
// // console.log(ma);

  

  

  const [date, setDate] = useState([dayjs("2023-01", "YYYY-MM"), dayjs("2023-05", "YYYY-MM")])
  return (
    <div >
        <Typography>Home</Typography>
        <Button onClick={()=>{
          const result = holtWinters(data,lgPredict)
          console.log(result);
        }} type='primary' >Button</Button>
        <RangePicker picker="month" value={date} onChange={(dt)=> setDate(dt)} />
    </div>

  )
}
