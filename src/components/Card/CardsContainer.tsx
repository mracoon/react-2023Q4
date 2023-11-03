import { Component } from 'react';
import { RequestItem } from '../../types/apiDataTypes';
import Card from './Card';

interface ICardsContainerProps {
  cardsData: RequestItem[];
}

export class CardsContainer extends Component<ICardsContainerProps> {
  render() {
    return (
      <div className="flex flex-wrap gap-2 justify-center">
        {this.props.cardsData.length ? (
          this.props.cardsData.map((data) => (
            <Card data={data} key={data.mal_id}></Card>
          ))
        ) : (
          <h2>no results</h2>
        )}
      </div>
    );
  }
}
