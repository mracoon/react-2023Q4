import { Component, ReactNode } from 'react';
import SearchBar from './SearchBar/SearchBar';
import { RequestItem } from '../types/apiDataTypes';
import ResultsContainer from './ResultsContainer';
import ErrorBoundary from './Error/ErrorBoundary';
import ErrorBtn from './buttons/ErrorBtn';

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
          <div className="w-full flex justify-between items-center gap-2 relative">
            <SearchBar
              change={this.change.bind(this)}
              loading={this.loading.bind(this)}
            ></SearchBar>
            <ErrorBtn></ErrorBtn>
          </div>

          {this.state.isLoading && <p className="loader"></p>}
          {!this.state.isLoading && (
            <ResultsContainer cardsData={this.state.data}></ResultsContainer>
          )}
        </ErrorBoundary>
      </div>
    );
  }
}
