import { combineReducers, configureStore } from '@reduxjs/toolkit';
import dataReducer from './reducers/DataSlice';
import { animeApi } from '../services/AnimeService';

const rootReducer = combineReducers({
  dataReducer,
  [animeApi.reducerPath]: animeApi.reducer,
});

import { createWrapper } from 'next-redux-wrapper';

export const makeStore = () =>
  configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(animeApi.middleware),
  });

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof makeStore>;
export type AppDispatch = AppStore['dispatch'];

export const wrapper = createWrapper<AppStore>(makeStore, { debug: true });
