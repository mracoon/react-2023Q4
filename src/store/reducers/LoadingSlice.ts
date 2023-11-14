import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface ILoadingState {
  isCardListLoading: boolean;
  isDetailsLoading: boolean;
}

const initialState: ILoadingState = {
  isCardListLoading: false,
  isDetailsLoading: false,
};

export const loadingSlice = createSlice({
  name: 'loading',
  initialState,
  reducers: {
    setIsCardListLoading(state, action: PayloadAction<boolean>) {
      state.isCardListLoading = action.payload;
    },
    setIsDetailsLoading(state, action: PayloadAction<boolean>) {
      state.isDetailsLoading = action.payload;
    },
  },
});

export default loadingSlice.reducer;
