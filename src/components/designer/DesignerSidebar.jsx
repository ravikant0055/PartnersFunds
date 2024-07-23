import React from 'react'
import FormElementsSidebar from './FormElementsSidebar';
import { useSelector } from 'react-redux';
import PropertiesSidebar from './PropertiesSidebar';

const DesignerSidebar = () => {
  const {isOpen , selectedElement} = useSelector(state=> state.properties);
  console.log("propdata",selectedElement);
  console.log("isopen",isOpen);
  return (
    <aside className='w-[400px] max-w-[400px] flex flex-col flex-grow
      gap-2 border-r p-4 bg-white overflow-y-auto h-full'>
        {!isOpen ? <FormElementsSidebar/> : <PropertiesSidebar selectedElement={selectedElement}/> }
    </aside>
  )
}

export default DesignerSidebar;