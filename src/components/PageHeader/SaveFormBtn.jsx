import React from 'react'
import { HiSaveAs } from "react-icons/hi";
import { Button } from '../ui/button';

const SaveFormBtn = () => {
  return (
    <Button >
      <HiSaveAs className="h-4 w-4 mr-1" />
       Save
    </Button>
  )
}

export default SaveFormBtn