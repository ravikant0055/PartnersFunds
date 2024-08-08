import React from 'react';
import { ImSpinner2 } from 'react-icons/im';

const Loading = () => {
  return (
    <div className='fixed inset-0 flex items-center justify-center'>
      <ImSpinner2 className='animate-spin h-12 w-12 text-[#003d59]'/>
    </div>
  );
}

export default Loading;
