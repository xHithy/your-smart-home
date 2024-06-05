import React from 'react';

const LoadingItem = () => {
   return <div className='h-[92px] animate-pulse rounded-md bg-gray-200'></div>;
};

interface Props {
   title: string;
}

const LoadingSkeleton = ({ title }: Props) => {
   return (
      <div className='flex flex-col text-gray-800'>
         <span className='pb-1 text-lg font-semibold'>{title}</span>
         <div className='grid grid-cols-2 gap-2 md:grid-cols-4'>
            <LoadingItem />
            <LoadingItem />
            <LoadingItem />
            <LoadingItem />
         </div>
      </div>
   );
};

export default LoadingSkeleton;
