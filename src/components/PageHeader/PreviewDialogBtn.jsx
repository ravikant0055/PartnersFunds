import React from 'react'
import { MdPreview } from "react-icons/md";
import { Button } from '../ui/button';
import { Dialog, DialogContent, DialogTrigger } from '../ui/dialog';
import paperSvg from '../../assests/paper.svg'
import { useSelector } from 'react-redux';
import PageElements from '../designer/PageElements';
import { v4 as uuidv4 } from 'uuid';


const PreviewDialogBtn = () => {
      const uniqueId = uuidv4();
      const shareUrl = `${window.location.origin}/submit/${uniqueId}`;
      console.log("shareUrl", shareUrl);
  const myData = useSelector((state) => state.attribute);

  console.log("data ji",myData);

  return (
    <Dialog>

      {/* dialog controller */}
      <DialogTrigger asChild>
        <Button variant={"outline"} className="gap-2">
          <MdPreview className="h-4 w-4" />
          Preview
        </Button>
      </DialogTrigger>


      {/* dialog popup response */}
      <DialogContent className="w-screen h-screen max-h-screen max-w-full flex flex-col flex-grow p-0 gap-0">
        <div className='px-4 py-3 border-b'>
          <p className='text-lg font-bold text-muted-foreground'>
            Page Preview
          </p>
        </div>

        <div className='bg-accent flex flex-col flex-grow items-center justify-center p-4 overflow-y-auto' style={{ backgroundImage: `url(${paperSvg})` }}>
          <div className='max-w-[620px] flex flex-col flex-grow  gap-4  bg-background h-full w-full rounded-2xl p-8 overflow-y-auto'>
                {myData.map((item)=>{
                  return <PageElements key={item.id} element={item}/>
                })}
          </div>
        </div>
      </DialogContent>

    </Dialog>


  )
}


export default PreviewDialogBtn;