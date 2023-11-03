import { Component } from 'react';
import { BiErrorCircle } from 'react-icons/bi';
import ResponsiveButton from './ResponsiveButton';

interface IErrorButtonState {
  hasError: boolean;
}

export default class ErrorButton extends Component<
  Record<string, never>,
  IErrorButtonState
> {
  state: IErrorButtonState = { hasError: false };

  makeErr() {
    this.setState({ hasError: true });
  }

  render() {
    if (this.state.hasError) {
      throw new Error('test error');
    }
    return (
      <ResponsiveButton
        classes="bg-red-800"
        text="ERROR"
        icon={BiErrorCircle}
        onClickHandler={this.makeErr.bind(this)}
      />
    );
  }
}
