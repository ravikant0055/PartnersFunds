import { createSlice } from '@reduxjs/toolkit';

const initialState = [];

const ViewobjectSlice = createSlice({
  name: 'viewdata',
  initialState,
  reducers: {
    addview: (state, action) => {
      state.push(action.payload);
    },
    removeview: (state, action) => {
      return state.filter((item) => item.view_id !== action.payload); // Assuming 'view_id' is the unique identifier
    },
    updateview: (state, action) => {
      const { index, data } = action.payload;
      state[index] = data; // Update the view at the given index with new data
    },
  },
});

export const { addview, removeview, updateview } = ViewobjectSlice.actions;
export default ViewobjectSlice.reducer;
