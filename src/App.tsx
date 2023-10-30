import './App.css';
import ErrorBoundary from './components/Error/ErrorBoundary';
import { Routes, Route } from 'react-router-dom';
import { SearchPageLayout } from './components/SearchPageLayout';
import ResultsContainer from './components/ResultsContainer';
import { Details } from './components/Details';

const App = () => {
  return (
    <>
      <ErrorBoundary>
        <Routes>
          <Route path="/" element={<SearchPageLayout />}>
            <Route path="/" element={<ResultsContainer />}>
              <Route path="/" element={<Details />}></Route>
            </Route>
          </Route>
        </Routes>
      </ErrorBoundary>
    </>
  );
};

export default App;
