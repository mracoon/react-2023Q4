import '../styles/globals.css';
import '../components/buttons/buttons.css';
import '../components/ResultsContainer/resultsContainer.css';
import '../components/Card/Card.css';
import '../components/Limit/limit.css';
import '../components/Error/error.css';
import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import { setupStore } from '../store/store';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={setupStore()}>
      <Component {...pageProps} />
    </Provider>
  );
}
