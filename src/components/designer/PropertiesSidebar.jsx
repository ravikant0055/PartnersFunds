import React from 'react'
import { Button } from '../ui/button';
import {AiOutlineClose} from 'react-icons/ai';
import { PropertiesComponent } from '../fields/TextFields';

const PropertiesSidebar = () => {
  return (
    <div className='flex flex-col p-2'>
        <div className='flex justify-between items-center mb-5'>
            <p className='text-l text-foreground/70'>Element Properties</p>
            <Button 
            size={"icon"}
            variant={"ghost"}>
                <AiOutlineClose />
            </Button>
        </div>
         <PropertiesComponent/>
    </div>
  )
}

export default PropertiesSidebar;