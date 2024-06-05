import React from 'react';
import { TbX } from 'react-icons/tb';
import LogWindow from './LogWindow';

interface Props {
   onClose: () => void;
}

const LogsDialog = ({ onClose }: Props) => {
   return (
      <div className='relative flex h-screen max-h-screen w-full flex-col justify-between overflow-y-auto bg-gray-100 px-5 pb-5 shadow-md sm:h-auto sm:rounded-md md:max-w-screen-lg md:pb-3'>
         <div className='sticky top-0 z-20 flex w-full items-center justify-between bg-gray-100 pb-2 pt-3'>
            <h2 className='text-2xl font-bold text-gray-900'>
               Your House's Logs
            </h2>
            <div
               className='flex h-10 w-10 cursor-pointer items-center justify-center rounded-md text-gray-900 transition-colors duration-200 hover:bg-blue-600 hover:text-gray-200'
               onClick={() => {
                  onClose();
               }}
            >
               <TbX className='cursor-pointer text-2xl' />
            </div>
         </div>
         <p className='pb-1 text-gray-500'>
            The logs within the last 24 hours will be displayed here.
         </p>
         <LogWindow />
      </div>
   );
};

export default LogsDialog;
