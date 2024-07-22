import { DragOverlay, useDndMonitor } from '@dnd-kit/core';
import React, { useState } from 'react';
import { SideBarBtnElementDragOverlay } from './SideBarBtnElement';
import TextFields, { TextFieldFormElement } from './fields/TextFields';
import Heading, { HeadingFormElement } from './fields/Heading';
import Buttons, { ButtonFormElement } from './fields/Buttons';


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
        const type = draggedItem.data?.current?.type;
        console.log("type",type);
        const formelement = {
            "textfield" : TextFieldFormElement,
            "heading"   : HeadingFormElement,
            "button"    : ButtonFormElement

        }
        node = <SideBarBtnElementDragOverlay formelement={formelement[type]}/>;
    }

    const isDesignerElement = draggedItem.data?.current?.isDesignerElement;
    if (isDesignerElement) {
       const type = draggedItem.data?.current?.type;

       const formshadow = {
        "textfield" : <TextFields/>,
        "heading"   : <Heading/>,
        "button"   : <Buttons/>
       }

       console.log("2ndtype",type);
       node = (
        <div className='flex bg-accent border rounded-md h-[120px] w-full py-2
         px-4 opacity-90 pointer pointer-events-none'>
        {formshadow[type]}
        </div>
       )
    }
    
    
    return <DragOverlay>{node}</DragOverlay>;
}

export default DragOverlayWrapper;
