import { Component } from 'react';
import { DataType, RequestItem } from '../types/apiDataTypes';
import { CardsContainer } from './Card/CardsContainer';
import { ApiErrorMessage } from './Error/ApiErrorMessage';

interface IApiError {
  hasApiError: boolean;
  errorMessage?: string;
}
interface IResultsContainerProps {
  searchValue: string;
}

interface IResultsContainerState {
  cardsData: RequestItem[];
  isLoading: boolean;
  apiError: IApiError;
}

export default class ResultsContainer extends Component<
  IResultsContainerProps,
  IResultsContainerState
> {
  controller: AbortController;
  constructor(props: IResultsContainerProps) {
    super(props);
    this.state = {
      cardsData: [],
      isLoading: false,
      apiError: { hasApiError: false },
    };
    this.controller = new AbortController();
  }
  getNewSearchResults() {
    this.setState({ isLoading: true, apiError: { hasApiError: false } });

    fetch(
      `https://api.jikan.moe/v4/anime?page=1&sfw&limit=6${
        '&q=' + this.props.searchValue
      }`,
      {
        signal: this.controller.signal,
      }
    )
      .then((response) => {
        return response.json();
      })
      .then((data: DataType) => {
        this.setState({ cardsData: data.data, isLoading: false });
      })
      .catch((error: Error) => {
        const isAbortErr = error.name === 'AbortError';
        this.setState({ cardsData: [], isLoading: isAbortErr });
        if (isAbortErr) {
          return;
        }
        this.setState({
          apiError: {
            hasApiError: true,
            errorMessage: `${error.name}: ${error.message}`,
          },
        });
      });
  }

  componentDidMount() {
    this.getNewSearchResults();
  }

  componentDidUpdate(prevProps: Readonly<IResultsContainerProps>): void {
    if (prevProps !== this.props) {
      this.controller.abort();
      this.controller = new AbortController();
      this.getNewSearchResults.call(this);
    }
  }

  componentWillUnmount() {
    this.controller.abort();
    this.controller = new AbortController();
  }

  render() {
    return (
      <div className="flex flex-wrap flex-col gap-2 items-center w-full">
        {this.state.isLoading && <p className="loader"></p>}
        {this.state.apiError.hasApiError && (
          <ApiErrorMessage message={this.state.apiError.errorMessage ?? ''} />
        )}

        {!this.state.isLoading && !this.state.apiError.hasApiError && (
          <CardsContainer cardsData={this.state.cardsData}></CardsContainer>
        )}
      </div>
    );
  }
}
