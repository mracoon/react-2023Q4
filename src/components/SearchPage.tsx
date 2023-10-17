import { Component, ReactNode } from 'react';
import SearchBar from './SearchBar';
import { RequestItem } from '../types/apiDataTypes';
import ResultsContainer from './ResultsContainer';

type ISearchPageState = { data: RequestItem[]; isLoading: boolean };

export default class SearchPage extends Component<Record<string, never>, ISearchPageState> {
  constructor(props = {}) {
    super(props);
    this.state = { data: [], isLoading: false };
  }

  change(data: RequestItem[]) {
    this.setState({ data });
  }

  loading(isLoading: boolean) {
    this.setState({ isLoading });
  }

  render(): ReactNode {
    return (
      <div className="search-page-content">
        <SearchBar change={this.change.bind(this)} loading={this.loading.bind(this)}></SearchBar>
        <ResultsContainer cardsData={this.state.data}></ResultsContainer>
      </div>
    );
  }
}
