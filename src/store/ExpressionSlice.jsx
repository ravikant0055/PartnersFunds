import {createSlice} from '@reduxjs/toolkit';
const initialState = [];

const ExpressionSlice = createSlice({
   name: 'expressiondata',
   initialState,
   reducers:{
     addexp: (state, action) => {
         state.push(action.payload);
     },
     removeexp: (state,action) => {
        return state.filter((item) => item.expression_id !== action.payload);
     },
   }
});

export const { addexp, removeexp} = ExpressionSlice.actions;
export default ExpressionSlice.reducer;