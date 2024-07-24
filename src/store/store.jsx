import { configureStore } from "@reduxjs/toolkit";
import PageDataSlice from "./PageDataSlice";
import PropertiesSlice from "./PropertiesSlice";
import AttributeDataSlice from "./AttributeDataSlice";
import AttributePropDataSlice from "./AttributePropDataSlice";

const store = configureStore({
    reducer: {
      page: PageDataSlice,
      properties : PropertiesSlice,
      attribute: AttributeDataSlice,
      propertiesdata : AttributePropDataSlice
    },
  });
  
  export default store;