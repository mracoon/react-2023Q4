import { Component } from 'react';
import { Nullable } from 'vitest';

interface ICardImgProps {
  src: Nullable<string>;
  title: string;
}

interface ICardImgState {
  isLoading: boolean;
}

export class CardImg extends Component<ICardImgProps, ICardImgState> {
  state: ICardImgState = {
    isLoading: true,
  };

  loadHandler() {
    this.setState({ isLoading: false });
  }

  render() {
    return (
      <figure className="h-52 items-center ">
        {this.state.isLoading && (
          <span className="loading loading-dots loading-lg"></span>
        )}
        <img
          style={{ display: this.state.isLoading ? 'none' : 'block' }}
          src={this.props.src ?? '../../2150693917.jpg'}
          alt={this.props.title}
          onLoad={() => {
            this.loadHandler.call(this);
          }}
        />
      </figure>
    );
  }
}
