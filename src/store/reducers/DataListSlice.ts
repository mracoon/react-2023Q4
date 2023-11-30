import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { IFormData } from './types';
type IDataList = { dataList: IFormData[]; lastData: IFormData };

const initialState: IDataList = {
  dataList: [],
  lastData: {
    name: '',
    age: '',
    email: '',
    password: '',
    confirmPassword: '',
    gender: '',
    tc: false,
    image: '',
    country: '',
  },
};

export const dataListSlice = createSlice({
  name: 'formDataList',
  initialState,
  reducers: {
    setLastName(state, action: PayloadAction<string>) {
      state.lastData.name = action.payload;
    },
    setLastAge(state, action: PayloadAction<string>) {
      state.lastData.age = action.payload;
    },
    setLastEmail(state, action: PayloadAction<string>) {
      state.lastData.email = action.payload;
    },
    setLastPassword(state, action: PayloadAction<string>) {
      state.lastData.password = action.payload;
    },
    setLastConfirmPassword(state, action: PayloadAction<string>) {
      state.lastData.confirmPassword = action.payload;
    },
    setLastGender(state, action: PayloadAction<string>) {
      state.lastData.gender = action.payload;
    },
    setLastTC(state, action: PayloadAction<boolean>) {
      state.lastData.tc = action.payload;
    },
    setLastImage(state, action: PayloadAction<string>) {
      state.lastData.image = action.payload;
    },
    setLastCountry(state, action: PayloadAction<string>) {
      state.lastData.country = action.payload;
    },
    addNewSubmit(state) {
      state.dataList.unshift(state.lastData);
    },
  },
});

export default dataListSlice.reducer;
