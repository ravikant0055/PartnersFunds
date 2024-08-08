import React from 'react'
import { useNavigate } from 'react-router-dom';
import { Button } from '../ui/button';

const Nodatapage = () => {
  const navigate = useNavigate();  
  return (
    <div className='flex flex-col items-center justify-center gap-5  w-full h-screen'>
        <h1 className='text-xl'>No page Available</h1>
        <Button onClick={()=>navigate('/')}>Back to home</Button>
    </div>
  )
}

export default Nodatapage;