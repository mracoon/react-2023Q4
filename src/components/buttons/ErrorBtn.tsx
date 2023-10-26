import { Component } from 'react';
import { BiErrorCircle } from 'react-icons/bi';
import ResponsiveBtn from './ResponsiveBtn';

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

  render() {
    if (this.state.hasError) {
      throw new Error('test error');
    }
    return (
      <ResponsiveBtn
        classes="bg-red-800"
        text="ERROR"
        icon={BiErrorCircle}
        onClickHandler={this.makeErr.bind(this)}
      />
    );
  }
}
