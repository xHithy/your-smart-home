import React, { useContext } from 'react';
import { TbX } from 'react-icons/tb';
import InputField from '../InputField';
import FormButton from '../FormButton';
import { PostSubSectionError } from '../../views/Room/Room';
import { DataContext } from '../../providers/DataProvider';
import Select from '../Select';

interface Props {
   categoryId: number | undefined;
   roomName: string;
   errors: PostSubSectionError;
   onClose: () => void;
   onSubmit: () => void;
   setRoomName: (args0: string) => void;
   setCategoryId: (args0: number) => void;
}

const CreateSubsectionDialog = ({
   categoryId,
   roomName,
   errors,
   onClose,
   onSubmit,
   setRoomName,
   setCategoryId,
}: Props) => {
   const { categories } = useContext(DataContext);

   const clearForm = () => {
      setRoomName('');
      setCategoryId(0);
   };

   return (
      <div className='relative h-screen max-h-screen w-full justify-between bg-gray-100 px-5 py-3 pb-14 shadow-md sm:h-auto sm:max-w-md sm:rounded-md md:pb-3'>
         <div className='flex w-full items-center justify-between pb-2'>
            <h2 className='text-2xl font-bold text-gray-900'>Create a room</h2>
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
               value={categoryId}
               onValueChange={(value) => setCategoryId(value)}
               text='Select a category'
               title='Category'
               error={errors.category_id}
            />
            <div className='absolute bottom-0 left-0 flex h-auto w-full flex-row-reverse items-center self-end px-5 py-3 pt-5 md:static md:p-0 md:pt-3'>
               <FormButton
                  title='Finish'
                  onSubmit={() => {
                     onSubmit();
                     clearForm();
                  }}
               />
            </div>
         </div>
      </div>
   );
};

export default CreateSubsectionDialog;
