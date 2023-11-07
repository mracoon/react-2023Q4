import './App.css';
import ErrorBoundary from './components/Error/ErrorBoundary';
import { Routes, Route } from 'react-router-dom';
import { SearchPageLayout } from './components/SearchPageLayout';
import ResultsContainer from './components/ResultsContainer/ResultsContainer';

const App = () => {
  return (
    <>
      <ErrorBoundary>
        <Routes>
          <Route path="/" element={<SearchPageLayout />}>
            <Route path="/" element={<ResultsContainer />} />
          </Route>
          <Route path="/*" element={<h1>Page not found</h1>} />
        </Routes>
      </ErrorBoundary>
    </>
  );
};

export default App;
