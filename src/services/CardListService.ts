import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE_URL } from '../utils/constants';
import { DataType } from '../types/apiDataTypes';
import { loadingSlice } from '../store/reducers/LoadingSlice';

interface IQueryParameters {
  limit: number;
  page: number;
  searchValue?: string;
}

export const cardListApi = createApi({
  reducerPath: 'CardListApi',
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  endpoints: (builder) => ({
    getCardList: builder.query<DataType, IQueryParameters>({
      query: ({ limit, page, searchValue }) => ({
        url: '?sfw',
        params: { page, limit, q: searchValue || '' },
      }),
      async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
        const { setIsCardListLoading } = loadingSlice.actions;
        dispatch(setIsCardListLoading(true));
        try {
          await queryFulfilled;
        } finally {
          dispatch(setIsCardListLoading(false));
        }
      },
    }),
  }),
});

export const { useGetCardListQuery } = cardListApi;
