import { Component, ReactNode } from 'react';
import Card from './Card';
import { RequestItem } from '../types/apiDataTypes';

type IResultsContainerProps = { cardsData: RequestItem[] };

export default class ResultsContainer extends Component<IResultsContainerProps> {
  render(): ReactNode {
    return (
      <div className="result-container flex flex-col gap-y-2 ">
        {this.props.cardsData.map((data) => (
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
