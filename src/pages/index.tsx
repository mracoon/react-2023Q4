import ErrorBoundary from '@/components/Error/ErrorBoundary';
import ResultsContainer from '@/components/ResultsContainer/ResultsContainer';
import { SearchPageLayout } from '@/components/SearchPageLayout';
import {
  getCardList,
  getDetails,
  getRunningQueriesThunk,
} from '@/services/AnimeService';
import { wrapper } from '@/store/store';
import { IData, IDataErrors } from '@/types/apiDataTypes';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';

export const getServerSideProps: GetServerSideProps<{
  data?: IData;
  errors?: IDataErrors;
}> = wrapper.getServerSideProps((store) => async (context) => {
  const { limit, page, details, searchValue } = context.query;

  if (!page) {
    const detailsQueryString = details ? `&details=${details} ` : '';
    return {
      redirect: {
        destination: `/?page=1&searchValue=${searchValue || ''}&limit=${
          limit || 1
        }${detailsQueryString}`,
        permanent: false,
      },
    };
  }

  store.dispatch(
    getCardList.initiate({
      limit: limit?.toString() || '1',
      page: page?.toString() || '1',
      searchValue: searchValue?.toString() || '',
    })
  );
  if (details) {
    store.dispatch(getDetails.initiate(details.toString()));
  }

  await Promise.all(store.dispatch(getRunningQueriesThunk()));

  return {
    props: {
      data: {
        cardsData: store.getState().dataReducer.cardsData,
        detailsData: store.getState().dataReducer.details,
      },
      errors: {
        cardsDataError: store.getState().dataReducer.cardsDataError.hasError,
        detailsError: store.getState().dataReducer.detailsError.hasError,
      },
    },
  };
});
export default function Home(
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) {
  if (!props?.data || !props?.errors) {
    return <></>;
  }
  const { data, errors } = props;
  return (
    <>
      <ErrorBoundary>
        <SearchPageLayout>
          <ResultsContainer data={data} errors={errors} />
        </SearchPageLayout>
      </ErrorBoundary>
    </>
  );
}
