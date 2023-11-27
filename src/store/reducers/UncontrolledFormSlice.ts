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

export const uncontrolledFormSlice = createSlice({
  name: 'uncontrolledForm',
  initialState,
  reducers: {
    setUncontrolledName(state, action: PayloadAction<string>) {
      state.name = action.payload;
    },
    setUncontrolledAge(state, action: PayloadAction<string>) {
      state.age = action.payload;
    },
    setUncontrolledEmail(state, action: PayloadAction<string>) {
      state.email = action.payload;
    },
    setUncontrolledPassword(state, action: PayloadAction<string>) {
      state.password = action.payload;
    },
    setUncontrolledConfirmPassword(state, action: PayloadAction<string>) {
      state.confirmPassword = action.payload;
    },
    setUncontrolledGender(state, action: PayloadAction<string>) {
      state.gender = action.payload;
    },
    setUncontrolledTC(state, action: PayloadAction<boolean>) {
      state.tc = action.payload;
    },
    setUncontrolledImage(state, action: PayloadAction<string>) {
      state.image = action.payload;
    },
    setUncontrolledCountry(state, action: PayloadAction<string>) {
      state.country = action.payload;
    },
  },
});

export default uncontrolledFormSlice.reducer;
