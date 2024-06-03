import axios, { AxiosError } from 'axios';
import { API_RESPONSE } from './responses';

const API_URL = process.env.REACT_APP_API_URL;

export const postLogout = async () => {
   try {
      const query = await axios.post(
         `${API_URL}/auth/logout`,
         {},
         {
            headers: {
               'Content-Type': 'application/json',
               Authorization: `Bearer ${localStorage.getItem('auth_token')}`,
            },
         }
      );

      console.log(query);

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
