import { useEffect, useState, createContext } from 'react';
import './resultsContainer.css';
import { Nullable, RequestItem } from '../../types/apiDataTypes';
import { ApiErrorMessage } from '../Error/ApiErrorMessage';
import { CardsContainer } from '../Card/CardsContainer';
import { useSearchParams } from 'react-router-dom';
import { Pagination } from '../pagination/Pagination';
import { Limit } from '../Limit/Limit';
import { paginationTemplate } from '../../test/paginationTemplate';
import { Details } from '../Details/Details';
import { StorageKeyName } from '../../utils/constants';
import { useAppSelector } from '../../hooks/redux';
import { cardListApi } from '../../services/CardListService';

export interface IApiError {
  hasApiError: boolean;
  errorMessage?: string;
}
export const CardsDataContext = createContext<RequestItem[]>([]);

const ResultsContainer = () => {
  const { limitValue } = useAppSelector((state) => state.limitReducer);
  const { isCardListLoading } = useAppSelector((state) => state.loadingReducer);
  const { searchValue } = useAppSelector((state) => state.searchReducer);
  const [searchParams, setSearchParams] = useSearchParams();

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

  const { data, isError } = cardListApi.useGetCardListQuery({
    page,
    limit: limitValue,
    searchValue,
  });

  const cardClickHandler = (id: Nullable<number>) => {
    setDetailCardId(id);
  };

  useEffect(() => {
    setDetailCardId(null);
  }, [searchValue]);

  return (
    <div className="results-container flex gap-2 items-start w-full flex-grow overflow-y-auto h-responsive pr-4">
      <div
        className="flex  flex-col gap-2 items-center w-full flex-grow justify-between sticky top-0 h-r"
        onClick={() => {
          cardClickHandler(null);
        }}
      >
        {isCardListLoading && (
          <div className="flex-grow">
            <p className="loader"></p>
          </div>
        )}
        {isError && <ApiErrorMessage />}

        {!isCardListLoading && !isError && (
          <CardsDataContext.Provider value={data?.data ?? []}>
            <CardsContainer
              cardClickHandler={cardClickHandler}
            ></CardsContainer>
          </CardsDataContext.Provider>
        )}
        {!isError && (
          <>
            <Pagination
              paginationInfo={data?.pagination ?? paginationTemplate}
            ></Pagination>
            <Limit />
          </>
        )}
      </div>
      <Details
        detailCardId={detailCardId}
        cardClickHandler={cardClickHandler}
      ></Details>
    </div>
  );
};
export default ResultsContainer;
