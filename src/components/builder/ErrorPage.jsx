import React from 'react'
import { useRouteError } from 'react-router-dom';


const ErrorPage = () => {
  const error = useRouteError();   
  console.error(error);
  return (
    <div className='flex flex-col items-center justify-center gap-5  w-full h-screen'>
      <h1 className='font-bold text-5xl text-red-600'>OOps!</h1>
      <p className='font-bold'>404<i> Page {error.statusText || error.message}</i></p>
    </div>
  )
}

export default ErrorPage;