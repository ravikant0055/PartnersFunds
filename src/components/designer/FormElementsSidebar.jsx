import React from 'react'
import SideBarBtnElement from '../SideBarBtnElement'
import { TextFieldFormElement } from '../fields/TextFields'
import { HeadingFormElement } from '../fields/Heading'
import { ButtonFormElement } from '../fields/Buttons'
import { TextAreaFormElement } from '../fields/TextAreaField'
import { DateFieldFormElement } from '../fields/DateField'
import { SeparatorFormElement } from '../fields/SaparatorField'
import { SpacerFormElement } from '../fields/SpacerField'
import { CheckboxFormElement } from '../fields/CheckboxField'
import { SelectFieldFormElement } from '../fields/SelectField'
import { ToggleFieldFormElement } from '../fields/ToggleField'
import { RadioFieldFormElement } from '../fields/RadioField'
import { BarchartFormElement } from '../fields/BarChart'
import { LinechartFormElement } from '../fields/LineChart'
import { PiechartFormElement } from '../fields/PieChart'
import { RadarchartFormElement } from '../fields/RadarChart'
import { ImageFormElement } from '../fields/Image'
import { TableFieldFormElement } from '../fields/Table'
import { MultiSelectsFormElement } from '../fields/MultiSelect'

const FormElementsSidebar = () => {
  return (
    <div>
        <div className='grid grid-cols-2 gap-4 place-items-center'>
          <p className='text-sm text-muted-foreground col-span-2 place-self-start my-2'>Layout Elements</p>
          <SideBarBtnElement formelement={SeparatorFormElement} />
          <SideBarBtnElement formelement={SpacerFormElement} />

          <p className='text-sm text-muted-foreground col-span-2 place-self-start my-2'>Form Elements</p>
          <SideBarBtnElement formelement={TextFieldFormElement}/>
          <SideBarBtnElement formelement={HeadingFormElement}/>
          <SideBarBtnElement formelement={ButtonFormElement}/>
          <SideBarBtnElement formelement={TextAreaFormElement}/>
          <SideBarBtnElement formelement={DateFieldFormElement}/>
          <SideBarBtnElement formelement={CheckboxFormElement}/>
          <SideBarBtnElement formelement={SelectFieldFormElement}/>
          <SideBarBtnElement formelement={MultiSelectsFormElement}/>
          <SideBarBtnElement formelement={ToggleFieldFormElement}/>
          <SideBarBtnElement formelement={RadioFieldFormElement}/>
          <SideBarBtnElement formelement={TableFieldFormElement}/>
          <SideBarBtnElement formelement={ImageFormElement} />

          <p className='text-sm text-muted-foreground col-span-2 place-self-start my-2'>Graphs Elements </p>
          <SideBarBtnElement formelement={BarchartFormElement}/>
          <SideBarBtnElement formelement={LinechartFormElement}/>
          <SideBarBtnElement formelement={PiechartFormElement}/>
          <SideBarBtnElement formelement={RadarchartFormElement}/>
        </div>
    </div>
  )
}

export default FormElementsSidebar