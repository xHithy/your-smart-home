import axios, { AxiosError } from 'axios';
import { API_RESPONSE } from './responses';

const API_URL = process.env.REACT_APP_API_URL;

export const postLogin = async (username: string, password: string) => {
   const payload = {
      username: username,
      password: password,
   };

   try {
      const query = await axios.post(
         `${API_URL}/auth/login`,
         JSON.stringify(payload),
         {
            headers: {
               'Content-Type': 'application/json',
            },
         }
      );

      if (query.data.status === 200 || query.data.status === 201) {
         return {
            type: API_RESPONSE.SUCCESS,
            data: query.data,
         };
      } else {
         return {
            type: API_RESPONSE.API_ERROR,
            data: query.data.errors,
         };
      }
   } catch (e) {
      const error = e as AxiosError;
      return {
         type: API_RESPONSE.GENERIC_ERROR,
         data: error.message,
      };
   }
};
