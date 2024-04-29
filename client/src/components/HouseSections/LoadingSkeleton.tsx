import React from 'react';
const SKELETON_AMOUNT = 6;

const LoadingSkeleton = () => {
   const Skeleton = () => {
      return (
         <div className='flex w-full animate-pulse flex-col space-y-1 rounded-md border-gray-300 bg-gray-200 p-3 pb-5'>
            <div className='h-6 w-[80%] animate-pulse rounded-md bg-gray-300 md:w-[55%]'></div>
            <div className='h-3 w-[50%] animate-pulse rounded-md bg-gray-300 md:w-[25%]'></div>
         </div>
      );
   };

   return (
      <div className='flex h-screen flex-col space-y-2'>
         {[...Array(SKELETON_AMOUNT)].map((_, index) => (
            <Skeleton key={index} />
         ))}
      </div>
   );
};

export default LoadingSkeleton;
