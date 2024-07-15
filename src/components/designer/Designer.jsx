import React from 'react'
import DesignerSidebar from './DesignerSidebar';
import { useDroppable } from '@dnd-kit/core';
import { cn } from '../../lib/utils'

const Designer = () => {
  
  const droppable = useDroppable({
    id:"2",
    data: {
        type: "textfield",
        isDesignerBtnElement : true
    }
  });

  return (
    <div className='flex w-full h-full'>
        
       <DesignerSidebar/>

       {/* page code */}
       <div className='p-4 w-full'>
          <div 
            ref={droppable.setNodeRef}
            className={cn("bg-white max-w-[920px] h-full m-auto rounded-xl flex flex-col flex-grow items-center justify-start flex-1 overflow-y-auto shadow-xl",
               droppable.isOver && "ring-2 ring-primary/20"
            )}>

            {!droppable.isOver && (
               <p className='text-xl text-slate-700 flex flex-grow items-center font-bold'>Drop Here</p>
            )}
            
            {droppable.isOver && (
               <div className='p-4 w-full'>
                  <div className='h-[120px] rounded-md bg-primary/20'></div>
               </div>
            )}

           </div>
        </div>
    </div>
)}

export default Designer;