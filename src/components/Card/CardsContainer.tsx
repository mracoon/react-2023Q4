import { Nullable, RequestItem } from '../../types/apiDataTypes';
import Card from './Card';

export const CardsContainer = ({
  cardsData,
  cardClickHandler,
}: {
  cardsData: RequestItem[];
  cardClickHandler: (id: Nullable<number>) => void;
}) => {
  return (
    <div className="flex flex-wrap gap-2 justify-center w-full flex-grow">
      {cardsData.length ? (
        cardsData.map((data) => (
          <div
            className="card max-w-xs w-full py-2"
            key={data.mal_id}
            onClick={(e: React.MouseEvent) => {
              e.stopPropagation();
              cardClickHandler(data.mal_id);
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
