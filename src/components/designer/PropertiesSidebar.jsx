import React from 'react'
import { Button } from '../ui/button';
import {AiOutlineClose} from 'react-icons/ai';

const PropertiesSidebar = () => {
  return (
    <div className='flex flex-col p-2'>
        <div className='flex justify-between items-center'>
            <p className='text-sm text-foreground/70'>Element Properties</p>
            <Button 
            size={"icon"}
            variant={"ghost"}>
                <AiOutlineClose />
            </Button>
        </div>
         
    </div>
  )
}

export default PropertiesSidebar;