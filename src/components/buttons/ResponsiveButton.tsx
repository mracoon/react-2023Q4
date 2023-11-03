import { Component } from 'react';
import { IconType } from 'react-icons/lib';

interface IResponsiveButtonProps {
  classes?: string;
  text: string;
  icon: IconType;
  onClickHandler: () => void;
}

export default class ResponsiveButton extends Component<IResponsiveButtonProps> {
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
