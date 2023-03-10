import React from 'react';

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { StockDetailPage } from './pages/StockDetailPage';
import { StockOverviewPage } from './pages/StockOverviewPage';
import { WatchListContextProvider } from './context/watchListContext';

import './App.css';

// use react router to render other components when page changes
// BrowserRouter since we are in the browser

function App () {
  return (
    <main className="container">
      <WatchListContextProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<StockOverviewPage />} />
            <Route path="/detail/:symbol" element={<StockDetailPage />} />
          </Routes>
        </BrowserRouter>
      </WatchListContextProvider>
    </main>

  );
}

export default App;