import React from 'react'
import SideBarBtnElement from '../SideBarBtnElement';

const DesignerSidebar = () => {
  return (
    <aside className='w-[400px] max-w-[400px] flex flex-col flex-grow
      gap-2 border-r p-4 bg-white overflow-y-auto h-full'>
        Elements
        <SideBarBtnElement />
    </aside>
  )
}

export default DesignerSidebar;