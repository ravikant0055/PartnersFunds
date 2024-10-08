import React from 'react'
import PreviewDialogBtn from '../PageHeader/PreviewDialogBtn';
import SaveFormBtn from '../PageHeader/SaveFormBtn';
import PublishFormBtn from '../PageHeader/PublishFormBtn';
import paperSvg from '../../assests/paper.svg'
import Designer from '../designer/Designer';
import { DndContext, MouseSensor, useSensor, useSensors } from '@dnd-kit/core';
import DragOverlayWrapper from '../DragOverlayWrapper';
import { useDispatch, useSelector } from 'react-redux';
import ExpressionBtn from '../PageHeader/ExpressionBtn';
import ViewobjectBtn from '../PageHeader/ViewobjectBtn';
import EntityobjectBtn from '../PageHeader/EntityobjectBtn';

const FormBuilder = () => {
  const fetchedPageData = useSelector(state => state.page.fetchedPageData); // Selecting fetchedPageData from Redux state
  console.log("fetchedPageData",fetchedPageData);
  console.log("fetchedPageData id",fetchedPageData?.page_id);
   
  const mouseSensor = useSensor(MouseSensor, {
    activationConstraint: {
      distance: 10, // 10px
    },
  });

  const sensors = useSensors(mouseSensor);

  return (
    <DndContext sensors={sensors}>
      <main className='flex flex-col w-full h-full'>
        <nav className='flex justify-between border-b p-4 gap-3 items-center'>
          <h2 className='truncate font-medium'>
              <span className='text-muted-foreground mr-2'>Page: {fetchedPageData?.page_name}</span>
          </h2>
            <div className='flex items-center gap-3'>
              <ViewobjectBtn/>
              <EntityobjectBtn/>
              <ExpressionBtn/>
              <PreviewDialogBtn/>
              <SaveFormBtn id={fetchedPageData?.page_id}/>
              <PublishFormBtn/>
            </div>
        </nav>

        <div className='flex w-full flex-grow items-center justify-center
          relative overflow-y-auto h-[700px] bg-accent'
          style={{ backgroundImage: `url(${paperSvg})` }}>
          <Designer/>
        </div>
        
      </main>
      <DragOverlayWrapper />
    </DndContext>  
  )
}

export default FormBuilder;