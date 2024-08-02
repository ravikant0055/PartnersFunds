import {createSlice} from '@reduxjs/toolkit';
const initialState = [];

const SavePageSlice = createSlice({
   name: 'savepage',
   initialState,
   reducers:{
     addpage: (state, action) => {
         state.push(action.payload);
     },
     updatepage: (state, action) => {
        // const { id, ...updatedPage } = action.payload;
        // const index = state.findIndex((item) => item.id === id);
        // if (index !== -1) {
        //   state[index] = { ...state[index], ...updatedPage };
        // }
        // return state;
        const { id, JsonElements } = action.payload;
        const index = state.findIndex((item) => item.id === id);
        if (index !== -1) {
          state[index] = { id, JsonElements };
        }
        return state;
      },
   }
});

export const { addpage, updatepage } = SavePageSlice.actions;
export default SavePageSlice.reducer;