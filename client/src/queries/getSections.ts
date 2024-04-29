import axios, { AxiosError } from 'axios';
import React from 'react';
import { API_RESPONSE } from './responses';

const API_URL = process.env.REACT_APP_API_URL;

export const getSections = async (setData: React.Dispatch<any>) => {
   try {
      const query = await axios.get(`${API_URL}/section`);

      if (query.data.status === 200 || query.data.status === 201) {
         setData(query.data.sections);
         return {
            type: API_RESPONSE.SUCCESS,
            data: query.data.sections,
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