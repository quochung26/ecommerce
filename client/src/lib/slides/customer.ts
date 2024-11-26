import { createSlice } from "@reduxjs/toolkit";

export type Customer = {
  firstname: string;
  lastname: string;
  email: string;
};

export interface CustomerState {
  isLogin: boolean;
  customer: Customer | null;
  token: string | null;
}

const initialState: CustomerState = {
  isLogin: false,
  customer: null,
  token: null,
};

const customerSlide = createSlice({
  name: "customer",
  initialState,
  reducers: {
    setToken: (state, action) => {
      state.isLogin = true;
      state.token = action.payload;
    },
    setCustomer: (state, action) => {
      state.customer = action.payload;
    },
    setSignOut: (state) => {
      state.isLogin = false;
      state.customer = null;
      state.token = null;
    },
  },
});

const { actions, reducer } = customerSlide;

export default reducer;

export const { setToken, setCustomer, setSignOut } = actions;
