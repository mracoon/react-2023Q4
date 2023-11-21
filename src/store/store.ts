import { combineReducers, configureStore } from '@reduxjs/toolkit';

import dataReducer from './reducers/DataSlice';
import { animeApi } from '../services/AnimeService';
const rootReducer = combineReducers({
  //searchReducer,
  // limitReducer,
  dataReducer,
  // viewModeReducer,
  [animeApi.reducerPath]: animeApi.reducer,
});
/*  const rootReducer = combineReducers({
  //searchReducer,
 // limitReducer,
 loadingReducer,
 // viewModeReducer,
  [animeApi.reducerPath]: animeApi.reducer,
});  */

/* export function setupStore(preloadedState?: PreloadedState<RootState>) {
  return configureStore({
    reducer: {[animeApi.reducerPath]: animeApi.reducer},
    preloadedState,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(animeApi.middleware),
  });
} */
/* export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
 */
//import { configureStore } from "@reduxjs/toolkit";
import { createWrapper } from 'next-redux-wrapper';
//import { pokemonApi } from "./pokemonApi";

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
