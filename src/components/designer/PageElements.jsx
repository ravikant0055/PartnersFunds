import React from 'react'
import { TextFieldsPreview } from '../fields/TextFields'
import { TextAreaFieldPreview } from '../fields/TextAreaField'
import { HeadingPreview } from '../fields/Heading'
import { ButtonsPreview } from '../fields/Buttons'

const PageElements = ({element}) => {
  console.log("page element:",element.type);
  console.log("page  id:",element.id);
  const pageData = {
    "textfield" : <TextFieldsPreview id={element.id}/>,
    "textarea"  : <TextAreaFieldPreview id={element.id}/>,
    "heading" : <HeadingPreview id={element.id}/>,
    "button"  : <ButtonsPreview id={element.id}/>
  }
  return (
    <div>{pageData[element.type]}</div>
  )
}

export default PageElements;