import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { DataType, RequestItem } from '@/types/apiDataTypes';
import { paginationTemplate } from '@/test/paginationTemplate';
import { mockData } from '@/test/mockData';
import dataTemplate from '@/test/dataTemplate';

export interface IDataState {
  cardsData: DataType;
  details: { data: RequestItem };
}

const initialState: IDataState = {
  cardsData: { pagination: paginationTemplate, data: mockData },
  details: { data: dataTemplate },
};

export const dataSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {
    setData(
      state,
      action: PayloadAction<{
        cardsData: DataType;
        detailsData: { data: RequestItem };
      }>
    ) {
      state.cardsData = action.payload.cardsData;
      state.details = action.payload.detailsData;
    },
    setCardsData(state, action: PayloadAction<DataType>) {
      state.cardsData = action.payload;
    },
    setDetailsData(state, action: PayloadAction<{ data: RequestItem }>) {
      state.details = action.payload;
    },
  },
});

export default dataSlice.reducer;
