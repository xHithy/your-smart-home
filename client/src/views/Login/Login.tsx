import React, { useEffect, useState } from 'react';
import Container from '../../components/Container';
import InputField from '../../components/InputField';
import FormButton from '../../components/FormButton';
import { postLogin } from '../../queries/postLogin';
import { API_RESPONSE } from '../../queries/responses';
import { useMessages } from '../../providers/MessageContext';
import { MESSAGE_TYPES } from '../../models/messageContextModel';
import { postPingToken } from '../../queries/postPingToken';

const Login = () => {
   const { addMessage } = useMessages();
   const [username, setUsername] = useState('');
   const [password, setPassword] = useState('');
   const [errors, setErrors] = useState({
      username: [],
      password: [],
   });

   const queryLogin = async () => {
      const response = await postLogin(username, password);

      if (response.type === API_RESPONSE.SUCCESS) {
         addMessage(MESSAGE_TYPES.SUCCESS, response.data.message);
         setErrors({
            username: [],
            password: [],
         });
         localStorage.setItem('auth_token', response.data.token.token);
         window.location.href = '/dashboard';
      }
      if (response.type === API_RESPONSE.API_ERROR) {
         setErrors(response.data);
      }
      if (response.type === API_RESPONSE.GENERIC_ERROR) {
         addMessage(MESSAGE_TYPES.ERROR, response.data);
      }
   };

   const queryPingToken = async (token: string) => {
      const response = await postPingToken(token);

      if (response.type === API_RESPONSE.SUCCESS) {
         window.location.href = '/dashboard';
      }
   };

   useEffect(() => {
      const token = localStorage.getItem('auth_token');
      if (token) {
         queryPingToken(token);
      }
   }, []);

   return (
      <Container>
         <div className='relative flex min-h-[90vh] w-full items-center justify-center'>
            <h1 className='absolute top-2 w-full max-w-lg px-4 text-center text-sm uppercase text-gray-400'>
               Your Smart Home | 2024
            </h1>
            <div className='flex w-full max-w-sm flex-col space-y-2 p-4 text-gray-800'>
               <div className='flex flex-col'>
                  <h1 className='text-2xl font-semibold text-gray-800'>
                     Login
                  </h1>
                  <p className='mt-[-4px] text-gray-600'>
                     Enter the credentials to Your Smart Home.
                  </p>
               </div>
               <div className='flex flex-col'>
                  <InputField
                     title='Username'
                     value={username}
                     error={errors.username}
                     onValueChange={(value) => setUsername(value)}
                  />
                  <InputField
                     isPassword
                     title='Password'
                     value={password}
                     error={errors.password}
                     onValueChange={(value) => setPassword(value)}
                  />
               </div>
               <div className='flex w-full justify-end pt-2'>
                  <FormButton
                     paddingHorizontal={30}
                     paddingVertical={10}
                     title='Authorize'
                     onSubmit={() => queryLogin()}
                  />
               </div>
            </div>
         </div>
      </Container>
   );
};

export default Login;
