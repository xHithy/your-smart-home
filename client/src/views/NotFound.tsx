import React from 'react';
import FormButton from '../components/FormButton';

const NotFound = () => {
   return (
      <div className='flex h-screen w-screen flex-col items-center justify-center space-y-4'>
         <div className='flex flex-col items-center leading-tight'>
            <span className='text-md text-gray-500'>ERROR 404</span>
            <span className='text-3xl font-black'>Page not found</span>
         </div>
         <div className='flex w-full items-center justify-center'>
            <FormButton
               onSubmit={() => (window.location.href = '/dashboard')}
               title='Return to dashboard'
            />
         </div>
      </div>
   );
};

export default NotFound;
