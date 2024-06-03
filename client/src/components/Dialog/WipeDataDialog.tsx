import React, { useState } from 'react';
import { TbX } from 'react-icons/tb';
import FormButton from '../FormButton';
import InputField from '../InputField';
import { postWipeData } from '../../queries/postWipeData';
import { API_RESPONSE } from '../../queries/responses';
import { useMessages } from '../../providers/MessageContext';
import { MESSAGE_TYPES } from '../../models/messageContextModel';

interface Props {
   onCancel: () => void;
}

const WipeDataDialog = ({ onCancel }: Props) => {
   const { addMessage } = useMessages();
   const [password, setPassword] = useState('');
   const [errors, setErrors] = useState({ password: [] });

   const queryPostWipeData = async () => {
      const response = await postWipeData(password);

      if (response.type === API_RESPONSE.SUCCESS) {
         addMessage(MESSAGE_TYPES.SUCCESS, 'Data successfully wiped');
         setErrors({ password: [] });
         onCancel();
      }

      if (response.type === API_RESPONSE.API_ERROR) {
         setErrors(response.data);
      }
   };

   return (
      <div className='flex flex-col space-y-4 rounded-md bg-gray-100 px-5 py-3 shadow-md sm:h-auto sm:max-w-md'>
         <div className='flex flex-col'>
            <div className='relative flex items-center justify-between'>
               <h2 className='text-2xl font-bold text-gray-900'>Wipe data</h2>
               <div
                  className='flex h-10 w-10 cursor-pointer items-center justify-center rounded-md text-gray-900 transition-colors duration-200 hover:bg-blue-600 hover:text-gray-200'
                  onClick={onCancel}
               >
                  <TbX className='cursor-pointer text-2xl' />
               </div>
            </div>
            <div className='flex flex-col space-y-2'>
               <p className='text-gray-600'>
                  Are you sure you want to wipe all temperature and humidity
                  data? This action can not be undone!
               </p>
               <InputField
                  title='Password confirmation'
                  placeholder='Confirm your password to wipe data'
                  value={password}
                  error={errors.password}
                  onValueChange={(value) => setPassword(value)}
                  isPassword
               />
            </div>
         </div>
         <div className='flex w-full justify-end space-x-2'>
            <FormButton
               isDisabled={password.length === 0}
               title='Wipe data'
               onSubmit={() => queryPostWipeData()}
               warning={true}
            />
         </div>
      </div>
   );
};

export default WipeDataDialog;
