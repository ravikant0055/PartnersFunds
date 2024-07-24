import {createSlice} from '@reduxjs/toolkit';

const initialState = [];

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
            const { draggedId, overId } = action.payload;
            const draggedIndex = state.findIndex((item) => item.id === draggedId);
            const overIndex = state.findIndex((item) => item.id === overId);
      
            if (draggedIndex !== -1 && overIndex !== -1 && draggedIndex !== overIndex) {
              const [movedItem] = state.splice(draggedIndex, 1);
              state.splice(overIndex, 0, movedItem);
            }
        },
    }
});

export const {addElement,deleteElement,reorderElements} = AttributeDataSlice.actions;
export default AttributeDataSlice.reducer;