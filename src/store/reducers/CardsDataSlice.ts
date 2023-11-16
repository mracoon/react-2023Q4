import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { RequestItem } from '../../types/apiDataTypes';

interface ICardsState {
  cardsData: RequestItem[];
}

const initialState: ICardsState = {
  cardsData: [],
};

export const cardsDataSlice = createSlice({
  name: 'cards',
  initialState,
  reducers: {
    updateCardsData(state, action: PayloadAction<RequestItem[]>) {
      state.cardsData = action.payload;
    },
  },
});

export default cardsDataSlice.reducer;
