import { Component, ReactNode } from 'react';
import './App.css';
import SearchBar from './components/SearchBar';
import ResultsContainer from './components/ResultsContainer';

export default class App extends Component {
  render(): ReactNode {
    return (
      <>
        <SearchBar></SearchBar>
        <ResultsContainer></ResultsContainer>
      </>
    );
  }
}
