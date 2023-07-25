import { createSlice } from "@reduxjs/toolkit";

const cardSlice = createSlice({
  name: "card",
  initialState: {
    cardArray: [],
    removedCard: [],
  },
  reducers: {
    setCard: (state, action) => {
      state.cardArray = action.payload;
    },
    removedCard: (state, action) => {
      state.removedCard.push(action.payload);
    },
  },
});

export const cardAction = cardSlice.actions;

export default cardSlice;
