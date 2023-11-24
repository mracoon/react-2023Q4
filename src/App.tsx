import './App.css';
import ErrorBoundary from './components/Error/ErrorBoundary';
import { Routes, Route } from 'react-router-dom';

const App = () => {
  return (
    <>
      <ErrorBoundary>
        <Routes>
          <Route path="/" element={<h1>Main page</h1>} />
        </Routes>
      </ErrorBoundary>
    </>
  );
};

export default App;
