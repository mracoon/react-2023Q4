import './App.css';
import ErrorBoundary from './components/Error/ErrorBoundary';
import { Routes, Route } from 'react-router-dom';
import { SearchPageLayout } from './components/SearchPageLayout';
import ResultsContainer from './components/ResultsContainer';

const App = () => {
  return (
    <>
      <ErrorBoundary>
        <Routes>
          <Route path="/" element={<SearchPageLayout />}>
            <Route path="/" element={<ResultsContainer />}>
              <Route path="/" element={<h1>detail</h1>}></Route>
            </Route>
          </Route>
        </Routes>
      </ErrorBoundary>
    </>
  );
};

export default App;
