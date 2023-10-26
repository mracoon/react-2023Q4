import { Component } from 'react';
import { IconType } from 'react-icons/lib';

interface IRespBtnProps {
  classes?: string;
  text: string;
  icon: IconType;
  onClickHandler: () => void;
}

export default class ResponsiveBtn extends Component<IRespBtnProps> {
  render() {
    return (
      <button
        className={`btn ${this.props.classes ?? ''}`}
        onClick={this.props.onClickHandler}
      >
        {<this.props.icon className="block sm:hidden" />}
        <span className="hidden sm:block">{this.props.text}</span>
      </button>
    );
  }
}
