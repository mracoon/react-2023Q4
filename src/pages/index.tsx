import ResultsContainer from '@/components/ResultsContainer/ResultsContainer';
import { SearchPageLayout } from '@/components/SearchPageLayout';
import { useAppDispatch } from '@/hooks/redux';
import { dataSlice } from '@/store/reducers/DataSlice';
import { detailsMockData } from '@/test/detailsMockData';
import { DataType, IData, RequestItem } from '@/types/apiDataTypes';
import { BASE_URL } from '@/utils/constants';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';

/* export const getServerSideProps: GetServerSideProps =
  wrapper.getServerSideProps((store) => async (context) => {
    const { limit, page, details, searchValue } = context.query;
    // if (typeof name === 'string') {
    store.dispatch(
      getCardList.initiate({
        limit: limit?.toString() || '1',
        page: page?.toString() || '1',
        searchValue: searchValue?.toString() || '',
      })
    );
    //}

    await Promise.all(store.dispatch(getRunningQueriesThunk()));
    console.log('!!!!!!!!!!!', store.getState().dataReducer.cardsData);
    const data = store.getState().dataReducer
    return { props: {data} };
  });
 */

export const getServerSideProps = (async (context) => {
  const { page, details: detailsId, searchValue, limit } = context.query;
  console.log(context.query);
  const res = await fetch(
    `${BASE_URL}?sfw&page=${page || 1}&limit=${(limit || 1).toString()}&q=${
      searchValue || ''
    }`
  );
  const cardsData: DataType = await res.json();
  //const detailsId = 5;
  // const { detailsId } = useAppSelector((state) => state.viewModeReducer);
  let detailsData: RequestItem = detailsMockData;
  if (detailsId) {
    const res = await fetch(`${BASE_URL}/${detailsId}`);
    detailsData = (await res.json()).data;
    console.log('details', detailsData);
  }
  return {
    props: {
      data: {
        cardsData,
        detailsData,
      },
    },
  };
}) satisfies GetServerSideProps<{
  data: IData;
}>;

export default function Home({
  data,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const dispatch = useAppDispatch();
  // const {  } = useAppSelector((state) => state.dataReducer);

  const { setData } = dataSlice.actions;
  console.log(data);
  dispatch(setData(data));

  return (
    <SearchPageLayout>
      <ResultsContainer data={data} />
    </SearchPageLayout>
  );
}
