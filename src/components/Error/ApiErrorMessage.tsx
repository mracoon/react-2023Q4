import { Component } from 'react';
import { BiError } from 'react-icons/bi';
import './error.css';

interface IApiErrorMessageProps {
  message: string;
}

export class ApiErrorMessage extends Component<IApiErrorMessageProps> {
  render() {
    return (
      <div className="api-warn">
        <BiError />
        <span>{this.props.message}. Try again</span>
      </div>
    );
  }
}
