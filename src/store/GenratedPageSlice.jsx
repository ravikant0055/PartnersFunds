import {createSlice} from '@reduxjs/toolkit';

const initialState = [];

const GenratedPageSlice = createSlice({
   name: 'genratedpage',
   initialState,
   reducers:{
     addgenpage: (state, action) => {
         state.push(action.payload);
     },
   }
});

export const { addgenpage } = GenratedPageSlice.actions;
export default GenratedPageSlice.reducer;