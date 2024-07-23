import { configureStore } from "@reduxjs/toolkit";
import PageDataSlice from "./PageDataSlice";
import PropertiesSlice from "./PropertiesSlice";

const store = configureStore({
    reducer: {
      page: PageDataSlice,
      properties : PropertiesSlice
    },
  });
  
  export default store;