import { Nullable, RequestItem } from '../../types/apiDataTypes';

export interface ICardProps {
  data: RequestItem;
}

export interface ICardImgProps {
  src: Nullable<string>;
  title: string;
}

export interface ICardsContainerProps {
  cardsData: RequestItem[];
}
