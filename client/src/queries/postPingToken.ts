import axios, { AxiosError } from 'axios';
import { API_RESPONSE } from './responses';

const API_URL = process.env.REACT_APP_API_URL;

export const postPingToken = async (token: string) => {
   try {
      await axios.post(
         `${API_URL}/auth/ping-token`,
         {},
         {
            headers: {
               'Content-Type': 'application/json',
               Authorization: `Bearer ${token}`,
            },
         }
      );

      return {
         type: API_RESPONSE.SUCCESS,
         data: 'Authorized',
      };
   } catch (e) {
      const error = e as AxiosError;
      console.log(error);
      return {
         type: API_RESPONSE.GENERIC_ERROR,
         data: error.message,
      };
   }
};
