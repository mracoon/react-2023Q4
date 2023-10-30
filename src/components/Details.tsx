import { useOutletContext } from 'react-router-dom';
import { Nullable } from '../types/apiDataTypes';

export const Details = () => {
  const detailCardId = useOutletContext<Nullable<number>>();

  return <h1>{detailCardId}</h1>;
};
