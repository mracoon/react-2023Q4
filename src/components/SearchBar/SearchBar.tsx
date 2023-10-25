import { ChangeEvent, Component, KeyboardEvent } from 'react';
import { DataType, RequestItem } from '../../types/apiDataTypes';
import { ApiErrorMessage } from '../Error/ApiErrorMessage';
import { AiOutlineSearch } from 'react-icons/ai';
import ResponsiveBtn from '../buttons/ResponsiveBtn';

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
  controller: AbortController;
  constructor(props: ISearchProps) {
    super(props);
    this.state = {
      val: localStorage.getItem('mracoon-search-query') ?? '',
      data: [],
      hasApiErr: false,
    };
    this.handlerChange = this.handlerChange.bind(this);
    this.handlerEnter = this.handlerEnter.bind(this);
    this.submitHandler = this.submitHandler.bind(this);
    this.controller = new AbortController();
  }

  getSearchData(page = 1, limit = 6) {
    fetch(
      `https://api.jikan.moe/v4/anime?page=${page}&sfw&limit=${limit}${
        this.state.val ? '&q=' + this.state.val : ''
      }`,
      { signal: this.controller.signal }
    )
      .then((res) => {
        return res.json();
      })
      .then((data: DataType) => {
        this.props.change(data.data);
        this.props.loading(false);
      })
      .catch((err: Error) => {
        const isAbortErr = err.name === 'AbortError';
        this.props.change([]);
        this.props.loading(isAbortErr);
        if (isAbortErr) {
          return;
        }
        this.setState({
          hasApiErr: true,
          errMessage: `${err.name}: ${err.message}`,
        });
      });
  }

  handlerChange(e: ChangeEvent<HTMLInputElement>) {
    this.setState({ val: e.target.value });
  }

  async submitHandler() {
    this.controller.abort();
    this.controller = new AbortController();
    localStorage.setItem('mracoon-search-query', this.state.val.trim());
    this.setState({ hasApiErr: false });
    this.props.loading(true);
    this.getSearchData();
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
            className="block w-full p-4 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50"
            type="search"
            placeholder="Search anime"
            onChange={this.handlerChange}
            onKeyUp={this.handlerEnter}
            value={this.state.val}
          />
          <ResponsiveBtn
            classes="bg-indigo-600"
            text="Search"
            icon={AiOutlineSearch}
            onClickHandler={this.submitHandler.bind(this)}
          />
        </div>

        {this.state.hasApiErr && (
          <ApiErrorMessage message={this.state.errMessage ?? ''} />
        )}
      </>
    );
  }
}
