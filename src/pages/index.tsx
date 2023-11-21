import ResultsContainer from '@/components/ResultsContainer/ResultsContainer';
import { SearchPageLayout } from '@/components/SearchPageLayout';
import { detailsMockData } from '@/test/detailsMockData';
import { DataType, IData, RequestItem } from '@/types/apiDataTypes';
import { BASE_URL } from '@/utils/constants';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';

export const getServerSideProps = (async (context) => {
  const { page, details: detailsId, searchValue, limit } = context.query;

  const res = await fetch(
    `${BASE_URL}?sfw&page=${page || 1}&limit=${(limit || 1).toString()}&q=${
      searchValue || ''
    }`
  );
  const cardsData: DataType = await res.json();

  let detailsData: RequestItem = detailsMockData;
  if (detailsId) {
    const res = await fetch(`${BASE_URL}/${detailsId}`);
    detailsData = (await res.json()).data;
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
  return (
    <SearchPageLayout>
      <ResultsContainer data={data} />
    </SearchPageLayout>
  );
}
