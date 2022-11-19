// alphavantage key:  95IGNNAI43KPVOBM


import React from 'react';
import { useState, useEffect, useContext } from 'react';
import finnHub from './api/finnHub';
import { WatchListContext } from '../context/watchListContext';

export const AutoComplete = () => {
  const [search, setSearch] = useState('');
  const [results, setResults] = useState([]);
  const {addStock} = useContext(WatchListContext);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await finnHub.get('/search', {
          params: {
            q: search
          }
        });
        const commonStock = response.data.result.filter(stock => {
          return stock.type === 'Common Stock';
        });
        setResults(commonStock);
      } catch(err) {
        console.log(err);
      }
    };

    // reset search state so that when nothing is typed, it is empty
    if (search.length > 0) {
      fetchData();
    } else {
      setResults([]);
    }
  }, [search]);

  const renderDropdown = () => {
    const dropDown = search ? 'show' : null;
    const searchResults = results.map((item, i) => {
      return <li onClick={() => {
        addStock(item.symbol);
        setSearch('');
      }}
      key={i}className="dropdown-item">{item.description} - ({item.symbol})</li>;
    });

    return (
      <ul
        className={`dropdown-menu ${dropDown}`}
        style= {{
          width: '100%',
          maxHeight:'300px',
          overflowY: 'scroll',
          cursor: 'pointer',
        }}
      >
        {searchResults}
      </ul>
    );
  };

  // search bar
  return <div className="w-50 p-5 rounded mx-auto">
    <div className="form-floating dropdown">
      <input
        style={{backgroundColor: 'rgba(145, 158, 171, 0.04)'}}
        id="search"
        type="text"
        className="form-control"
        placeholder="search"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      >
      </input>

      <label htmlFor="search">Search for stocks</label>
      {renderDropdown()}
    </div>
  </div>;
};