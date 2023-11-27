import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { IFormData } from './types';

const initialState: IFormData = {
  name: '',
  age: '',
  email: '',
  password: '',
  confirmPassword: '',
  gender: '',
  tc: false,
  image: '',
  country: '',
};

export const RHFSlice = createSlice({
  name: 'RHF',
  initialState,
  reducers: {
    setRHFName(state, action: PayloadAction<string>) {
      state.name = action.payload;
    },
    setRHFAge(state, action: PayloadAction<string>) {
      state.age = action.payload;
    },
    setRHFEmail(state, action: PayloadAction<string>) {
      state.email = action.payload;
    },
    setRHFpassword(state, action: PayloadAction<string>) {
      state.password = action.payload;
    },
    setRHFConfirmPassword(state, action: PayloadAction<string>) {
      state.confirmPassword = action.payload;
    },
    setRHFGender(state, action: PayloadAction<string>) {
      state.gender = action.payload;
    },
    setRHFTC(state, action: PayloadAction<boolean>) {
      state.tc = action.payload;
    },
    setRHFImage(state, action: PayloadAction<string>) {
      state.image = action.payload;
    },
    setRHFCountry(state, action: PayloadAction<string>) {
      state.country = action.payload;
    },
  },
});

export default RHFSlice.reducer;
