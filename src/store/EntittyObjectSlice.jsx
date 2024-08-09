import {createSlice} from '@reduxjs/toolkit';
const initialState = [];

const EntityobjectSlice = createSlice({
   name: 'entitydata',
   initialState,
   reducers:{
     addentity: (state, action) => {
         state.push(action.payload);
     },
     removeentity: (state,action) => {
        return state.filter((item) => item.entity_id !== action.payload);
     },
   }
});

export const { addentity, removeentity} = EntityobjectSlice.actions;
export default EntityobjectSlice.reducer;