import React from 'react';
import {createContext, useState} from 'react';
import axios from 'axios';

export const WatchListContext = createContext();

export const WatchListContextProvider = (props) => {
  const [watchList, setWatchList] = useState(['GOOGL', 'MSFT', 'AMZN']);


  const addStock = (stock) => {
    if (watchList.indexOf(stock) === -1) {
      setWatchList([...watchList, stock]);
    }
    fetch('/api', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(watchList)
    })
      .then(data => data.json())
      .then(res => console.log(res))
      .catch(err => console.log(err));
  };
  
  const deleteStock = (stock) => {
    setWatchList(watchList.filter(ele => {
      return ele !== stock;
    }));
  };
  return <WatchListContext.Provider value={{watchList, addStock, deleteStock}}>
    {props.children}
  </WatchListContext.Provider>;
};
