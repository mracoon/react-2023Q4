import React from 'react';
import Card from './Card';
import { ICardsContainerProps } from './CardTypes';
import { useRouter } from 'next/router';

export const CardsContainer = ({ cardsData }: ICardsContainerProps) => {
  const router = useRouter();
  const { pathname, query } = router;

  return (
    <div className="flex flex-wrap gap-2 justify-center w-full flex-grow">
      {cardsData.length ? (
        cardsData.map((data) => (
          <div
            className="card max-w-xs w-full py-2"
            key={data.mal_id}
            onClick={() => {
              router.push({
                pathname,
                query: { ...query, details: `${data.mal_id}` },
              });
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
