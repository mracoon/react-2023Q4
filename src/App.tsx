import './App.css';
import ErrorBoundary from './components/Error/ErrorBoundary';
import { Routes, Route } from 'react-router-dom';
import MainPage from './pages/MainPage';
import UncontrolledFormPage from './pages/UncontrolledFormPage';
import ReactHookFormPage from './pages/ReactHookFormPage';
import Page404 from './pages/Page404';
import Layout from './components/Layout';

const App = () => {
  return (
    <>
      <ErrorBoundary>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<MainPage />} />
            <Route
              path="/uncontrolled-form"
              element={<UncontrolledFormPage />}
            />
            <Route path="/rhf" element={<ReactHookFormPage />} />
            <Route path="*" element={<Page404 />} />
          </Route>
        </Routes>
      </ErrorBoundary>
    </>
  );
};

export default App;
