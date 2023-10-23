import { Component, ReactNode } from 'react';
import SearchBar from './SearchBar/SearchBar';
import { RequestItem } from '../types/apiDataTypes';
import ResultsContainer from './ResultsContainer';
import ErrorBoundary from './Error/ErrorBoundary';
import ErrorBtn from './Error/ErrorBtn';

interface ISearchPageState {
  data: RequestItem[];
  isLoading: boolean;
}

export default class SearchPage extends Component<
  Record<string, never>,
  ISearchPageState
> {
  state: ISearchPageState = { data: [], isLoading: false };

  change(data: RequestItem[]) {
    this.setState({ data });
  }

  loading(isLoading: boolean) {
    this.setState({ isLoading });
  }

  render(): ReactNode {
    return (
      <div className="search-page-content flex flex-col items-center gap-4">
        <ErrorBoundary>
          <ErrorBtn></ErrorBtn>

          <SearchBar
            change={this.change.bind(this)}
            loading={this.loading.bind(this)}
          ></SearchBar>

          {this.state.isLoading && <p className="loader"></p>}
          {!this.state.isLoading && (
            <ResultsContainer cardsData={this.state.data}></ResultsContainer>
          )}
        </ErrorBoundary>
      </div>
    );
  }
}
