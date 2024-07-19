import React from 'react'
import { Button } from './ui/button';
import { useDraggable } from '@dnd-kit/core';
import { cn } from '../lib/utils'; 

function SideBarBtnElement({formelement}) {
  console.log("formelement",formelement?.type);
  const Icon = formelement?.icon;
  const draggable = useDraggable({
    id:`designer-btn-${formelement?.type}`,
    data: {
        type: formelement?.type,
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

        {Icon && <Icon className='h-8 w-8 text-primary cursor-grab'/>} 
        <p className='text-xs'>{formelement?.label}</p>
    </Button>
  )
}

export function SideBarBtnElementDragOverlay({formelement}) {
  const Icon = formelement?.icon;
  return (
    <Button variant={'outline'}
            className="flex flex-col gap-2 h-[120px] w-[120px] cursor-grab">
        {Icon && <Icon className='h-8 w-8 text-primary cursor-grab'/>}
        <p className='text-xs'> Text Feild</p>
    </Button>
  )
}

export default SideBarBtnElement;