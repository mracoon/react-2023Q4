import { useEffect, useState } from 'react';
import { DataType, RequestItem } from '../types/apiDataTypes';
import { ApiErrorMessage } from './Error/ApiErrorMessage';
import { CardsContainer } from './Card/CardsContainer';

interface IApiErr {
  hasApiErr: boolean;
  errMessage?: string;
}
interface IResultsContainerProps {
  searchVal: string;
}
const ResultsContainer = ({ searchVal }: IResultsContainerProps) => {
  const [cardsData, setCardsData] = useState<RequestItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [apierr, setApiErr] = useState<IApiErr>({ hasApiErr: false });

  useEffect(() => {
    setIsLoading(true);
    setApiErr({ hasApiErr: false });
    const ctrl = new AbortController();
    fetch(
      `https://api.jikan.moe/v4/anime?page=1&sfw&limit=6${'&q=' + searchVal}`,
      {
        signal: ctrl.signal,
      }
    )
      .then((res) => {
        return res.json();
      })
      .then((data: DataType) => {
        setCardsData(data.data);
        setIsLoading(false);
      })
      .catch((err: Error) => {
        const isAbortErr = err.name === 'AbortError';
        setCardsData([]);
        setIsLoading(isAbortErr);
        if (isAbortErr) {
          return;
        }
        setApiErr({
          hasApiErr: true,
          errMessage: `${err.name}: ${err.message}`,
        });
      });
    return () => {
      ctrl.abort();
    };
  }, [searchVal]);

  return (
    <div className="flex flex-wrap flex-col gap-2 items-center w-full">
      {isLoading && <p className="loader"></p>}
      {apierr.hasApiErr && (
        <ApiErrorMessage message={apierr.errMessage ?? ''} />
      )}

      {!isLoading && !apierr.hasApiErr && (
        <CardsContainer cardsData={cardsData}></CardsContainer>
      )}
    </div>
  );
};
export default ResultsContainer;
