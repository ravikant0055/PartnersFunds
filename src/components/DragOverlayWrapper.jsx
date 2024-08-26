import { DragOverlay, useDndMonitor } from '@dnd-kit/core';
import React, { useState } from 'react';
import { SideBarBtnElementDragOverlay } from './SideBarBtnElement';
import TextFields, { TextFieldFormElement } from './fields/TextFields';
import Heading, { HeadingFormElement } from './fields/Heading';
import Buttons, { ButtonFormElement } from './fields/Buttons';
import { TextAreaFormElement } from './fields/TextAreaField';
import TextAreaField from './fields/TextAreaField';
import DateField, { DateFieldFormElement } from './fields/DateField';
import SeparatorField, { SeparatorFormElement } from './fields/SaparatorField';
import SpacerFields, { SpacerFormElement } from './fields/SpacerField';
import CheckboxFields, { CheckboxFormElement } from './fields/CheckboxField';
import SelectField, { SelectFieldFormElement } from './fields/SelectField';
import ToggleField, { ToggleFieldFormElement } from './fields/ToggleField';
import RadioField, { RadioFieldFormElement } from './fields/RadioField';
import Barchart, { BarchartFormElement } from './fields/BarChart';
import Linechart, { LinechartFormElement } from './fields/LineChart';
import Piechart, { PiechartFormElement } from './fields/PieChart';
import Radarchart, { RadarchartFormElement } from './fields/RadarChart';
import Image, { ImageFormElement } from './fields/Image';
import TableFields, { TableFieldFormElement } from './fields/Table';
import AreaChart, { AreachartFormElement } from './fields/AreaChart';
import BubbleChart, { BubblechartFormElement } from './fields/BubbleChart';
import MultiSelects, { MultiSelectsFormElement } from './fields/MultiSelect';
import TitlesField, { TitlesFieldFormElement } from './fields/TitlesField';


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
            "textfield"      : TextFieldFormElement,
            "heading"        : HeadingFormElement,
            "button"         : ButtonFormElement,
            "textarea"       : TextAreaFormElement,
            "datefield"      : DateFieldFormElement,
            "separatorfield" : SeparatorFormElement,
            "spacerfield"    : SpacerFormElement,
            "checkbox"       : CheckboxFormElement,
            "selectfield"    : SelectFieldFormElement,
            "togglefield"    : ToggleFieldFormElement,
            "radiofield"     : RadioFieldFormElement,
            "image"          : ImageFormElement,
            "barchart"       : BarchartFormElement,
            "linechart"      : LinechartFormElement,
            "piechart"       : PiechartFormElement,
            "radarchart"     : RadarchartFormElement,
            "tablefield"     : TableFieldFormElement,
            "multiselect"    : MultiSelectsFormElement,
            "areachart"      : AreachartFormElement,
            "bubblechart"    : BubblechartFormElement,
            "titlefield"     : TitlesFieldFormElement,

        }
        node = <SideBarBtnElementDragOverlay formelement={formelement[type]}/>;
    }

    const isDesignerElement = draggedItem.data?.current?.isDesignerElement;
    if (isDesignerElement) {
       const type = draggedItem.data?.current?.type;
      
       const formshadow = {
        "textfield"         : <TextFields/>,
        "heading"           : <Heading/>,
        "button"            : <Buttons/>,
        "textarea"          : <TextAreaField/>,
        "datefield"         : <DateField/>,
        "separatorfield"    : <SeparatorField/>,
        "spacerfield"       : <SpacerFields/>,
        "checkbox"          : <CheckboxFields/>,
        "selectfield"       : <SelectField />,
        "togglefield"       : <ToggleField/>,
        "radiofield"        : <RadioField/>,
        "image"             : <Image />,
        "barchart"          : <Barchart/>,
        "linechart"         : <Linechart/>,
        "piechart"          : <Piechart/>,
        "radarhart"         : <Radarchart/>,
        "tablefield"        : <TableFields/>,
        "areachart"         : <AreaChart/>,
        "bubblechart"       : <BubbleChart/>,
        "multiselect"       : <MultiSelects/>,
        "titlefield"        : <TitlesField/>
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
