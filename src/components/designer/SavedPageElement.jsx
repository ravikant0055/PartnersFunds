import React from 'react'
import { TextFieldsPage } from '../fields/TextFields'
import { TextAreaFieldPage } from '../fields/TextAreaField'
import { HeadingPage } from '../fields/Heading'
import { ButtonsPage } from '../fields/Buttons'
import { DateFieldsPage } from '../fields/DateField'
import { SeparatorFieldsPage } from '../fields/SaparatorField'
import { SpacerFieldsPage } from '../fields/SpacerField'
import { CheckboxPage } from '../fields/CheckboxField'
import { SelectFieldsPage } from '../fields/SelectField'
import { ToggleFieldsPage } from '../fields/ToggleField'
import { RadioFieldsPage } from '../fields/RadioField'
import { IconFieldPage } from '../fields/Icons'
import { ImageFieldPage } from '../fields/Image'
import { TableFieldsPage } from '../fields/Table'

const SavedPageElement = ({element, submitValues}) => {
    console.log("Merger  : => ",element);
  console.log("Type :",element.attribute_type);
  const pageData = {
    "textfield"      : <TextFieldsPage id={element.attribute_id} properties={element.pageAttrPropertiesEntity} submitValues={submitValues} />,
    "textarea"       : <TextAreaFieldPage id={element.attribute_id} properties={element.pageAttrPropertiesEntity} submitValues={submitValues}/>,
    "heading"        : <HeadingPage id={element.attribute_id} properties={element.pageAttrPropertiesEntity} submitValues={submitValues}/>,
    "button"         : <ButtonsPage id={element.attribute_id} properties={element.pageAttrPropertiesEntity} submitValues={submitValues}/>,
    "datefield"      : <DateFieldsPage id={element.attribute_id} properties={element.pageAttrPropertiesEntity} submitValues={submitValues}/>,
    "separatorfield" : <SeparatorFieldsPage id={element.attribute_id} properties={element.pageAttrPropertiesEntity} submitValues={submitValues}/>,
    "spacerfield"    : <SpacerFieldsPage id={element.attribute_id} properties={element.pageAttrPropertiesEntity} submitValues={submitValues}/>,
    "checkbox"       : <CheckboxPage id={element.attribute_id} properties={element.pageAttrPropertiesEntity} submitValues={submitValues}/>,
    "selectfield"    : <SelectFieldsPage id={element.attribute_id} properties={element.pageAttrPropertiesEntity} submitValues={submitValues}/>,
    "togglefield"    : <ToggleFieldsPage id={element.attribute_id} properties={element.pageAttrPropertiesEntity} submitValues={submitValues}/>,
    "radiofield"     : <RadioFieldsPage id={element.attribute_id} properties={element.pageAttrPropertiesEntity} submitValues={submitValues}/>,
    "image"          : <ImageFieldPage id={element.attribute_id} properties={element.pageAttrPropertiesEntity} submitValues={submitValues}/>,
    "icon"           : <IconFieldPage id={element.attribute_id} properties={element.pageAttrPropertiesEntity} submitValues={submitValues}/>,
    "tablefield"     : <TableFieldsPage id={element.attribute_id} properties={element.pageAttrPropertiesEntity} submitValues={submitValues}/>,
  }

  

  return (
    <div>{pageData[element.attribute_type]}</div>
  )
}

export default SavedPageElement;