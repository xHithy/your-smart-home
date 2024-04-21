import React from 'react';

const LoadingSkeleton = () => {
   return (
      <div className='flex flex-col space-y-2'>
         <div className='flex w-full flex-col space-y-1 rounded-md bg-gray-200 p-2 pb-5'>
            <div className='h-6 w-[55%] animate-pulse rounded-md bg-gray-300'></div>
            <div className='h-3 w-[25%] animate-pulse rounded-md bg-gray-300'></div>
         </div>
         <div className='flex w-full flex-col space-y-1 rounded-md bg-gray-200 p-2 pb-5'>
            <div className='h-6 w-[55%] animate-pulse rounded-md bg-gray-300'></div>
            <div className='h-3 w-[25%] animate-pulse rounded-md bg-gray-300'></div>
         </div>
         <div className='flex w-full flex-col space-y-1 rounded-md bg-gray-200 p-2 pb-5'>
            <div className='h-6 w-[55%] animate-pulse rounded-md bg-gray-300'></div>
            <div className='h-3 w-[25%] animate-pulse rounded-md bg-gray-300'></div>
         </div>
      </div>
   );
};

export default LoadingSkeleton;
