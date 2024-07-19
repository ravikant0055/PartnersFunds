import React, { useState } from "react";
import DesignerSidebar from "./DesignerSidebar";
import { useDndMonitor, useDraggable, useDroppable } from "@dnd-kit/core";
import { cn } from "../../lib/utils";
import TextFields from "../fields/TextFields";
import { Button } from "../ui/button";
import { BiSolidTrash } from "react-icons/bi";
import { idGenerator } from 'src/lib/idGenerator'

const Designer = () => {

  const [myData, setMyData] =useState({}); 

  const droppable = useDroppable({
    id: "designer-drop-area",
    data: {
      type: "textfield",
      isDesignerBtnElement: true,
    },
  });

  useDndMonitor({
    onDragEnd: function (event) {
      const { active, over } = event;
      if (!active || !over) return;

      const isDesignerBtnElement = active.data?.current?.isDesignerBtnElement;

      if (isDesignerBtnElement) {
        const type = active.data?.current?.type;
        // const newElement = myData[type].idGenerator();

        // setMyData([...myData, type]);
        const newElement = idGenerator(); // Assuming idGenerator is imported or defined here
        console.log("New Element", newElement); 

        setMyData(prevData => ({
          ...prevData,
          [type]: [...(prevData[type] || []), newElement]
        }));

       
        console.log(myData);
      }

      console.log("DRAG END", event);
    },
  });

  return (
    <div className="flex w-full h-full">
      <DesignerSidebar />

      {/* page code */}
      <div className="p-4 w-full">
        <div
          ref={droppable.setNodeRef}
          className={cn(
            "bg-white max-w-[920px] h-full m-auto rounded-xl flex flex-col flex-grow items-center justify-start flex-1 overflow-y-auto shadow-xl",
            droppable.isOver && "ring-2 ring-primary/20"
          )}
        >
          {!droppable.isOver && Object.keys(myData).length === 0 && (
            <p className="text-xl text-slate-700 flex flex-grow items-center font-bold">
              Drop Here
            </p>
          )}

          {droppable.isOver && Object.keys(myData).length === 0 &&(
            <div className="p-4 w-full">
              <div className="h-[120px] rounded-md bg-primary/20"></div>
            </div>
          )}

          {Object.keys(myData)?.length > 0 && (
            <div className="flex flex-col text-black w-full gap-2 p-4">
               {Object.keys(myData).map((type,index) => (
                     <div key={index}>
                     {myData[type].map((element, idx) => (
                       <DesignerElementWrapper key={idx} element={element} />
                     ))}
                   </div> 
                 ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};



// dragged item code
function DesignerElementWrapper() {
  const [mouseIsOver ,setMouseISOver] = useState(false);
  const topHalf = useDroppable({
    id: 2 + "-top ",
    data: {
      type: "text field",
      elementId: 1,
      isTopHalfDesignerElement: true,
    },
  });

  const bottomHalf = useDroppable({
    id: 2 + "-bottom",
    data: {
      type: "text field",
      elementId: 1,
      isBottomHalfDesignerElement: true,
    },
  });   
  
  const draggable = useDraggable({
    id: 2 + "-drag-handler",
    data: {
      type: "text field",
      elementId: 1,
      isDesignerElement: true,
    },
  }); 


  const removeElement = (e) =>{
    console.log("delete button"+e);
  }

  const selectedElement = (e) =>{
    console.log("item selected"+e);
  }

  //if(draggable.isDragging) return null;

  return (
    <div 
     ref={draggable.setNodeRef}
     {...draggable.listeners}
     {...draggable.attributes}
     className="relative h-[120px] flex flex-col text-foreground
     hover:cursor-pointer rounded-md ring-1 ring-accent ring-inset"
     onMouseEnter={()=>{setMouseISOver(true);}}
     onMouseLeave={()=>{setMouseISOver(false);}}
     onClick={(e)=>{
      e.stopPropagation();
      selectedElement("myitem");
     }}
     >

      <div ref={topHalf.setNodeRef} className="absolute w-full h-1/2 rounded-t-md" />
      <div ref={bottomHalf.setNodeRef} className="absolute w-full bottom-0 h-1/2 rounded-b-md" />
      
      {mouseIsOver && (
        <>
          <div className="absolute right-0 h-full">
            <Button
              className="flex justify-center h-full border rounded-md rounded-l-none bg-red-500"
              variant={"outline"}
              onClick={(e) => {
                e.stopPropagation(); // avoid selection of element while deleting
                removeElement(2);
              }}
            >
              <BiSolidTrash className="h-6 w-6" />
            </Button>
          </div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-pulse">
            <p className="text-muted-foreground text-sm">Click for properties or drag to move</p>
          </div>
        </>
      )}

      {topHalf.isOver && <div className="absolute top-0 w-full rounded-md h-[7px] bg-primary rounded-b-none" />}


      <div className={cn("flex w-full h-[120px] items-center rounded-md bg-accent/40 px-4 py-2 pointer-events-none opacity-100",
         mouseIsOver && "opacity-30"
         )}>
        <TextFields/>
       </div> 

       {bottomHalf.isOver && <div className="absolute bottom-0 w-full rounded-md h-[7px] bg-primary rounded-t-none" />}

    </div>
)}


export default Designer;
