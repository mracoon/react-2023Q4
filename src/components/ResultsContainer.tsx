import { Component } from 'react';
import { DataType, RequestItem } from '../types/apiDataTypes';
import { CardsContainer } from './Card/CardsContainer';
import { ApiErrorMessage } from './Error/ApiErrorMessage';

interface IApiErr {
  hasApiErr: boolean;
  errMessage?: string;
}
interface IResultsContainerProps {
  searchVal: string;
}

interface IResultsContainerState {
  cardsData: RequestItem[];
  isLoading: boolean;
  apierr: IApiErr;
}

export default class ResultsContainer extends Component<
  IResultsContainerProps,
  IResultsContainerState
> {
  ctrl: AbortController;
  constructor(props: IResultsContainerProps) {
    super(props);
    this.state = {
      cardsData: [],
      isLoading: false,
      apierr: { hasApiErr: false },
    };
    this.ctrl = new AbortController();
  }
  getNewSearchRes() {
    this.setState({ isLoading: true, apierr: { hasApiErr: false } });

    fetch(
      `https://api.jikan.moe/v4/anime?page=1&sfw&limit=6${
        '&q=' + this.props.searchVal
      }`,
      {
        signal: this.ctrl.signal,
      }
    )
      .then((res) => {
        return res.json();
      })
      .then((data: DataType) => {
        this.setState({ cardsData: data.data, isLoading: false });
      })
      .catch((err: Error) => {
        const isAbortErr = err.name === 'AbortError';
        this.setState({ cardsData: [], isLoading: isAbortErr });
        if (isAbortErr) {
          return;
        }
        this.setState({
          apierr: {
            hasApiErr: true,
            errMessage: `${err.name}: ${err.message}`,
          },
        });
      });
  }

  componentDidMount() {
    this.getNewSearchRes();
  }
  componentDidUpdate(prevProps: Readonly<IResultsContainerProps>): void {
    if (prevProps !== this.props) {
      this.ctrl.abort();
      this.ctrl = new AbortController();
      this.getNewSearchRes.call(this);
    }
  }

  componentWillUnmount() {
    this.ctrl.abort();
    this.ctrl = new AbortController();
  }

  render() {
    return (
      <div className="flex flex-wrap flex-col gap-2 items-center w-full">
        {this.state.isLoading && <p className="loader"></p>}
        {this.state.apierr.hasApiErr && (
          <ApiErrorMessage message={this.state.apierr.errMessage ?? ''} />
        )}

        {!this.state.isLoading && !this.state.apierr.hasApiErr && (
          <CardsContainer cardsData={this.state.cardsData}></CardsContainer>
        )}
      </div>
    );
  }
}
