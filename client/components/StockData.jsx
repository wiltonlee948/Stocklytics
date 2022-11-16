import React from 'react';
import { useEffect, useState } from 'react';
import finnHub from './api/finnHub';

export const StockData = ({symbol}) => {
  const [stockData, setStockData] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responses = await finnHub.get('/stock/profile2', {
          params: {
            symbol: symbol
          }
        });
        setStockData(responses.data);
      } catch(err) {
        console.log(err);
      }
    };
    fetchData();
  },[symbol]);

  const colRow = [];

  if (stockData) {
    const spanNames = ['name:', 'country:', 'ticker:', 'Exchange:', 'Industry:', 'IPO:', 'MarketCap:', 'Shares Outstanding:', 'url:'];
    const results = ['name', 'country', 'ticker', 'exchange', 'finnhubIndustry', 'ipo', 'marketCapitalization', 'shareOutstanding', 'weburl'];
    for (let i = 0; i < 9; i++) {
      if (i === 8) {
        colRow.push(<div key={i}><span className='fw-bold'>{spanNames[i]} </span><a href={stockData[results[i]]}>{stockData[results[i]]}</a></div>);
      } else {
        colRow.push(<div key={i}><span className='fw-bold'>{spanNames[i]} </span>{stockData[results[i]]}</div>);
      }
    }
  }

  return <div>
    {stockData && (
      <div className='row border bg-white rounded shadow-sm p-4 mt-5'>
        <div className='col'>{colRow.slice(0,3)}</div>
        <div className='col'>{colRow.slice(3,6)}</div>
        <div className='col'>{colRow.slice(6,9)}</div>
      </div>
    )}
  </div>;
};