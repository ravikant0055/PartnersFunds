import React, { useEffect, useRef, useState } from "react";
import DesignerSidebar from "./DesignerSidebar";
import { useDndMonitor, useDraggable, useDroppable } from "@dnd-kit/core";
import { cn } from "../../lib/utils";
import TextFields from "../fields/TextFields";
import Buttons from "../fields/Buttons";
import { Button } from '../ui/button';
import { BiSolidTrash } from "react-icons/bi";
import Heading from "../fields/Heading";
import { useDispatch, useSelector } from "react-redux";
import { propOff, propOn } from "../../store/PropertiesSlice";
import TextAreaField from "../fields/TextAreaField";
import { addElement, deleteElement, reorderElements } from "../../store/AttributeDataSlice";
import { createAttribute, removeAttributebyId } from "../../store/PageDataSlice";
import DateField from "../fields/DateField";
import SeparatorField from "../fields/SaparatorField";
import SpacerFields from "../fields/SpacerField";
import CheckboxFields from "../fields/CheckboxField";
import SelectField from "../fields/SelectField";
import ToggleField from "../fields/ToggleField";
import RadioField from "../fields/RadioField";
import Barchart from "../fields/BarChart";
import Linechart from "../fields/LineChart";
import Piechart from "../fields/PieChart";
import Radarchart from "../fields/RadarChart";
import Image from "../fields/Image";
import { deleteprop, updateprop } from "../../store/AttributePropDataSlice";
import TableFields from "../fields/Table";
import AreaChart from "../fields/AreaChart";
import BubbleChart from "../fields/BubbleChart";
import MultiSelects from "../fields/MultiSelect";
import TilesField from "../fields/TilesField";

const Designer = () => {

  const myData = useSelector((state) => state.attribute);
  const {isOpen} = useSelector((state) => state.properties);
  const pageId = useSelector((state) => state.page.fetchedPageData?.page_id);
  const dispatch = useDispatch();
  const containerRef = useRef(null);

  const handleDeleteElement = (id) => {
    dispatch(removeAttributebyId(id));
    dispatch(deleteElement(id));
    dispatch(deleteprop(id));
  };
  const droppable = useDroppable({
    id: "designer-drop-area",
    data: {
      isDesignerBtnElement: true,
    },
  });

  useDndMonitor({
    onDragEnd: async (event) => {
      const { active, over } = event;
      if (!active || !over) return;
  
      const pageX = event.delta.x + event.activatorEvent.clientX;
      const pageY = event.delta.y + event.activatorEvent.clientY;
  
      // Calculate the adjusted coordinates based on the 'over' element's bounding box
      const overRect = over.rect;
      const adjustedX = pageX - overRect.left;
      const adjustedY = pageY - overRect.top;
  
      const isDesignerBtnElement = active.data?.current?.isDesignerBtnElement;
  
      if (isDesignerBtnElement) {
        const type = active.data?.current?.type;
  
        // Dispatch action to create attribute with new coordinates
        const postdata = {
          pageId: pageId,
          type: type,
          x: adjustedX,
          y: adjustedY,
        };
  
        try {
          const res = await dispatch(createAttribute(postdata));
          const attributeId = res.payload.attribute_id;
  
          // Create a new element with updated coordinates
          const newElement = { id: attributeId.toString(), type, x: adjustedX, y: adjustedY };
          dispatch(addElement(newElement));
        } catch (error) {
          console.error("Error creating attribute:", error);
        }
      } else {
        const draggedId = active.id;
  
        // Dispatch the action to reorder and update the coordinates
        dispatch(reorderElements({ draggedId, x: adjustedX, y: adjustedY }));
      }
      console.log("Drag event:", event);
    },
  });
  
  
  
  

  return (
    <div className="flex w-full h-full">
      <DesignerSidebar />
  
      {/* page code */}
      <div className="p-4 w-full" 
           onClick={() => {
              if (isOpen) {
                dispatch(propOff());
              }
           }}>
        <div
          ref={droppable.setNodeRef}
          className={cn(
            "relative bg-white max-w-[1200px] h-full m-auto rounded-xl flex flex-col flex-grow items-center justify-start flex-1 overflow-y-auto shadow-xl",
            droppable.isOver && "ring-2 ring-primary/20"
          )}
        >
          {!droppable.isOver && myData.length === 0 && (
            <p className="text-xl text-slate-700 flex flex-grow items-center font-bold">
              Drop Here
            </p>
          )}
  
          {myData.length > 0 && (
            <div className="relative w-full h-full overflow-y-auto">
              {myData.map((element) => (
                <DesignerElementWrapper
                  key={element.id}
                  element={element}
                  onDelete={handleDeleteElement}
                  style={{ position: 'absolute', left: `${element.x}px`, top: `${element.y}px` }} // Position based on coordinates
                />
              ))}
            </div>
          )}

        </div>
      </div>
    </div>
  );
  
};

// dragged item code
function DesignerElementWrapper({ element, onDelete, style }) {
  const [mouseIsOver, setMouseIsOver] = useState(false);
  const dispatch = useDispatch();
  const {id,x,y} = element;
  useEffect(() => {
      dispatch(updateprop({ id, x, y}));
  }, [x ,y]);

  const draggable = useDraggable({
    id: element.id,
    data: {
      type: element.type,
      elementId: element.id,
      isDesignerElement: true,
    },
  });

  const removeElement = (e) => {
    e.stopPropagation(); // prevent triggering selection on delete
    onDelete(element.id);
    dispatch(propOff());
  };

  const selectedElement = (e) => {
    e.stopPropagation(); // prevent triggering other events
    dispatch(propOn(element));
  };

  console.log("desginer element",element);
  console.log("x element",element.x);

  const fieldType = {
    textfield       : <TextFields id={element.id} x={element.x} y={element.y} />,
    heading         : <Heading id={element.id} x={element.x} y={element.y} />,
    button          : <Buttons id={element.id} x={element.x} y={element.y} />,
    textarea        : <TextAreaField id={element.id} x={element.x} y={element.y}  />,
    datefield       : <DateField id={element.id} x={element.x} y={element.y}  />,
    separatorfield  : <SeparatorField id={element.id} x={element.x} y={element.y}  />,
    spacerfield     : <SpacerFields id={element.id} x={element.x} y={element.y} />,
    checkbox        : <CheckboxFields id={element.id} x={element.x} y={element.y} />,
    selectfield     : <SelectField id={element.id} x={element.x} y={element.y} />,
    togglefield     : <ToggleField id={element.id} x={element.x} y={element.y} />,
    radiofield      : <RadioField id={element.id} x={element.x} y={element.y}  />,
    image           : <Image id={element.id} x={element.x} y={element.y}  />,
    barchart        : <Barchart id={element.id} x={element.x} y={element.y} />,
    linechart       : <Linechart id={element.id} x={element.x} y={element.y} />,
    piechart        : <Piechart id={element.id} x={element.x} y={element.y} />,
    radarchart      : <Radarchart id={element.id} x={element.x} y={element.y} />,
    tablefield      : <TableFields id={element.id} x={element.x} y={element.y} />,
    multiselect      : <MultiSelects id={element.id} x={element.x} y={element.y} />,
    areachart       : <AreaChart id={element.id} x={element.x} y={element.y} />,
    bubblechart     : <BubbleChart id={element.id} x={element.x} y={element.y} />,
    tilesfield      : <TilesField id={element.id} x={element.x} y={element.y} />,
  };

  if (draggable.isDragging) return null;

  return (
    <div
      ref={draggable.setNodeRef}
      {...draggable.listeners}
      {...draggable.attributes}
      style={style} // Apply the passed style
      className="text-foreground hover:cursor-pointer rounded-md ring-accent ring-inset"
      onMouseEnter={() => setMouseIsOver(true)}
      onMouseLeave={() => setMouseIsOver(false)}
      onClick={(e) => selectedElement(e)}
    >
      {mouseIsOver && (
        <>
          <div className="absolute right-0 h-full">
            <Button
              className="flex justify-center h-full border rounded-md rounded-l-none bg-red-500"
              variant={"outline"}
              onClick={(e) => removeElement(e)}
            >
              <BiSolidTrash className="h-6 w-6" />
            </Button>
          </div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-pulse">
            <p className="text-muted-foreground text-sm">Click for properties or drag to move</p>
          </div>
        </>
      )}

      <div
        className={cn(
          "flex w-full py-4 h-fit items-center rounded-md px-4 pointer-events-none opacity-100",
          mouseIsOver && "opacity-30"
        )}
      >
        {fieldType[element.type]}
      </div>
    </div>
  );
}



export default Designer;