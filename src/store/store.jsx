import { configureStore } from "@reduxjs/toolkit";
import PageDataSlice from "./PageDataSlice";
import PropertiesSlice from "./PropertiesSlice";
import AttributeDataSlice from "./AttributeDataSlice";
import AttributePropDataSlice from "./AttributePropDataSlice";
import ExpressionSlice from "./ExpressionSlice";
import SavePageSlice from "./SavePageSlice";

const store = configureStore({
    reducer: {
      page: PageDataSlice,
      properties : PropertiesSlice,
      attribute: AttributeDataSlice,
      propertiesdata : AttributePropDataSlice,
      expressiondata : ExpressionSlice,
      savepage: SavePageSlice
    },
  });
  
  export default store;