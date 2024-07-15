import React from 'react'
import DesignerSidebar from './DesignerSidebar';
//import { useDroppable } from '@dnd-kit/core';

const Designer = () => {
  
  //const droppable = useDroppable();

  return (
    <div className='flex w-full h-full'>
        
       <DesignerSidebar/>

       {/* page code */}
       <div className='p-4 w-full'>
          <div className='bg-white max-w-[920px] h-full m-auto rounded-xl flex flex-col flex-grow items-center
           justify-start flex-1 overflow-y-auto shadow-xl'>
              <p className='text-xl text-slate-700 flex flex-grow items-center font-bold'>Drop Here</p>
           </div>
        </div>
    </div>
)}

export default Designer;