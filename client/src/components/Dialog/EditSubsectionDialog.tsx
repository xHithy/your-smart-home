import React, { useContext, useState } from 'react';
import { DataContext } from '../../providers/DataProvider';
import { TbX } from 'react-icons/tb';
import InputField from '../InputField';
import Select from '../Select';
import FormButton from '../FormButton';
import { editSubsection } from '../../queries/editSubsection';
import { API_RESPONSE } from '../../queries/responses';
import { MESSAGE_TYPES } from '../../models/messageContextModel';
import { useMessages } from '../../providers/MessageContext';

interface Props {
   id: number;
   room: string;
   categoryId: number;
   onClose: () => void;
   onSuccess: () => void;
}

const EditSubsectionDialog = ({
   id,
   room,
   categoryId,
   onClose,
   onSuccess,
}: Props) => {
   const { categories } = useContext(DataContext);
   const { addMessage } = useMessages();
   const [roomName, setRoomName] = useState(room);
   const [category, setCategory] = useState(categoryId);
   const [errors, setErrors] = useState({
      name: [],
      category_id: [],
   });

   const queryEditSubSection = async () => {
      const response = await editSubsection(id, roomName, category);

      if (response.type === API_RESPONSE.SUCCESS) {
         addMessage(MESSAGE_TYPES.SUCCESS, 'Room successfully edited!');
         onSuccess();

         setErrors({
            name: [],
            category_id: [],
         });
         onClose();
      } else if (response.type === API_RESPONSE.API_ERROR) {
         setErrors(response.data);
      } else if (response.type === API_RESPONSE.GENERIC_ERROR) {
         addMessage(MESSAGE_TYPES.ERROR, response.data);
      }
   };

   const clearForm = () => {
      setRoomName('');
      setCategory(0);
   };

   return (
      <div className='relative h-screen max-h-screen w-full justify-between bg-gray-100 px-5 py-3 pb-14 shadow-md sm:h-auto sm:max-w-md sm:rounded-md md:pb-3'>
         <div className='flex w-full items-center justify-between pb-2'>
            <h2 className='text-2xl font-bold text-gray-900'>Edit room</h2>
            <div
               className='flex h-10 w-10 cursor-pointer items-center justify-center rounded-md text-gray-900 transition-colors duration-200 hover:bg-blue-600 hover:text-gray-200'
               onClick={() => {
                  onClose();
                  clearForm();
               }}
            >
               <TbX className='cursor-pointer text-2xl' />
            </div>
         </div>
         <div className='flex flex-col justify-between space-y-2'>
            <InputField
               title='Room name'
               placeholder='Ex. Kitchen'
               value={roomName}
               onValueChange={(value) => setRoomName(value)}
               error={errors.name}
            />
            <Select
               values={categories}
               value={category}
               onValueChange={(value) => setCategory(value)}
               text='Select a category'
               title='Category'
               error={errors.category_id}
            />
            <div className='absolute bottom-0 left-0 flex h-auto w-full flex-row-reverse items-center self-end px-5 py-3 pt-5 md:static md:p-0 md:pt-3'>
               <FormButton
                  title='Finish'
                  onSubmit={() => {
                     queryEditSubSection();
                     clearForm();
                  }}
               />
            </div>
         </div>
      </div>
   );
};

export default EditSubsectionDialog;
