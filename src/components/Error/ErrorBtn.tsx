import { Component, ReactNode } from 'react';

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
      throw new Error('some error');
    }
    return (
      <>
        <button
          className="bg-red-800 text-white font-medium rounded-lg text-sm px-4 py-2"
          onClick={this.makeErr.bind(this)}
        >
          Error
        </button>
      </>
    );
  }
}
