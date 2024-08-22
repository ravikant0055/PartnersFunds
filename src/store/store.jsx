import { configureStore } from "@reduxjs/toolkit";
import PageDataSlice from "./PageDataSlice";
import PropertiesSlice from "./PropertiesSlice";
import AttributeDataSlice from "./AttributeDataSlice";
import AttributePropDataSlice from "./AttributePropDataSlice";
import ExpressionSlice from "./ExpressionSlice";
import SavePageSlice from "./SavePageSlice";
import EntittyObjectSlice from "./EntittyObjectSlice";
import ViewObjectSlice from "./ViewObjectSlice";
import GenratedPageSlice from "./GenratedPageSlice";
import { thunk } from "redux-thunk";

const store = configureStore({
    reducer: {
      page: PageDataSlice,
      properties : PropertiesSlice,
      attribute: AttributeDataSlice,
      propertiesdata : AttributePropDataSlice,
      expressiondata : ExpressionSlice,
      savepage: SavePageSlice,
      entitydata : EntittyObjectSlice,
      viewdata : ViewObjectSlice,
      genratedpage :GenratedPageSlice
    },

    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
  });
  
  export default store;