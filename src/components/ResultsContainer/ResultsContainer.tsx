import React from 'react';
import { useEffect } from 'react';
import './resultsContainer.css';
import { Nullable } from '../../types/apiDataTypes';
import { ApiErrorMessage } from '../Error/ApiErrorMessage';
import { CardsContainer } from '../Card/CardsContainer';
import { useSearchParams } from 'react-router-dom';
import { Pagination } from '../pagination/Pagination';
import { Limit } from '../Limit/Limit';
import { paginationTemplate } from '../../test/paginationTemplate';
import { Details } from '../Details/Details';
import { StorageKeyName } from '../../utils/constants';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { animeApi } from '../../services/AnimeService';
import { viewModeSlice } from '../../store/reducers/ViewModeSlice';

const ResultsContainer = () => {
  const { changeDetails, changePage } = viewModeSlice.actions;
  const { page } = useAppSelector((state) => state.viewModeReducer);
  const dispatch = useAppDispatch();

  const { limitValue } = useAppSelector((state) => state.limitReducer);
  const { isCardListLoading } = useAppSelector((state) => state.loadingReducer);
  const { searchValue } = useAppSelector((state) => state.searchReducer);
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const newPage = searchParams.get('page');
    if (`${page}` !== newPage) {
      dispatch(changePage(+(newPage ?? page ?? 1)));
      localStorage.setItem(
        StorageKeyName.pagination,
        `${newPage ?? page ?? 1}`
      );
    }
  }, [searchParams, page, changePage, dispatch]);
  const { data, isError } = animeApi.useGetCardListQuery({
    page,
    limit: limitValue,
    searchValue,
  });

  const cardClickHandler = (id: Nullable<string>) => {
    dispatch(changeDetails(id));
    id
      ? localStorage.setItem(StorageKeyName.details, id)
      : localStorage.removeItem(StorageKeyName.details);
  };

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
          <CardsContainer cardClickHandler={cardClickHandler}></CardsContainer>
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
      <Details></Details>
    </div>
  );
};
export default ResultsContainer;
