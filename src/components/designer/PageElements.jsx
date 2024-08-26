import React from 'react'
import { TextFieldsPreview } from '../fields/TextFields'
import { TextAreaFieldPreview } from '../fields/TextAreaField'
import { HeadingPreview } from '../fields/Heading'
import { ButtonsPreview } from '../fields/Buttons'
import { DateFieldsPreview } from '../fields/DateField'
import { SeparatorFieldsPreview } from '../fields/SaparatorField'
import { SpacerFieldsPreview } from '../fields/SpacerField'
import { CheckboxPreview } from '../fields/CheckboxField'
import { SelectFieldsPreview } from '../fields/SelectField'
import { ToggleFieldsPreview } from '../fields/ToggleField'
import { RadioFieldsPreview } from '../fields/RadioField'
import { BarchartPreview } from '../fields/BarChart'
import { LinechartPreview } from '../fields/LineChart'
import { PiechartPreview } from '../fields/PieChart'
import { RadarchartPreview } from '../fields/RadarChart'
import { ImageFieldPreview } from '../fields/Image'
import { TableFieldsPreview } from '../fields/Table'
import { AreachartPreview } from '../fields/AreaChart'
import { BubblechartPreview } from '../fields/BubbleChart'
import { MultiSelectPreview } from '../fields/MultiSelect'
import { TitlesFieldPreview } from '../fields/TitlesField'

const PageElements = ({element}) => {
  console.log("page element:",element.type);
  console.log("page  id:",element.id);
  console.log("elemt" , element);
  const pageData = {
    "textfield"      : <TextFieldsPreview id={element.id}/>,
    "textarea"       : <TextAreaFieldPreview id={element.id}/>,
    "heading"        : <HeadingPreview id={element.id}/>,
    "button"         : <ButtonsPreview id={element.id}/>,
    "datefield"      : <DateFieldsPreview id={element.id}/>,
    "separatorfield" : <SeparatorFieldsPreview id={element.id}/>,
    "spacerfield"    : <SpacerFieldsPreview id={element.id}/>,
    "checkbox"       : <CheckboxPreview id={element.id}/>,
    "selectfield"    : <SelectFieldsPreview id={element.id}/>,
    "togglefield"    : <ToggleFieldsPreview id={element.id}/>,
    "radiofield"     : <RadioFieldsPreview id={element.id} />,
    "barchart"       : <BarchartPreview id={element.id}/>,
    "linechart"      : <LinechartPreview id={element.id}/>,
    "piechart"       : <PiechartPreview id={element.id}/>,
    "radarchart"     : <RadarchartPreview id={element.id}/>,
    "image"          : <ImageFieldPreview id={element.id} />,
    "tablefield"     : <TableFieldsPreview id={element.id}/>,
    "titlefield"     : <TitlesFieldPreview id={element.id}/>,
  }
  return (
    <div className="relative">
      <div style={{ position: 'absolute', left: `${element.x}px`, top: `${element.y}px` }}>
        {pageData[element.type]}
      </div>
    </div>
  )
}

export default PageElements;