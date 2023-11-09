import { useEffect, useState } from 'react';
import './resultsContainer.css';
import {
  DataType,
  Nullable,
  RequestPagination,
  RequestItem,
} from '../../types/apiDataTypes';
import { ApiErrorMessage } from '../Error/ApiErrorMessage';
import { CardsContainer } from '../Card/CardsContainer';
import { useOutletContext, Outlet, useSearchParams } from 'react-router-dom';
import { Pagination } from '../pagination/Pagination';
import { Limit } from '../Limit/Limit';
import { getApiData } from '../../utils/API';
import { paginationTemplate } from '../../test/paginationTemplate';
import { StorageKeyName } from '../../utils/constants';

export interface IApiError {
  hasApiError: boolean;
  errorMessage?: string;
}
interface IResultsContainerProps {
  searchValue: string;
  page: number;
}
const ResultsContainer = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [isNewQuery, setIsNewQuery] = useState(false);
  const [limit, setLimit] = useState(
    +(localStorage.getItem(StorageKeyName.limit) ?? 1)
  );

  const [cardsData, setCardsData] = useState<RequestItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState<IApiError>({ hasApiError: false });
  const [paginationInfo, setPaginationInfo] =
    useState<RequestPagination>(paginationTemplate);
  const { searchValue } = useOutletContext<IResultsContainerProps>();
  const [detailCardId, setDetailCardId] = useState<Nullable<number>>(null);
  const [page, setPage] = useState(
    +(localStorage.getItem(StorageKeyName.pagination) ?? '1')
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
    setApiError({ hasApiError: false });
    const controller = new AbortController();
    getApiData<DataType>(
      controller,
      `?page=${page}&sfw&limit=${limit}${'&q=' + searchValue}`,
      setIsLoading,
      setApiError
    )
      .then((data) => {
        setCardsData(data?.data ?? []);
        setIsLoading(false);
        setPaginationInfo(data?.pagination ?? paginationTemplate);
        setIsNewQuery(false);
      })
      .catch(() => {
        setCardsData([]);
        setIsNewQuery(true);
      });

    return () => {
      controller.abort();
    };
  }, [searchValue, page, limit]);

  const cardClickHandler = (id: Nullable<number>) => {
    setDetailCardId(id);
  };

  useEffect(() => {
    setDetailCardId(null);
    setIsNewQuery(true);
  }, [searchValue]);

  const applyLimit = (newlimit: number) => {
    if (limit !== newlimit) {
      setLimit(newlimit);
      setIsNewQuery(true);
      setSearchParams({ page: '1' });
      localStorage.setItem(StorageKeyName.limit, `${newlimit}`);
    }
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
        {apiError.hasApiError && (
          <ApiErrorMessage message={apiError.errorMessage ?? ''} />
        )}

        {!isLoading && !apiError.hasApiError && (
          <>
            <CardsContainer
              cardsData={cardsData}
              cardClickHandler={cardClickHandler}
            ></CardsContainer>
          </>
        )}
        {!isNewQuery && !apiError.hasApiError && (
          <>
            <Pagination paginationInfo={paginationInfo}></Pagination>
            <Limit applyLimit={applyLimit}></Limit>
          </>
        )}
      </div>
      <Outlet context={{ detailCardId, cardClickHandler }}></Outlet>
    </div>
  );
};
export default ResultsContainer;
