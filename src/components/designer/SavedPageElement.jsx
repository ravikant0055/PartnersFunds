import React from 'react'
import { TextFieldsPage, TextFieldsPreview } from '../fields/TextFields'
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

const SavedPageElement = ({element}) => {
    console.log("Merger  : => ",element);
  console.log("Type :",element.type);
  const pageData = {
    "textfield"      : <TextFieldsPage id={element.id} properties={element.properties}/>,
    "textarea"       : <TextAreaFieldPreview id={element.id} properties={element.properties}/>,
    "heading"        : <HeadingPreview id={element.id} properties={element.properties}/>,
    "button"         : <ButtonsPreview id={element.id} properties={element.properties}/>,
    "datefield"      : <DateFieldsPreview id={element.id} properties={element.properties}/>,
    "separatorfield" : <SeparatorFieldsPreview id={element.id} properties={element.properties}/>,
    "spacerfield"    : <SpacerFieldsPreview id={element.id} properties={element.properties}/>,
    "checkbox"       : <CheckboxPreview id={element.id} properties={element.properties}/>,
    "selectfield"    : <SelectFieldsPreview id={element.id} properties={element.properties}/>,
    "togglefield"    : <ToggleFieldsPreview id={element.id} properties={element.properties}/>,
    "radiofield"     : <RadioFieldsPreview id={element.id} properties={element.properties} />
  }

  

  return (
    <div>{pageData[element.type]}</div>
  )
}

export default SavedPageElement;