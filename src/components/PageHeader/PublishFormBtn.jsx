
import React from 'react'
import { MdOutlinePublish } from "react-icons/md";
import { Button } from '../ui/button';

const PublishFormBtn = () => {
  return (
    <Button className="gap-1 text-white bg-gradient-to-r from-blue-400 to-cyan-700">
       <MdOutlinePublish className="h-4 w-4" />
       Publish
    </Button>
  )
}

export default PublishFormBtn