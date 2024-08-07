import React from 'react'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog'
import { Button } from '../ui/button'
import { AiOutlinePlus } from 'react-icons/ai'

const EntityobjectBtn = () => {
  return (
    <Dialog>
      <DialogTrigger>
        <div className='flex gap-10 justify-between items-center'>
          <Button  className="gap-2">
            <h1>Entity Object</h1>
            <AiOutlinePlus className="h-4 w-4" />
          </Button>
        </div>
      </DialogTrigger>

      <DialogContent>

            <DialogHeader>
                <DialogTitle>Entity Object</DialogTitle>
                <DialogDescription>entity object data</DialogDescription>
            </DialogHeader>
   
            <DialogFooter>
              <DialogTrigger asChild>
                <Button type="submit">
                    <span>Save</span>
                </Button>
              </DialogTrigger>
            </DialogFooter>

      </DialogContent>
      
    </Dialog>
  )
}

export default EntityobjectBtn