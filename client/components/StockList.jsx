import React from 'react';
import { useState, useEffect } from 'react';
import finnHub from './api/finnHub';

export const StockList = () => {
  const [stock, setStock] = useState();
  const [watchList, setWatchList] = useState(['GOOGL', 'MSFT', 'AMZN']);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responses = await Promise.all(watchList.map(stock => {
          return finnHub.get('/quote', {
            params: {
              symbol: stock
            }
          });
        }));
        const data = responses.map(res => {
          return {
            data: res.data,
            symbol: res.config.params.symbol,
          };
        });
        console.log(data);
        setStock(data);
      } catch(err) {
        console.log(err);
      }
    };
    fetchData();

  }, []);

  const columns = ['Name', 'Price', 'Day Change', 'Day % Change', 'High', 'Low', 'Open', 'Close'];
  const tableHeader = columns.map(col => {
    return <th key={col} scope="col">{col}</th>;
  });

  return <div>
    <table>
      <thead>
        <tr>
          {tableHeader}
        </tr>
      </thead>
    </table>
  </div>;
};