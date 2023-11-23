import '../styles/globals.css';
import '../components/buttons/buttons.css';
import '../components/ResultsContainer/resultsContainer.css';
import '../components/Card/Card.css';
import '../components/Limit/limit.css';
import '../components/Error/error.css';
import type { AppProps } from 'next/app';
import Head from 'next/head';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <link rel="icon" type="image/svg+xml" href="/ghost.png" />
        <title>Anime Search</title>
      </Head>
      <Component {...pageProps} />
    </>
  );
}
