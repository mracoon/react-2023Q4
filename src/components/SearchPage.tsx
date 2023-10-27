import { Component } from 'react';
import SearchBar from './SearchBar/SearchBar';
import ResultsContainer from './ResultsContainer';
import ErrorBtn from './buttons/ErrorBtn';

interface ISearchPageState {
  searchVal: string;
}

export default class SearchPage extends Component<
  Record<string, never>,
  ISearchPageState
> {
  state: ISearchPageState = {
    searchVal: localStorage.getItem('mracoon-search-query') ?? '',
  };

  valChange(newVal: string) {
    this.setState({ searchVal: newVal });
  }

  render() {
    return (
      <div className="search-page-content flex flex-col items-center gap-4">
        <div className="w-full flex justify-between items-center gap-2 relative">
          <SearchBar valChange={this.valChange.bind(this)}></SearchBar>
          <ErrorBtn></ErrorBtn>
        </div>
        <ResultsContainer searchVal={this.state.searchVal}></ResultsContainer>
      </div>
    );
  }
}
