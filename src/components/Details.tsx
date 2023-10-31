import { useOutletContext, useSearchParams } from 'react-router-dom';
import { Nullable } from '../types/apiDataTypes';
import { useEffect } from 'react';

export const Details = () => {
  const detailCardId = useOutletContext<Nullable<number>>();
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    if (detailCardId) {
      searchParams.set('detail', `${detailCardId}`);
    } else {
      searchParams.delete('detail');
    }
    setSearchParams(searchParams);
  }, [detailCardId, searchParams, setSearchParams]);

  return <h1>{detailCardId}</h1>;
};
