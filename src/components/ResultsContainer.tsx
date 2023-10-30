import { useEffect, useState } from 'react';
import { DataType, ReqPagination, RequestItem } from '../types/apiDataTypes';
import { ApiErrorMessage } from './Error/ApiErrorMessage';
import { CardsContainer } from './Card/CardsContainer';
import { useOutletContext, Outlet, useSearchParams } from 'react-router-dom';
import { Pagination } from './pagination/Pagination';

interface IApiErr {
  hasApiErr: boolean;
  errMessage?: string;
}
interface IResultsContainerProps {
  searchVal: string;
  page: number;
}
const ResultsContainer = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const [cardsData, setCardsData] = useState<RequestItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [apierr, setApiErr] = useState<IApiErr>({ hasApiErr: false });
  const [pagInfo, setPagInfo] = useState<ReqPagination>({
    last_visible_page: 1,
    has_next_page: false,
    current_page: 1,
    items: {
      count: 0,
      total: 0,
      per_page: 0,
    },
  });
  const { searchVal } = useOutletContext<IResultsContainerProps>();

  useEffect(() => {
    const pageQueryParameter = searchParams.get('page');
    if (!pageQueryParameter) {
      setSearchParams({
        page: localStorage.getItem('mracoon-pag-page') ?? '1',
      });
    }
  }, [searchParams, setSearchParams]);

  useEffect(() => {
    const pageQueryParameter = searchParams.get('page');

    const page1 = +(pageQueryParameter ?? 1);
    setIsLoading(true);
    setApiErr({ hasApiErr: false });
    const ctrl = new AbortController();
    fetch(
      `https://api.jikan.moe/v4/anime?page=${page1}&sfw&limit=3${
        '&q=' + searchVal
      }`,
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
        setPagInfo(data.pagination);
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
  }, [searchVal, searchParams]);

  return (
    <div className="flex flex-wrap flex-col gap-2 items-center w-full">
      {isLoading && <p className="loader"></p>}
      {apierr.hasApiErr && (
        <ApiErrorMessage message={apierr.errMessage ?? ''} />
      )}
      {!isLoading && !apierr.hasApiErr && (
        <>
          <CardsContainer cardsData={cardsData}></CardsContainer>
        </>
      )}

      <Pagination pagInfo={pagInfo}></Pagination>
      <Outlet></Outlet>
    </div>
  );
};
export default ResultsContainer;
