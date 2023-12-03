import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { HashRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { setupStore } from './store/store';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <HashRouter>
    <Provider store={setupStore()}>
      <App />
    </Provider>
  </HashRouter>
);
