import { ChangeEvent, Component, KeyboardEvent } from 'react';
import { DataType, RequestItem } from '../../types/apiDataTypes';
import { ApiErrorMessage } from '../Error/ApiErrorMessage';
import { AiOutlineSearch } from 'react-icons/ai';

interface ISearchProps {
  change: (data: RequestItem[]) => void;
  loading: (isLoading: boolean) => void;
}

interface ISearchState {
  val: string;
  data: RequestItem[];
  hasApiErr: boolean;
  errMessage?: string;
  isLoading: boolean;
}

export default class SearchBar extends Component<ISearchProps, ISearchState> {
  constructor(props: ISearchProps) {
    super(props);
    this.state = {
      val: localStorage.getItem('mracoon-search-query') ?? '',
      data: [],
      hasApiErr: false,
      isLoading: false,
    };
    this.handlerChange = this.handlerChange.bind(this);
    this.handlerEnter = this.handlerEnter.bind(this);
    this.submitHandler = this.submitHandler.bind(this);
  }

  handlerChange(e: ChangeEvent<HTMLInputElement>) {
    this.setState({ val: e.target.value });
  }

  submitHandler() {
    localStorage.setItem('mracoon-search-query', this.state.val.trim());
    this.setState({ hasApiErr: false, isLoading: true });
    this.props.loading(true);
    fetch(
      `https://api.jikan.moe/v4/anime?page=1&sfw&limit=6&${
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
        this.setState({ isLoading: false });
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

  render() {
    return (
      <>
        <div className=" w-full flex gap-2 justify-between items-center">
          <input
            className="block w-full p-4 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 disabled:cursor-wait"
            type="search"
            placeholder="Search anime"
            onChange={this.handlerChange}
            onKeyUp={this.handlerEnter}
            value={this.state.val}
            disabled={this.state.isLoading}
          />
          <button
            className="btn bg-indigo-600 disabled:cursor-wait"
            disabled={this.state.isLoading}
            onClick={this.submitHandler.bind(this)}
          >
            <AiOutlineSearch className="block sm:hidden" />
            <span className="hidden sm:block">Search</span>
          </button>
        </div>
        {this.state.hasApiErr && (
          <ApiErrorMessage message={this.state.errMessage ?? ''} />
        )}
      </>
    );
  }
}
