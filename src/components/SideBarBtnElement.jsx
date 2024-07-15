import React from 'react'
import { Button } from './ui/button';
import { MdTextFields } from 'react-icons/md';
import { useDraggable } from '@dnd-kit/core';
import { cn } from '../lib/utils';

function SideBarBtnElement() {
  const draggable = useDraggable({
    id:"2",
    data: {
        type: "textfield",
        isDesignerBtnElement : true
    }
  });
  return (
    <Button ref={draggable.setNodeRef}
            variant={'outline'}
            {...draggable.listeners}
            {...draggable.attributes}
            className={cn("flex flex-col gap-2 h-[120px] w-[120px] cursor-grab",
                draggable.isDragging && "ring-2 ring-primary"
            )}>
        <MdTextFields className='h-8 w-8 text-primary cursor-grab'/>
        <p className='text-xs'> Text Feild</p>
    </Button>
  )
}

export function SideBarBtnElementDragOverlay() {
  return (
    <Button variant={'outline'}
            className="flex flex-col gap-2 h-[120px] w-[120px] cursor-grab">
        <MdTextFields className='h-8 w-8 text-primary cursor-grab'/>
        <p className='text-xs'> Text Feild</p>
    </Button>
  )
}

export default SideBarBtnElement;