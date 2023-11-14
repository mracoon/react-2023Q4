import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { StorageKeyName } from '../../utils/constants';
import { Nullable } from '../../types/apiDataTypes';

interface IViewModeState {
  page: number;
  detailsId: Nullable<string>;
}

const initialState: IViewModeState = {
  page: +(localStorage.getItem(StorageKeyName.pagination) ?? 1),
  detailsId: localStorage.getItem(StorageKeyName.details),
};

export const viewModeSlice = createSlice({
  name: 'viewMode',
  initialState,
  reducers: {
    changePage(state, action: PayloadAction<number>) {
      state.page = action.payload;
    },
    changeDetails(state, action: PayloadAction<Nullable<string>>) {
      state.detailsId = action.payload;
    },
  },
});

export default viewModeSlice.reducer;
