import React from 'react';
import Chart from 'react-apexcharts';
import { useState } from 'react';

export const StockChart = ({chartData, symbol}) => {
  const {day, week, year } = chartData;
  const [dateFormat, setDateFormat] = useState('24h');

  // onclick changes the dateFormat state so we need to change data in series on line 54
  const determineTimeFormat = () => {
    switch(dateFormat) {
    case '24h':
      return day;
    case '7d':
      return week;
    case '1y':
      return year;
    default:
      return day;
    }
  };
  // if the stock price at beginning of date(day, week, year) is less than stock price at end of date than red, else green
  const color = determineTimeFormat()[0].y - determineTimeFormat()[determineTimeFormat().length - 1].y > 0 ? '#ed3419' : '#26C281';
  // apex graph setup
  const options = {
    colors: [color],
    title: {
      text: symbol,
      align: 'center',
      style: {
        fontSize: '24px'
      }
    },
    chart: {
      id: 'stock data',
      animations: {
        speed: 1300
      }
    },
    xaxis: {
      type: 'datetime',
      labels: {
        dateTimeUTC: false
      }
    },
    tooltop: {
      x: {
        format: 'MMM dd HH'
      }
    },
  };
  const series = [{
    name: symbol,
    data: determineTimeFormat()
  }];
  // when button is clicked fill button else background is white
  const renderButtonSelect = (button) => {
    const classes = 'btn m-1';
    if (button === dateFormat) {
      return classes +  ' btn-primary';
    } else {
      return classes + ' btn-outline-primary';
    }
  };

  return <div className='mt-5 p-4 shadow-sm bg-white'>
    <Chart options={options} series={series} type='area' width='100%' />
    <div>
      <button className={renderButtonSelect('24h')} onClick={() => setDateFormat('24h')}>24h</button>
      <button className={renderButtonSelect('7d')} onClick={() => setDateFormat('7d')}>7d</button>
      <button className={renderButtonSelect('1y')} onClick={() => setDateFormat('1y')}>1y</button>
    </div>
  </div>;
};