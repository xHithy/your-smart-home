import React from 'react';
import { TbDots } from 'react-icons/tb';

interface Props {
   name: string;
   color: string;
}

const SingleSection = ({ name, color }: Props) => {
   return (
      <div
         style={{ borderLeftColor: color }}
         className='flex w-full flex-col space-y-1 rounded-r-md border-l-4 bg-gray-200 p-3 pb-5'
      >
         <div className='flex w-full items-center justify-between space-x-1'>
            <span className='text-lg font-bold text-gray-800'>{name}</span>
            <TbDots className='cursor-pointer text-2xl text-gray-800' />
         </div>
      </div>
   );
};

export default SingleSection;
