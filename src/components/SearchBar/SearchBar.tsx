import { ChangeEvent, Component, KeyboardEvent } from 'react';
import { AiOutlineSearch } from 'react-icons/ai';
import ResponsiveBtn from '../buttons/ResponsiveBtn';

interface ISearchProps {
  valChange: (val: string) => void;
}

interface ISearchState {
  val: string;
}

export default class SearchBar extends Component<ISearchProps, ISearchState> {
  constructor(props: ISearchProps) {
    super(props);
    this.state = {
      val: localStorage.getItem('mracoon-search-query') ?? '',
    };
    this.handlerChange = this.handlerChange.bind(this);
    this.handlerEnter = this.handlerEnter.bind(this);
    this.submitHandler = this.submitHandler.bind(this);
  }

  handlerChange(e: ChangeEvent<HTMLInputElement>) {
    this.setState({ val: e.target.value });
  }

  submitHandler() {
    const searchVal = this.state.val.trim();
    localStorage.setItem('mracoon-search-query', searchVal);
    this.props.valChange(searchVal);
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
    );
  }
}
