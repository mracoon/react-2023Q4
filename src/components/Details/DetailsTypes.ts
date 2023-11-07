import { Nullable } from '../../types/apiDataTypes';

export interface IDetailsProps {
  detailCardId: Nullable<number>;
  cardClickHandler: (id: Nullable<number>) => void;
}
