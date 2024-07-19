import { DragOverlay, useDndMonitor } from '@dnd-kit/core';
import React, { useState } from 'react';
import { SideBarBtnElementDragOverlay } from './SideBarBtnElement';
import TextFields, { TextFieldFormElement } from './fields/TextFields';


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
       node = <SideBarBtnElementDragOverlay formelement={TextFieldFormElement} />;
    }

    const isDesignerElement = draggedItem.data?.current?.isDesignerElement;
    if (isDesignerElement) {
       node = (
        <div className='flex bg-accent border rounded-md h-[120px] w-full py-2
         px-4 opacity-90 pointer pointer-events-none'>
            <TextFields/>
        </div>
       )
    }
    
    
    return <DragOverlay>{node}</DragOverlay>;
}

export default DragOverlayWrapper;
