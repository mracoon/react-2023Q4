import React from 'react';
import { CardsDataContext } from '../ResultsContainer/ResultsContainer';
import Card from './Card';
import { ICardsContainerProps } from './CardTypes';
import { useContext } from 'react';

export const CardsContainer = ({ cardClickHandler }: ICardsContainerProps) => {
  const cardsData = useContext(CardsDataContext);
  return (
    <div className="flex flex-wrap gap-2 justify-center w-full flex-grow">
      {cardsData.length ? (
        cardsData.map((data) => (
          <div
            className="card max-w-xs w-full py-2"
            key={data.mal_id}
            onClick={(event: React.MouseEvent) => {
              event.stopPropagation();
              cardClickHandler(`${data.mal_id}`);
            }}
          >
            <Card data={data}></Card>
          </div>
        ))
      ) : (
        <h2>no results</h2>
      )}
    </div>
  );
};
