import React from 'react';
import { TbEdit, TbTrashX, TbX } from 'react-icons/tb';

interface Props {
   onDelete?: () => void;
   onEdit?: () => void;
   onClose: () => void;
}

const OptionDialog = ({ onDelete, onEdit, onClose }: Props) => {
   return (
      <div className='absolute right-0 top-0 z-20 flex flex-col space-y-0.5 rounded-md bg-gray-100 p-2 pt-7 text-gray-700 shadow-md'>
         <TbX
            className='absolute right-1.5 top-1.5 h-5 w-5 cursor-pointer rounded-md text-xl hover:bg-blue-600 hover:text-gray-200'
            onClick={onClose}
         />
         {onDelete && (
            <div
               onClick={onDelete}
               className='flex cursor-pointer items-center space-x-1 rounded-md px-3 py-1 hover:bg-gray-300'
            >
               <TbTrashX /> <span>Delete</span>
            </div>
         )}
         {onEdit && (
            <div
               onClick={onEdit}
               className='flex cursor-pointer items-center space-x-1 rounded-md px-3 py-1 hover:bg-gray-300'
            >
               <TbEdit /> <span>Edit</span>
            </div>
         )}
      </div>
   );
};

export default OptionDialog;
