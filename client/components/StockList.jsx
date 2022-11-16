import React from 'react';
import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import finnHub from './api/finnHub';
import { BsFillCaretDownFill, BsFillCaretUpFill } from 'react-icons/bs';
import {WatchListContext} from '../context/watchListContext';

export const StockList = () => {
  const [stock, setStock] = useState([]);
  const {watchList, deleteStock} = useContext(WatchListContext);
  const navigate = useNavigate();

  const changeColor = (change) => {
    return change > 0 ? 'success' : 'danger';
  };

  const renderIcon = (change) => {
    return change > 0 ? <BsFillCaretUpFill /> : <BsFillCaretDownFill />;
  };

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
        setStock(data);
      } catch(err) {
        console.log(err);
      }
    };
    fetchData();

  }, [watchList]);


  const handleStockSelect = (symbol) => {
    navigate(`detail/${symbol}`);
  };

  const columns = ['Name', 'Price', 'Day Change', 'Day % Change', 'High', 'Low', 'Open', 'Close'];
  const tableHeader = columns.map(col => {
    return <th key={col} scope="col">{col}</th>;
  });
  return <div>
    <table className="table hover mt-5">
      <thead>
        <tr>
          {tableHeader}
        </tr>
      </thead>
      <tbody>
        {stock.map((stockData) => {
          return (
            <tr style={{cursor: 'pointer'}} onClick={() => handleStockSelect(stockData.symbol)}className="table-row" key={stockData.symbol}>
              <th scope="row">{stockData.symbol}</th>
              <td>{`$${stockData.data.c.toFixed(2)}`}</td>
              <td className={`text-${changeColor(stockData.data.d)}`}>{`$${stockData.data.d}`}{renderIcon(stockData.data.d)}</td>
              <td className={`text-${changeColor(stockData.data.dp)}`}>{`${stockData.data.dp.toFixed(2)}%`}{renderIcon(stockData.data.dp)}</td>
              <td>{`$${stockData.data.h.toFixed(2)}`}</td>
              <td>{`$${stockData.data.l.toFixed(2)}`}</td>
              <td>{`$${stockData.data.o.toFixed(2)}`}</td>
              <td>{`$${stockData.data.pc.toFixed(2)}`}
                <button className='btn btn-danger btn-sm ml-3 d-inline-block delete-button'
                  onClick={(e) => {
                    e.stopPropagation();
                    deleteStock(stockData.symbol);}
                  }
                >Remove
                </button></td>
            </tr>
          );
        })}
      </tbody>
    </table>
  </div>;
};