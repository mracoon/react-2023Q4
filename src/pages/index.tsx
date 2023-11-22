import ResultsContainer from '@/components/ResultsContainer/ResultsContainer';
import { SearchPageLayout } from '@/components/SearchPageLayout';
import {
  getCardList,
  getDetails,
  getRunningQueriesThunk,
} from '@/services/AnimeService';
import { wrapper } from '@/store/store';
import { IData } from '@/types/apiDataTypes';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';

export const getServerSideProps: GetServerSideProps<{ data: IData }> =
  wrapper.getServerSideProps((store) => async (context) => {
    const { limit, page, details: datailsId, searchValue } = context.query;
    store.dispatch(
      getCardList.initiate({
        limit: limit?.toString() || '1',
        page: page?.toString() || '1',
        searchValue: searchValue?.toString() || '',
      })
    );
    if (datailsId) {
      store.dispatch(getDetails.initiate(datailsId.toString()));
    }

    await Promise.all(store.dispatch(getRunningQueriesThunk()));
    return {
      props: {
        data: {
          cardsData: store.getState().dataReducer.cardsData,
          detailsData: store.getState().dataReducer.details,
        },
      },
    };
  });
export default function Home({
  data,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <SearchPageLayout>
      <ResultsContainer data={data} />
    </SearchPageLayout>
  );
}
