import { useEffect, useState } from 'react';
import './resultsContainer.css';
import {
  DataType,
  Nullable,
  ReqPagination,
  RequestItem,
} from '../../types/apiDataTypes';
import { ApiErrorMessage } from '../Error/ApiErrorMessage';
import { CardsContainer } from '../Card/CardsContainer';
import { useOutletContext, Outlet, useSearchParams } from 'react-router-dom';
import { Pagination } from '../pagination/Pagination';
import { Limit } from '../Limit/Limit';
import { BASE_URL } from '../../utils/constants';

export interface IApiErr {
  hasApiErr: boolean;
  errMessage?: string;
}
interface IResultsContainerProps {
  searchVal: string;
  page: number;
}
const ResultsContainer = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [isNewQuery, setIsNewQuery] = useState(false);
  const [limit, setLimit] = useState(
    +(localStorage.getItem('mracoon-items-limit') ?? 3)
  );

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
  const [detailCardId, setDetailCardId] = useState<Nullable<number>>(null);
  const [page, setPage] = useState(
    +(localStorage.getItem('mracoon-pag-page') ?? '1')
  );

  useEffect(() => {
    const newPage = searchParams.get('page');
    if (`${page}` !== newPage) {
      setPage(+(newPage ?? page ?? 1));
      setSearchParams({ page: `${newPage ?? page ?? 1}` });
    }
  }, [searchParams, page, setSearchParams]);

  useEffect(() => {
    setIsLoading(true);
    setApiErr({ hasApiErr: false });
    const ctrl = new AbortController();
    fetch(`${BASE_URL}?page=${page}&sfw&limit=${limit}${'&q=' + searchVal}`, {
      signal: ctrl.signal,
    })
      .then((response) => {
        if (response.status >= 400 && response.status <= 600) {
          throw new Error(response.statusText);
        }
        return response.json();
      })
      .then((data: DataType) => {
        setCardsData(data.data);
        setIsLoading(false);
        setPagInfo(data.pagination);
        setIsNewQuery(false);
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
        setIsNewQuery(false);
      });
    return () => {
      ctrl.abort();
    };
  }, [searchVal, page, limit]);

  const cardClickHandler = (id: Nullable<number>) => {
    setDetailCardId(id);
  };

  useEffect(() => {
    setIsNewQuery(true);
    setDetailCardId(null);
  }, [searchVal]);

  const applyLimit = (newlimit: number) => {
    setLimit(newlimit);
    setSearchParams({ page: '1' });
    localStorage.setItem('mracoon-items-limit', `${newlimit}`);
  };
  return (
    <div className="results-container flex gap-2 items-start w-full flex-grow overflow-y-auto h-responsive pr-4">
      <div
        className="flex  flex-col gap-2 items-center w-full flex-grow justify-between sticky top-0 h-r"
        onClick={() => {
          cardClickHandler(null);
        }}
      >
        {isLoading && (
          <div className="flex-grow">
            <p className="loader"></p>
          </div>
        )}
        {apierr.hasApiErr && (
          <ApiErrorMessage message={apierr.errMessage ?? ''} />
        )}

        {!isLoading && !apierr.hasApiErr && (
          <>
            <CardsContainer
              cardsData={cardsData}
              cardClickHandler={cardClickHandler}
            ></CardsContainer>
          </>
        )}
        {!isNewQuery && !apierr.hasApiErr && (
          <>
            <Pagination pagInfo={pagInfo}></Pagination>
            <Limit applyLimit={applyLimit}></Limit>
          </>
        )}
      </div>
      <Outlet context={{ detailCardId, cardClickHandler }}></Outlet>
    </div>
  );
};
export default ResultsContainer;
