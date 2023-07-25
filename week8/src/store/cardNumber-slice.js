import { createSlice } from "@reduxjs/toolkit";

const cardNumberSlice = createSlice({
  name: "cardNumber",
  initialState: {
    cardNumber: 0,
  },
  reducers: {
    setCardNumber: (state, action) => {
      state.cardNumber = action.payload;
    },
    decrementCard(state) {
      state.cardNumber--;
    },
  },
});

export const cardNumberAction = cardNumberSlice.actions;

export default cardNumberSlice;
