import { Component, ReactNode } from 'react';
import Card from './Card/Card';
import { RequestItem } from '../types/apiDataTypes';

interface IResultsContainerProps {
  cardsData: RequestItem[];
}

export default class ResultsContainer extends Component<IResultsContainerProps> {
  render(): ReactNode {
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
