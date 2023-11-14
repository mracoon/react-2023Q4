import { combineReducers, configureStore } from '@reduxjs/toolkit';
import searchReducer from './reducers/SearchSlice';
import limitReducer from './reducers/LimitSlice';
import loadingReducer from './reducers/LoadingSlice';
import { cardListApi } from '../services/CardListService';

const rootReducer = combineReducers({
  searchReducer,
  limitReducer,
  loadingReducer,
  [cardListApi.reducerPath]: cardListApi.reducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(cardListApi.middleware),
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
