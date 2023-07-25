import { createSlice } from "@reduxjs/toolkit";

const initialAuthState = {
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: "authentication",
  initialState: initialAuthState,
  reducers: {
    start: (state) => {
      state.isAuthenticated = true;
    },
  },
});

export const authAction = authSlice.actions;

export default authSlice;
