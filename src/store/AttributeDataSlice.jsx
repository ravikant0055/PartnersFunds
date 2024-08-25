import { createSlice } from "@reduxjs/toolkit";

const initialState=[];

const AttributeDataSlice = createSlice({
    name: 'attribute',
    initialState,
    reducers:{
        addElement: (state, action) => {
            state.push(action.payload); // Payload should be the new element
        },
        deleteElement: (state, action) => {
            return state.filter((item) => item.id !== action.payload);
        },
        reorderElements: (state, action) => {
            const { draggedId, x, y } = action.payload;
            const elementIndex = state.findIndex((item) => item.id === draggedId);
      
            if (elementIndex !== -1) {
                // Update the x and y coordinates of the dragged element
                state[elementIndex].x = x;
                state[elementIndex].y = y;
            }
        },
    }
});

export const { addElement, deleteElement, reorderElements } = AttributeDataSlice.actions;
export default AttributeDataSlice.reducer;
