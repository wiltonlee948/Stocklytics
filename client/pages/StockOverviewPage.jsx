import React from 'react';
import wsb from '../docs/imgs/wsb-300.jpg';

import { AutoComplete } from '../components/AutoComplete';
import { StockList } from '../components/StockList';

export const StockOverviewPage = () => {
  return <div>
    <div className="mt-5 mb-3 d-flex justify-content-center"><h1>STONKS FOR DUMMIES</h1></div>
    <img className="rounded mx-auto d-block" src={wsb} />
    <AutoComplete />
    <StockList />
  </div>;
};