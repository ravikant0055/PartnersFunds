import React from 'react'
import SideBarBtnElement from '../SideBarBtnElement'
import { TextFieldFormElement } from '../fields/TextFields'
import { HeadingFormElement } from '../fields/Heading'

const FormElementsSidebar = () => {
  return (
    <div>
        <div className='grid grid-cols-2 gap-4 place-items-center'>
          <p className='text-sm text-muted-foreground col-span-2 place-self-start my-2'>Elements</p>
          <SideBarBtnElement formelement={TextFieldFormElement} />
          <SideBarBtnElement formelement={HeadingFormElement} />
          <SideBarBtnElement  />
          <SideBarBtnElement  />
          <SideBarBtnElement  />
          <SideBarBtnElement  />
        </div>
    </div>
  )
}

export default FormElementsSidebar