import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { MAX_LIMIT } from '../../utils/constants';

interface ILimitState {
  limitValue: number;
}

const initialState: ILimitState = {
  limitValue: 1, //+(localStorage.getItem(StorageKeyName.limit) ?? 1),
};

export const limitSlice = createSlice({
  name: 'limit',
  initialState,
  reducers: {
    setLimitValue(state, action: PayloadAction<number>) {
      state.limitValue = Math.max(Math.min(action.payload, MAX_LIMIT), 1);
    },
  },
});

export default limitSlice.reducer;
