import { ChangeEvent, Component, KeyboardEvent, ReactNode } from 'react';
import searchIcon from '../../assets/search.svg';
import { DataType, RequestItem } from '../../types/apiDataTypes';
import { ApiErrorMessage } from '../Error/ApiErrorMessage';

interface ISearchProps {
  change: (data: RequestItem[]) => void;
  loading: (isLoading: boolean) => void;
}

interface ISearchState {
  val: string;
  data: RequestItem[];
  hasApiErr: boolean;
  errMessage?: string;
}

export default class SearchBar extends Component<ISearchProps, ISearchState> {
  constructor(props: ISearchProps) {
    super(props);
    this.state = {
      val: localStorage.getItem('maracoon-serch-query') ?? '',
      data: [],
      hasApiErr: false,
    };
    this.handlerChange = this.handlerChange.bind(this);
    this.handlerEnter = this.handlerEnter.bind(this);
    this.submitHandler = this.submitHandler.bind(this);
  }

  handlerChange(e: ChangeEvent<HTMLInputElement>) {
    this.setState({ val: e.target.value });
  }

  submitHandler() {
    localStorage.setItem('maracoon-serch-query', this.state.val.trim());
    this.setState({ hasApiErr: false });
    this.props.loading(true);
    fetch(
      `https://api.jikan.moe/v4/anime?page=1&sfw${
        this.state.val ? '&q=' + this.state.val : ''
      }`
    )
      .then((res) => {
        return res.json();
      })
      .then((data: DataType) => {
        this.props.change(data.data);
      })
      .catch((err: Error) => {
        this.setState({
          hasApiErr: true,
          errMessage: `${err.name}: ${err.message}`,
        });
        this.props.change([]);
      })
      .finally(() => {
        this.props.loading(false);
      });
  }

  componentDidMount(): void {
    this.submitHandler();
  }

  handlerEnter(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter' && e.target instanceof HTMLInputElement) {
      this.setState({ val: e.target.value });
      this.submitHandler.call(this);
    }
  }

  render(): ReactNode {
    return (
      <>
        <div className="relative w-full">
          <img
            src={searchIcon}
            alt="serchIcon"
            className="absolute inset-4 pointer-events-none w-4 h-4 text-gray-500 dark:text-gray-400"
          />
          <input
            className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:border-primary"
            type="search"
            placeholder="Search anime"
            onChange={this.handlerChange}
            onKeyUp={this.handlerEnter}
            value={this.state.val}
          />
          <button
            className="btn-primary text-white absolute right-2.5 bottom-2.5 font-medium rounded-lg text-sm px-4 py-2"
            onClick={this.submitHandler.bind(this)}
          >
            Search
          </button>
        </div>
        {this.state.hasApiErr && (
          <ApiErrorMessage message={this.state.errMessage ?? ''} />
        )}
      </>
    );
  }
}
