import {createSlice} from '@reduxjs/toolkit';
const initialState = [];

const ViewobjectSlice = createSlice({
   name: 'viewdata',
   initialState,
   reducers:{
     addview: (state, action) => {
         state.push(action.payload);
     },
     removeview: (state,action) => {
        return state.filter((item) => item.expression_id !== action.payload);
     },
   }
});

export const { addview, removeview} = ViewobjectSlice.actions;
export default ViewobjectSlice.reducer;