import { configureStore } from "@reduxjs/toolkit";
import PageDataSlice from "./PageDataSlice";
import PropertiesSlice from "./PropertiesSlice";
import AttributeDataSlice from "./AttributeDataSlice";
import AttributePropDataSlice from "./AttributePropDataSlice";
import ExpressionSlice from "./ExpressionSlice";

const store = configureStore({
    reducer: {
      page: PageDataSlice,
      properties : PropertiesSlice,
      attribute: AttributeDataSlice,
      propertiesdata : AttributePropDataSlice,
      expressiondata : ExpressionSlice
    },
  });
  
  export default store;