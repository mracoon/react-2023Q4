import { combineReducers, configureStore } from '@reduxjs/toolkit';
import searchReducer from './reducers/SearchSlice';
import limitReducer from './reducers/LimitSlice';
import loadingReducer from './reducers/LoadingSlice';
import viewModeReducer from './reducers/ViewModeSlice';
import { animeApi } from '../services/AnimeService';

const rootReducer = combineReducers({
  searchReducer,
  limitReducer,
  loadingReducer,
  viewModeReducer,
  [animeApi.reducerPath]: animeApi.reducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(animeApi.middleware),
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
