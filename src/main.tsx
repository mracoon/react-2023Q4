import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import './components/buttons/buttons.css';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { setupStore } from './store/store';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <Provider store={setupStore()}>
      <App />
    </Provider>
  </BrowserRouter>
);
