import React from 'react';

import { AutoComplete } from '../components/AutoComplete';
import { StockList } from '../components/StockList';

export const StockOverviewPage = () => {
  return <div>
    StockOverviewPage
    <AutoComplete />
    <StockList />
  </div>;
};