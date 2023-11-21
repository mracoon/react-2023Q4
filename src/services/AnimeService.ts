import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE_URL } from '../utils/constants';
import { DataType, Nullable, RequestItem } from '../types/apiDataTypes';
import { HYDRATE } from 'next-redux-wrapper';
import { dataSlice } from '@/store/reducers/DataSlice';
export interface IQueryParameters {
  limit: string;
  page: string;
  searchValue?: string;
}

export const animeApi = createApi({
  // reducerPath: 'AnimeApi',
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),

  extractRehydrationInfo(action, { reducerPath }) {
    if (action.type === HYDRATE) {
      return action.payload[reducerPath];
    }
  },
  endpoints: (builder) => ({
    getCardList: builder.query<DataType, IQueryParameters>({
      query: ({ limit, page, searchValue }) => ({
        url: '?sfw',
        params: { page, limit, q: searchValue || '' },
      }),
      async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
        const { setCardsData } = dataSlice.actions;

        try {
          const data = await queryFulfilled;
          dispatch(setCardsData(data.data));
          console.log(data);
        } catch (error: unknown) {
          if (error instanceof Error) {
            console.log(error.message);
          }
        } finally {
          //  dispatch(setIsCardListLoading(false));
        }
      },
    }),
    getDetails: builder.query<{ data: RequestItem }, Nullable<string>>({
      query: (detailsId) => ({
        url: `/${detailsId}`,
      }),
      /*   async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
        const { setIsDetailsLoading } = loadingSlice.actions;
        dispatch(setIsDetailsLoading(true));
        try {
          await queryFulfilled;
        } finally {
          dispatch(setIsDetailsLoading(false));
        }
      }, */
    }),
  }),
});

export const {
  useGetCardListQuery,
  useGetDetailsQuery,
  util: { getRunningQueriesThunk },
} = animeApi;
export const { getCardList, getDetails } = animeApi.endpoints;
