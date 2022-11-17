import React from 'react';
import {createContext, useState, useEffect, Component } from 'react';
import axios from 'axios';

export const WatchListContext = createContext();

export const WatchListContextProvider = (props) => {
  const [watchList, setWatchList] = useState(['GOOGL', 'AMZN', 'MSFT']);
  let list;

  const update = () => {
    fetch('/api', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(list)
    })
      .then(data => data.json())
      .then(res => console.log(res))
      .catch(err => console.log(err));
  };

  const addStock = (stock) => {
    if (watchList.indexOf(stock) === -1) {
      list = [...watchList, stock];
      setWatchList([...watchList, stock]);
    }
    // find a way to wait until setWatchList is over before running update
    update();
  };

  const deleteStock = (stock) => {
    list = watchList.filter(ele => {
      return ele !== stock;
    });
    setWatchList(watchList.filter(ele => {
      return ele !== stock;
    }));
    update();
  };

  useEffect(() => {
    const retrieve = async () => {
      try {
        const response = await fetch('/api');
        console.log('TEST', response);
      } catch(err) {
        console.log(err);
      }
    };
    retrieve();
  }, []);


  return <WatchListContext.Provider value={{watchList, addStock, deleteStock}}>
    {props.children}
  </WatchListContext.Provider>;
};
