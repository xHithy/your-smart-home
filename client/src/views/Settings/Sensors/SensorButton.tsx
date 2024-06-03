import React from 'react';

interface Props {
   name: string;
   onClick: () => void;
   notificationCount?: number;
}

const SensorButton = ({ name, onClick, notificationCount }: Props) => {
   return (
      <div
         onClick={onClick}
         className='relative flex cursor-pointer rounded-md bg-gray-200 p-2 transition-colors duration-200 hover:bg-gray-300'
      >
         {notificationCount !== undefined && notificationCount > 0 && (
            <span className='absolute right-[-0.5rem] top-[-0.5rem] flex h-5 w-5 items-center justify-center rounded-full bg-red-600 p-0.5 text-xs font-semibold text-gray-200 shadow-md'>
               {notificationCount}
            </span>
         )}
         <span className='text-gray-500'>{name}</span>
      </div>
   );
};

export default SensorButton;
