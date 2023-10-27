import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import './components/buttons/buttons.css';
import { BrowserRouter } from 'react-router-dom';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
