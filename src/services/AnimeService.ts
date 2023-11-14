import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE_URL } from '../utils/constants';
import { DataType, Nullable, RequestItem } from '../types/apiDataTypes';
import { loadingSlice } from '../store/reducers/LoadingSlice';

interface IQueryParameters {
  limit: number;
  page: number;
  searchValue?: string;
}

export const animeApi = createApi({
  reducerPath: 'AnimeApi',
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
    getDetails: builder.query<{ data: RequestItem }, Nullable<string>>({
      query: (detailsId) => ({
        url: `/${detailsId}`,
      }),
      async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
        const { setIsDetailsLoading } = loadingSlice.actions;
        dispatch(setIsDetailsLoading(true));
        try {
          await queryFulfilled;
        } finally {
          dispatch(setIsDetailsLoading(false));
        }
      },
    }),
  }),
});

export const { useGetCardListQuery, useGetDetailsQuery } = animeApi;
