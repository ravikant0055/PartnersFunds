import React, { useState } from "react";
import DesignerSidebar from "./DesignerSidebar";
import { useDndMonitor, useDraggable, useDroppable } from "@dnd-kit/core";
import { cn } from "../../lib/utils";
import TextFields from "../fields/TextFields";
import Buttons from "../fields/Buttons";
import { Button } from '../ui/button';
import { BiSolidTrash } from "react-icons/bi";
import { idGenerator } from 'src/lib/idGenerator';
import Heading from "../fields/Heading";
import { useDispatch, useSelector } from "react-redux";
import { propOff, propOn } from "../../store/PropertiesSlice";
import TextAreaField from "../fields/TextAreaField";
import { addElement, deleteElement, reorderElements } from "../../store/AttributeDataSlice";

const Designer = () => {

  const myData = useSelector((state) => state.attribute);
  const {isOpen} = useSelector((state) => state.properties);
  const dispatch = useDispatch();

  const handleDeleteElement = (id) => {
    dispatch(deleteElement(id));
  };
  const droppable = useDroppable({
    id: "designer-drop-area",
    data: {
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
        const newElement = { id: idGenerator(), type }; // Unique ID and type for new element
        dispatch(addElement(newElement));
      } else {
        const draggedId = active.id;
        const overId = over.id.replace(/-(top|bottom)$/, '');
        dispatch(reorderElements({ draggedId, overId }));
      }
      console.log("DRAG mydata", myData);
      console.log("DRAG event", event);
    },
  });

  return (
    <div className="flex w-full h-full">
      <DesignerSidebar />

      {/* page code */}
      <div className="p-4 w-full" 
           onClick={()=>{
              if(isOpen){
                dispatch(propOff());
              }
           }}>
        <div
          ref={droppable.setNodeRef}
          className={cn(
            "bg-white max-w-[920px] h-full m-auto rounded-xl flex flex-col flex-grow items-center justify-start flex-1 overflow-y-auto shadow-xl",
            droppable.isOver && "ring-2 ring-primary/20"
          )}
        >
          {!droppable.isOver && myData.length === 0 && ( // Adjusted condition to check array length
            <p className="text-xl text-slate-700 flex flex-grow items-center font-bold">
              Drop Here
            </p>
          )}

          {droppable.isOver && myData.length === 0 && ( // Adjusted condition to check array length
            <div className="p-4 w-full">
              <div className="h-[120px] rounded-md bg-primary/20"></div>
            </div>
          )}

          {myData.length > 0 && ( // Adjusted condition to check array length
            <div className="flex flex-col text-black w-full gap-2 p-4">
              {myData.map((element) => (
                <DesignerElementWrapper key={element.id} element={element}  onDelete={handleDeleteElement} /> // Key and element passed to wrapper
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// dragged item code
function DesignerElementWrapper({ element, onDelete }) {
  const [mouseIsOver, setMouseIsOver] = useState(false);
  const dispatch = useDispatch();
  const topHalf = useDroppable({
    id: element.id + "-top",
    data: {
      type: element.type,
      elementId: element.id,
      isTopHalfDesignerElement: true,
    },
  });

  const bottomHalf = useDroppable({
    id: element.id + "-bottom",
    data: {
      type: element.type,
      elementId: element.id,
      isBottomHalfDesignerElement: true,
    },
  });

  const draggable = useDraggable({
    id: element.id, // Use element.id directly
    data: {
      type: element.type,
      elementId: element.id,
      isDesignerElement: true,
    },
  });

  const removeElement = (e) => {
    console.log("delete button" + e);
    onDelete(e);
    dispatch(propOff());
  };

  const selectedElement = (e) => {
    console.log("item selected",e);
    dispatch(propOn(e));
  };

  const fieldType = {
    textfield: <TextFields id={element.id} />,
    heading: <Heading id={element.id} />,
    button: <Buttons id={element.id} />,
    textarea: <TextAreaField id={element.id} />
  };

  if(draggable.isDragging) return null;

  return (
    <div
      ref={draggable.setNodeRef}
      {...draggable.listeners}
      {...draggable.attributes}
      className="relative h-[120px] flex flex-col text-foreground hover:cursor-pointer rounded-md ring-1 ring-accent ring-inset"
      onMouseEnter={() => {
        setMouseIsOver(true);
      }}
      onMouseLeave={() => {
        setMouseIsOver(false);
      }}
      onClick={(e) => {
        e.stopPropagation();
        selectedElement(element);
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
                removeElement(element.id);
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

      <div
        className={cn(
          "flex w-full h-[120px] items-center rounded-md bg-accent/40 px-4 py-2 pointer-events-none opacity-100",
          mouseIsOver && "opacity-30"
        )}
      >
        {fieldType[element.type]}
      </div>

      {bottomHalf.isOver && <div className="absolute bottom-0 w-full rounded-md h-[7px] bg-primary rounded-t-none" />}
    </div>
  );
}

export default Designer;