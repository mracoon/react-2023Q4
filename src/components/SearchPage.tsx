import { Component } from 'react';
import SearchBar from './SearchBar/SearchBar';
import ResultsContainer from './ResultsContainer';
import ErrorButton from './buttons/ErrorButton';

interface ISearchPageState {
  searchValue: string;
}

export default class SearchPage extends Component<
  Record<string, never>,
  ISearchPageState
> {
  state: ISearchPageState = {
    searchValue: localStorage.getItem('mracoon-search-query') ?? '',
  };

  valChange(newValue: string) {
    this.setState({ searchValue: newValue });
  }

  render() {
    return (
      <div className="search-page-content flex flex-col items-center gap-4">
        <div className="w-full flex justify-between items-center gap-2 relative">
          <SearchBar valChange={this.valChange.bind(this)}></SearchBar>
          <ErrorButton></ErrorButton>
        </div>
        <ResultsContainer
          searchValue={this.state.searchValue}
        ></ResultsContainer>
      </div>
    );
  }
}
