import React, { useState } from 'react';
import { IData, Nullable } from '../../types/apiDataTypes';
import { ApiErrorMessage } from '../Error/ApiErrorMessage';
import { CardsContainer } from '../Card/CardsContainer';
import { Pagination } from '../pagination/Pagination';
import { paginationTemplate } from '../../test/paginationTemplate';
import { Details } from '../Details/Details';
import { StorageKeyName } from '../../utils/constants';
import { Router, useRouter } from 'next/router';

const ResultsContainer = ({ data }: { data: IData }) => {
  // const { isCardListLoading } = useAppSelector((state) => state.loadingReducer);
  const [isCardListLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { query, pathname } = router;
  const { details: detailsId } = query;
  React.useEffect(() => {
    const start = () => {
      console.log('start');
      setIsLoading(true);
    };
    const end = () => {
      console.log('finished');
      setIsLoading(false);
    };
    Router.events.on('routeChangeStart', start);
    Router.events.on('routeChangeComplete', end);
    Router.events.on('routeChangeError', end);
    return () => {
      Router.events.off('routeChangeStart', start);
      Router.events.off('routeChangeComplete', end);
      Router.events.off('routeChangeError', end);
    };
  }, []);
  /*  const {
    data,
    isError,
    isFetching: isCardListLoading,
  } = animeApi.useGetCardListQuery({
    page: `${page || 1}`,
    limit: `${limit || 1}`,
    searchValue: (searchValue || '').toString(),
  });
 */
  // const isCardListLoading = false;
  const isError = false;
  // const data = useAppSelector((state) => state.dataReducer);
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
              cardsData={data.cardsData.data ?? []}
              cardClickHandler={cardClickHandler}
            ></CardsContainer>
            <Pagination
              paginationInfo={data.cardsData.pagination ?? paginationTemplate}
            ></Pagination>
          </>
        )}
      </div>

      {detailsId && <Details data={data}></Details>}
    </div>
  );
};
export default ResultsContainer;
