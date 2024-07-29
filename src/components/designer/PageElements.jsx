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

const PageElements = ({element}) => {
  console.log("page element:",element.type);
  console.log("page  id:",element.id);
  const pageData = {
    "textfield"      : <TextFieldsPreview id={element.id}/>,
    "textarea"       : <TextAreaFieldPreview id={element.id}/>,
    "heading"        : <HeadingPreview id={element.id}/>,
    "button"         : <ButtonsPreview id={element.id}/>,
    "datefield"      : <DateFieldsPreview id={element.id}/>,
    "separatorfield" : <SeparatorFieldsPreview id={element.id}/>,
    "spacerfield"    : <SpacerFieldsPreview id={element.id}/>,
    "checkbox"       : <CheckboxPreview id={element.id}/>,
    "selectfield"     : <SelectFieldsPreview id={element.id}/>
  }
  return (
    <div>{pageData[element.type]}</div>
  )
}

export default PageElements;