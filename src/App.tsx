import './App.css';
import ErrorBoundary from './components/Error/ErrorBoundary';
import { Routes, Route } from 'react-router-dom';
import { SearchPageLayout } from './components/SearchPageLayout';
import ResultsContainer from './components/ResultsContainer/ResultsContainer';
import { Details } from './components/Details/Details';

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
          <Route path="/*" element={<h1>Page not found</h1>}></Route>
        </Routes>
      </ErrorBoundary>
    </>
  );
};

export default App;
