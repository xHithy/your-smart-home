import React from 'react';
import { TbX } from 'react-icons/tb';
import InputField from '../InputField';
import ColorInput from '../ColorInput';
import FormButton from '../FormButton';
import { PostSectionError } from '../../queries/postSection';

interface Props {
   sectionName: string;
   sectionColor: string;
   onClose: () => void;
   onSubmit: () => void;
   setSectionName: (args0: string) => void;
   setSectionColor: (args0: string) => void;
   errors: PostSectionError;
}

const CreateSectionDialog = ({
   onClose,
   onSubmit,
   sectionColor,
   setSectionColor,
   sectionName,
   setSectionName,
   errors,
}: Props) => {
   return (
      <div className='relative h-screen max-h-screen w-full justify-between bg-gray-100 px-5 py-3 pb-14 shadow-md sm:h-auto sm:max-w-md sm:rounded-md md:pb-3'>
         <div className='flex w-full items-center justify-between pb-2'>
            <h2 className='text-2xl font-bold text-gray-900'>
               Create a section
            </h2>
            <div
               className='flex h-10 w-10 cursor-pointer items-center justify-center rounded-md text-gray-900 transition-colors duration-200 hover:bg-blue-600 hover:text-gray-200'
               onClick={onClose}
            >
               <TbX className='cursor-pointer text-2xl' />
            </div>
         </div>
         <div className='flex flex-col justify-between space-y-2'>
            <InputField
               title='Section name'
               placeholder='Ex. First Floor'
               value={sectionName}
               onValueChange={(value) => setSectionName(value)}
               error={errors.name}
            />
            <ColorInput
               title='Pick a color'
               value={sectionColor}
               onValueChange={(value) => setSectionColor(value)}
               error={errors.color}
            />
            <div className='absolute bottom-0 left-0 flex h-auto w-full flex-row-reverse items-center self-end px-5 py-3 pt-5 md:static md:p-0'>
               <FormButton
                  title='Finish'
                  onSubmit={onSubmit}
               />
            </div>
         </div>
      </div>
   );
};

export default CreateSectionDialog;
