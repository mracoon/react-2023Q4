import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { StorageKeyName } from '../../utils/constants';

interface ISearchState {
  searchValue: string;
}

const initialState: ISearchState = {
  searchValue: localStorage.getItem(StorageKeyName.search) ?? '',
};

export const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setSearchValue(state, action: PayloadAction<string>) {
      state.searchValue = action.payload;
    },
  },
});

export default searchSlice.reducer;
