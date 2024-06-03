import React from 'react';

const LoadingSkeleton = () => {
   return (
      <div className='flex flex-col space-y-2'>
         <div className='grid grid-cols-2 gap-2 lg:grid-cols-4'>
            <div className='h-[84px] w-full animate-pulse rounded-md bg-gray-200'></div>
            <div className='h-[84px] w-full animate-pulse rounded-md bg-gray-200'></div>
            <div className='h-[84px] w-full animate-pulse rounded-md bg-gray-200'></div>
            <div className='h-[84px] w-full animate-pulse rounded-md bg-gray-200'></div>
         </div>
         <div className='h-[200px] w-full animate-pulse rounded-md bg-gray-200 py-2'></div>
      </div>
   );
};

export default LoadingSkeleton;
