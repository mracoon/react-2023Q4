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
      <div className="flex-center h-52 overflow-hidden">
        {this.state.isLoading && <div className="loader"></div>}
        <img
          style={{ display: this.state.isLoading ? 'none' : 'block' }}
          src={this.props.src ?? '../../2150693917.jpg'}
          alt={this.props.title}
          onLoad={() => {
            this.loadHandler.call(this);
          }}
        />
      </div>
    );
  }
}
