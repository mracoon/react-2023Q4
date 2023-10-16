import { Component, ReactNode } from 'react';

export default class Card extends Component<{ src: string; title: string; description: string }> {
  render(): ReactNode {
    return (
      <div className="flex border-solid border-2 border-indigo-600">
        <img src={this.props.src} alt="12"></img>
        <div className="flex flex-col">
          <h3>{this.props.title}</h3>
          <p>{this.props.description}</p>
        </div>
      </div>
    );
  }
}
