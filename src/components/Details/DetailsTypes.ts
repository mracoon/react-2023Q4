import { Nullable } from '../../types/apiDataTypes';

export interface IDetailsOutletContext {
  detailCardId: Nullable<number>;
  cardClickHandler: (id: Nullable<number>) => void;
}
