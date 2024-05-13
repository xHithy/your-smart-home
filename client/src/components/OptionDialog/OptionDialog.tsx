import React, { useState } from 'react';
import { TbEdit, TbTrashX, TbX } from 'react-icons/tb';
import DialogContainer from '../Dialog/DialogContainer';
import DeleteDialog from '../Dialog/DeleteDialog';

interface Props {
   onDelete?: () => void;
   onEdit?: () => void;
   onClose: () => void;
}

const OptionDialog = ({ onDelete, onEdit, onClose }: Props) => {
   const [deleteDialog, setDeleteDialog] = useState(false);
   return (
      <div className='absolute right-0 top-0 z-20 flex flex-col rounded-md bg-gray-100 p-2 pt-7 text-gray-700 shadow-md'>
         <TbX
            className='absolute right-1.5 top-1.5 h-5 w-5 cursor-pointer rounded-md text-xl hover:bg-blue-600 hover:text-gray-200'
            onClick={onClose}
         />
         {onDelete && (
            <div
               onClick={() => setDeleteDialog(true)}
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
         {deleteDialog && onDelete && (
            <DialogContainer>
               <DeleteDialog
                  title='Confirm deletion'
                  text='Are you sure you want to delete this section? By deleting this section you will delete all rooms under this section.'
                  onDelete={onDelete}
                  onCancel={() => setDeleteDialog(false)}
               />
            </DialogContainer>
         )}
      </div>
   );
};

export default OptionDialog;
