import {createSlice} from '@reduxjs/toolkit';
const initialState = [];

const AttributePropDataSlice = createSlice({
   name: 'propertiesdata',
   initialState,
   reducers:{
     addprop: (state, action) => {
         state.push(action.payload);
     },
     deleteprop:(state,action) => {
        return state.filter((item) => item.id !== action.payload);
     },
     updateprop: (state, action) => {
      const { id, ...updatedProps } = action.payload;
      const index = state.findIndex((item) => item.id === id);
      if (index !== -1) {
        state[index] = { ...state[index], ...updatedProps };
      }
      return state;
    },
   }
});

export const { addprop, deleteprop, updateprop } = AttributePropDataSlice.actions;
export default AttributePropDataSlice.reducer;