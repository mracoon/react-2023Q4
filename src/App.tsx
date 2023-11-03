import { Component } from 'react';
import './App.css';
import SearchPage from './components/SearchPage';
import ErrorBoundary from './components/Error/ErrorBoundary';

export default class App extends Component {
  render() {
    return (
      <>
        <ErrorBoundary>
          <SearchPage></SearchPage>
        </ErrorBoundary>
      </>
    );
  }
}
