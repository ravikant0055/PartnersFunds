import { configureStore } from "@reduxjs/toolkit";
import PageDataSlice from "./PageDataSlice";

const store = configureStore({
    reducer: {
      page: PageDataSlice,
    },
  });
  
  export default store;