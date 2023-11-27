import {
  PreloadedState,
  combineReducers,
  configureStore,
} from '@reduxjs/toolkit';

import uncontrolledFormReducer from './reducers/UncontrolledFormSlice';
import RHFReducer from './reducers/RHFSlice';
import countriesReducer from './reducers/CountriesSlice';
const rootReducer = combineReducers({
  countriesReducer,
  RHFReducer,
  uncontrolledFormReducer,
});

export function setupStore(preloadedState?: PreloadedState<RootState>) {
  return configureStore({
    reducer: rootReducer,
    preloadedState,
  });
}
export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
