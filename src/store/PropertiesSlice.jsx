import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    isOpen: false,
    selectedElement: null
};

const PropertiesSlice = createSlice({
    name: 'properties',
    initialState,
    reducers:{
        propOn(state, action) {
            state.isOpen = true;
            state.selectedElement = action.payload; // Store the selected element data
          },
        propOff(state) {
            state.isOpen = false;
            state.selectedElement = null; // Clear the selected element data
        }
    }
});

export const {propOn,propOff} = PropertiesSlice.actions;
export default PropertiesSlice.reducer;