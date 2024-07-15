import { DragOverlay, useDndMonitor } from '@dnd-kit/core';
import React, { useState } from 'react';
import { SideBarBtnElementDragOverlay } from './SideBarBtnElement';


function DragOverlayWrapper() {
    const [draggedItem, setDraggedItem] = useState(null);

    useDndMonitor({
        onDragStart: (event) => {
            setDraggedItem(event.active);
        },

        onDragCancel: () => {
            setDraggedItem(null);
        },

        onDragEnd: () => {
            setDraggedItem(null);
        },
    });

    if (!draggedItem) return null;

    let node = <div>No drag overlay</div>;
    const isSidebarBtnElement = draggedItem.data?.current?.isDesignerBtnElement;

    if (isSidebarBtnElement) {
       node = <SideBarBtnElementDragOverlay />;
    }
    
    return <DragOverlay>{node}</DragOverlay>;
}

export default DragOverlayWrapper;
