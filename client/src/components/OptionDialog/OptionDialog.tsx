import React, { useState } from 'react';
import { TbEdit, TbTrashX, TbX } from 'react-icons/tb';
import DialogContainer from '../Dialog/DialogContainer';
import DeleteDialog from '../Dialog/DeleteDialog';

interface Props {
   onDelete?: (e: any) => void;
   onEdit?: (e: any) => void;
   onClose: (e: any) => void;
   top?: number;
   right?: number;
}

const OptionDialog = ({ onDelete, onEdit, onClose, top, right }: Props) => {
   const [deleteDialog, setDeleteDialog] = useState(false);

   return (
      <div
         style={{ top: top ? top : 0, right: right ? right : 0 }}
         className={`absolute right-0 top-0 z-20 flex flex-col rounded-md bg-gray-100 p-2 pt-7 text-gray-700 shadow-md`}
      >
         <TbX
            className='absolute right-1.5 top-1.5 h-5 w-5 cursor-pointer rounded-md text-xl transition-colors duration-200 hover:bg-blue-600 hover:text-gray-200'
            onClick={onClose}
         />
         {onDelete && (
            <div
               onClick={(e) => {
                  e.stopPropagation();
                  setDeleteDialog(true);
               }}
               className='flex cursor-pointer items-center space-x-1 rounded-md px-3 py-1 transition-colors duration-200 hover:bg-gray-300'
            >
               <TbTrashX /> <span>Delete</span>
            </div>
         )}
         {onEdit && (
            <div
               onClick={onEdit}
               className='flex cursor-pointer items-center space-x-1 rounded-md px-3 py-1 transition-colors duration-200 hover:bg-gray-300'
            >
               <TbEdit /> <span>Edit</span>
            </div>
         )}
         {deleteDialog && onDelete && (
            <DialogContainer>
               <DeleteDialog
                  title='Confirm deletion'
                  text='Are you sure you want to delete this section? By deleting this section you will delete all rooms under this section.'
                  onDelete={onDelete}
                  onCancel={(e) => {
                     e.stopPropagation();
                     setDeleteDialog(false);
                  }}
               />
            </DialogContainer>
         )}
      </div>
   );
};

export default OptionDialog;
