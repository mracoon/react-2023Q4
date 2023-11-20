import React from 'react';
//import './App.css';
import ErrorBoundary from './components/Error/ErrorBoundary';
import { Routes, Route } from 'react-router-dom';
import { SearchPageLayout } from './components/SearchPageLayout';
import ResultsContainer from './components/ResultsContainer/ResultsContainer';
import { Page404 } from './components/Error/Page404';

const App = () => {
  return (
    <>
      <ErrorBoundary>
        <Routes>
          <Route path="/" element={<SearchPageLayout />}>
            <Route path="/" element={<ResultsContainer />} />
          </Route>
          <Route path="/*" element={<Page404 />} />
        </Routes>
      </ErrorBoundary>
    </>
  );
};

export default App;
