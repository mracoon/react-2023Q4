import { IData, IDataErrors } from '../../types/apiDataTypes';
import { CardsContainer } from '../Card/CardsContainer';
import { Pagination } from '../pagination/Pagination';
import { paginationTemplate } from '../../test/paginationTemplate';
import { Details } from '../Details/Details';
import { useRouter } from 'next/router';

const ResultsContainer = ({
  data,
  errors,
}: {
  data: IData;
  errors: IDataErrors;
}) => {
  const router = useRouter();
  const { query, pathname } = router;
  const { details, ...queryWithoutDetails } = query;
  if (errors.cardsDataError || errors.detailsError) {
    return <h2>Something went wrong. Try again</h2>;
  }
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
        <>
          <CardsContainer
            cardsData={data.cardsData.data ?? []}
          ></CardsContainer>
          <Pagination
            paginationInfo={data.cardsData.pagination ?? paginationTemplate}
          ></Pagination>
        </>
      </div>

      {details && <Details data={data}></Details>}
    </div>
  );
};
export default ResultsContainer;
