import { Component, ReactNode } from 'react';
import './App.css';
import SearchPage from './components/SearchPage';

export default class App extends Component {
  render(): ReactNode {
    return (
      <>
        <h1>Hello</h1>
        <SearchPage></SearchPage>
      </>
    );
  }
}
