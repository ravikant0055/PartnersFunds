import React from 'react'
import PreviewDialogBtn from '../PageHeader/PreviewDialogBtn';
import SaveFormBtn from '../PageHeader/SaveFormBtn';
import PublishFormBtn from '../PageHeader/PublishFormBtn';
import paperSvg from '../../assests/paper.svg'
import Designer from '../designer/Designer';

const FormBuilder = () => {
  return (
    <main className='flex flex-col w-full'>
      <nav className='flex justify-between border-b p-4 gap-3 items-center'>
         <h2 className='truncate font-medium'>
             <span className='text-muted-foreground mr-2'>Form: FY-25 Cisco Sales data</span>
         </h2>
          <div className='flex items-center gap-3'>
            <PreviewDialogBtn/>
            <SaveFormBtn/>
            <PublishFormBtn/>
          </div>
      </nav>

      <div className='flex w-full flex-grow items-center justify-center
         relative overflow-y-auto h-[700px] bg-accent'
         style={{ backgroundImage: `url(${paperSvg})` }}>
         <Designer/>
      </div>
      
    </main>
  )
}

export default FormBuilder;