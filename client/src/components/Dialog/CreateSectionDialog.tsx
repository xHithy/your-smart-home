import React, { useState } from 'react';
import { TbX } from 'react-icons/tb';
import InputField from '../InputField';
import ColorInput from '../ColorInput';
import FormButton from '../FormButton';

interface Props {
   onClose: () => void;
   onSubmit: () => void;
}

const CreateSectionDialog = ({ onClose, onSubmit }: Props) => {
   const [sectionName, setSectionName] = useState<string>('');
   const [sectionColor, setSectionColor] = useState<string>('#000000');

   return (
      <div className='relative h-screen max-h-screen w-full justify-between bg-gray-100 px-5 py-3 pb-14 shadow-md sm:h-auto sm:max-w-md sm:rounded-md md:pb-3'>
         <div className='flex w-full items-center justify-between pb-2'>
            <h2 className='text-2xl font-bold'>Create a section</h2>
            <div
               className='flex h-10 w-10 cursor-pointer items-center justify-center rounded-md transition-colors duration-200 hover:bg-blue-600 hover:text-gray-200'
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
            />
            <ColorInput
               title='Pick a color'
               value={sectionColor}
               onValueChange={(value) => setSectionColor(value)}
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
