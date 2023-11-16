import {
  PreloadedState,
  combineReducers,
  configureStore,
} from '@reduxjs/toolkit';
import searchReducer from './reducers/SearchSlice';
import limitReducer from './reducers/LimitSlice';
import loadingReducer from './reducers/LoadingSlice';
import viewModeReducer from './reducers/ViewModeSlice';
import cardsDataReducer from './reducers/CardsDataSlice';
import { animeApi } from '../services/AnimeService';

const rootReducer = combineReducers({
  searchReducer,
  limitReducer,
  loadingReducer,
  viewModeReducer,
  cardsDataReducer,
  [animeApi.reducerPath]: animeApi.reducer,
});

export function setupStore(preloadedState?: PreloadedState<RootState>) {
  return configureStore({
    reducer: rootReducer,
    preloadedState,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(animeApi.middleware),
  });
}
export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
