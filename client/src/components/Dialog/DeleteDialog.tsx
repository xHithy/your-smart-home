import React from 'react';
import FormButton from '../FormButton';
import { TbX } from 'react-icons/tb';

interface Props {
   title: string;
   text: string;
   onDelete: (e: any) => void;
   onCancel: (e: any) => void;
}

const DeleteDialog = ({ title, text, onDelete, onCancel }: Props) => {
   return (
      <div className='flex flex-col space-y-4 rounded-md bg-gray-100 px-5 py-3 shadow-md sm:h-auto sm:max-w-md'>
         <div className='flex flex-col'>
            <div className='relative flex items-center justify-between'>
               <h2 className='text-2xl font-bold text-gray-900'>{title}</h2>
               <div
                  className='flex h-10 w-10 cursor-pointer items-center justify-center rounded-md text-gray-900 transition-colors duration-200 hover:bg-blue-600 hover:text-gray-200'
                  onClick={onCancel}
               >
                  <TbX className='cursor-pointer text-2xl' />
               </div>
            </div>
            <p className='text-gray-600'>{text}</p>
         </div>
         <div className='flex w-full justify-end space-x-2'>
            <FormButton
               title='Delete'
               onSubmit={onDelete}
               warning={true}
            />
         </div>
      </div>
   );
};

export default DeleteDialog;
