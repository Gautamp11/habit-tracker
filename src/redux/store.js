import { configureStore } from "@reduxjs/toolkit";
import reducer from "./habitSlice";

const store = configureStore({
  reducer: {
    habits: reducer,
  },
});

export default store;
