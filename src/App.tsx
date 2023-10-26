import './App.css';
import SearchPage from './components/SearchPage';
import ErrorBoundary from './components/Error/ErrorBoundary';

const App = () => {
  return (
    <>
      <ErrorBoundary>
        <SearchPage></SearchPage>
      </ErrorBoundary>
    </>
  );
};

export default App;
