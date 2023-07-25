import { configureStore } from "@reduxjs/toolkit";

import cardNumberSlice from "./cardNumber-slice";
import authSlice from "./auth-slice";
import cardSlice from "./card-slice";

const store = configureStore({
  reducer: {
    cardNumber: cardNumberSlice.reducer,
    auth: authSlice.reducer,
    card: cardSlice.reducer,
  },
});

export default store;
