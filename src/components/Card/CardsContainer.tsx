import { RequestItem } from '../../types/apiDataTypes';
import Card from './Card';

export const CardsContainer = ({ cardsData }: { cardsData: RequestItem[] }) => {
  return (
    <div className="flex flex-wrap gap-2 justify-center">
      {cardsData.length ? (
        cardsData.map((data) => <Card data={data} key={data.mal_id}></Card>)
      ) : (
        <h2>no results</h2>
      )}
    </div>
  );
};
