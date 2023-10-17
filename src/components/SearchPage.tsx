import { Component, ReactNode } from 'react';
import SearchBar from './SearchBar';
import { RequestItem } from '../types/apiDataTypes';
import ResultsContainer from './ResultsContainer';
import ErrorBoundary from './ErrorBoundary';

type ISearchPageState = { data: RequestItem[]; isLoading: boolean; isError: boolean };

export default class SearchPage extends Component<Record<string, never>, ISearchPageState> {
  constructor(props = {}) {
    super(props);
    this.state = { data: [], isLoading: false, isError: false };
  }

  change(data: RequestItem[], isError: boolean = false) {
    this.setState({ data, isError });
  }

  loading(isLoading: boolean) {
    this.setState({ isLoading });
  }

  makeError() {
    this.setState({ isError: true });
  }

  render(): ReactNode {
    return (
      <div className="search-page-content">
        <ErrorBoundary>
          <SearchBar change={this.change.bind(this)} loading={this.loading.bind(this)}></SearchBar>

          {this.state.isLoading && (
            <span className="loading loading-infinity w-40  text-primary"></span>
          )}
          {!this.state.isLoading && (
            <ResultsContainer cardsData={this.state.data}></ResultsContainer>
          )}
        </ErrorBoundary>
      </div>
    );
  }
}
