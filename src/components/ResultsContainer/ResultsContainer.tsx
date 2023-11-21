import React from 'react';
import { Nullable } from '../../types/apiDataTypes';
import { ApiErrorMessage } from '../Error/ApiErrorMessage';
import { CardsContainer } from '../Card/CardsContainer';
import { Pagination } from '../pagination/Pagination';
import { paginationTemplate } from '../../test/paginationTemplate';
import { Details } from '../Details/Details';
import { StorageKeyName } from '../../utils/constants';
import { useAppSelector } from '../../hooks/redux';
import { animeApi } from '../../services/AnimeService';
import { useRouter } from 'next/router';

const ResultsContainer = () => {
  const { isCardListLoading } = useAppSelector((state) => state.loadingReducer);

  const router = useRouter();
  const { query, pathname } = router;
  const { page, limit, searchValue, details: detailsId } = query;

  const { data, isError } = animeApi.useGetCardListQuery({
    page: +(page || 1),
    limit: +(limit || 1),
    searchValue: (searchValue || '').toString(),
  });

  const cardClickHandler = (id: Nullable<string>) => {
    id
      ? localStorage.setItem(StorageKeyName.details, id)
      : localStorage.removeItem(StorageKeyName.details);
  };
  const { details, ...queryWithoutDetails } = query;
  return (
    <div className="results-container flex gap-2 items-start w-full flex-grow overflow-y-auto h-responsive pr-4">
      <div
        className="flex  flex-col gap-2 items-center w-full flex-grow justify-between sticky top-0 h-r"
        onClick={() => {
          if (details) {
            router.push({
              pathname,
              query: { ...queryWithoutDetails },
            });
          }
        }}
      >
        {isCardListLoading && (
          <div className="flex-grow">
            <p className="loader"></p>
          </div>
        )}
        {isError && <ApiErrorMessage />}

        {!isCardListLoading && !isError && (
          <>
            <CardsContainer
              cardsData={data?.data ?? []}
              cardClickHandler={cardClickHandler}
            ></CardsContainer>
            <Pagination
              paginationInfo={data?.pagination ?? paginationTemplate}
            ></Pagination>
          </>
        )}
      </div>

      {detailsId && <Details></Details>}
    </div>
  );
};
export default ResultsContainer;
