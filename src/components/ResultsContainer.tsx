import { Component, ReactNode } from 'react';
import Card from './Card';
import { data } from '../data/data';

export default class ResultsContainer extends Component<{ value: string }, { status: boolean }> {
  constructor(props = { value: '' }) {
    super(props);
    this.state = {
      status: false,
    };
  }

  render(): ReactNode {
    return (
      <div className="result-container flex flex-col gap-y-2 ">
        {this.state.status && <p>loading...</p>}
        {data.data.map((data) => (
          <Card
            key={data.mal_id}
            src={data.images.webp.image_url}
            title={data.title}
            description={data.synopsis || 'no description'}
          ></Card>
        ))}
      </div>
    );
  }
}
