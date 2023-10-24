import { Component, ReactNode } from 'react';
import { BiErrorCircle } from 'react-icons/bi';

interface IErrBtnState {
  hasError: boolean;
}

export default class ErrorBtn extends Component<
  Record<string, never>,
  IErrBtnState
> {
  state: IErrBtnState = { hasError: false };

  makeErr() {
    this.setState({ hasError: true });
  }

  render(): ReactNode {
    if (this.state.hasError) {
      throw new Error('test error');
    }
    return (
      <button className="btn bg-red-800" onClick={this.makeErr.bind(this)}>
        <BiErrorCircle className="block sm:hidden " />
        <span className="hidden sm:block">ERROR</span>
      </button>
    );
  }
}
