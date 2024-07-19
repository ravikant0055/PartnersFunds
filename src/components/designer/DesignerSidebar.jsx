import React from 'react'
import FormElementsSidebar from './FormElementsSidebar';
//import PropertiesSidebar from './PropertiesSidebar';

const DesignerSidebar = () => {
  return (
    <aside className='w-[400px] max-w-[400px] flex flex-col flex-grow
      gap-2 border-r p-4 bg-white overflow-y-auto h-full'>
        <FormElementsSidebar/>
        {/* <PropertiesSidebar/> */}
    </aside>
  )
}

export default DesignerSidebar;