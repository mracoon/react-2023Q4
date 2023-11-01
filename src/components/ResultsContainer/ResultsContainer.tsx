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
  const [isNewQuery, setIsNewQuery] = useState(false);
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
  const [page, setPage] = useState(1);

  useEffect(() => {
    const newPage = +(searchParams.get('page') ?? 1);
    if (page !== newPage) {
      setPage(+(searchParams.get('page') ?? 1));
    }
  }, [searchParams, page]);

  useEffect(() => {
    const pageQueryParameter = searchParams.get('page');
    if (!pageQueryParameter) {
      setSearchParams({
        page: localStorage.getItem('mracoon-pag-page') ?? '1',
      });
    }
  }, [searchParams, setSearchParams]);

  useEffect(() => {
    setIsLoading(true);
    setApiErr({ hasApiErr: false });
    const ctrl = new AbortController();
    fetch(
      `https://api.jikan.moe/v4/anime?page=${page}&sfw&limit=13${
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
  }, [searchVal, page]);

  const cardClickHandler = (id: Nullable<number>) => {
    setDetailCardId(id);
  };

  useEffect(() => {
    setIsNewQuery(true);
    setDetailCardId(null);
  }, [searchVal]);

  return (
    <div className="results-container flex gap-2 items-start w-full flex-grow overflow-y-auto h-responsive pr-4">
      <div
        className="flex  flex-col gap-2 items-center w-full flex-grow justify-between sticky top-0 h-r"
        onClick={() => {
          cardClickHandler(null);
        }}
      >
        {isLoading && <p className="loader"></p>}
        {apierr.hasApiErr && (
          <ApiErrorMessage message={apierr.errMessage ?? ''} />
        )}
        {!isLoading && !apierr.hasApiErr && (
          <>
            {' '}
            <CardsContainer
              cardsData={cardsData}
              cardClickHandler={cardClickHandler}
            ></CardsContainer>
          </>
        )}
        {!isNewQuery && <Pagination pagInfo={pagInfo}></Pagination>}
      </div>
      <Outlet context={{ detailCardId, cardClickHandler }}></Outlet>
    </div>
  );
};
export default ResultsContainer;
