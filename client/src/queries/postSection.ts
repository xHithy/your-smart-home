import axios, { AxiosError } from 'axios';
import { Section } from '../models/sectionModel';
import React from 'react';
import { API_RESPONSE } from './responses';

const API_URL = process.env.REACT_APP_API_URL;

export interface PostSectionError {
   name: string[];
   color: string[];
}

export const postSection = async (
   sectionName: string,
   sectionColor: string,
   setData: React.Dispatch<any>
) => {
   const payload = {
      name: sectionName,
      color: sectionColor,
   };

   try {
      const query = await axios.post(
         `${API_URL}/section/create`,
         JSON.stringify(payload),
         {
            headers: {
               'Content-Type': 'application/json',
               Authorization: `Bearer ${localStorage.getItem('auth_token')}`,
            },
         }
      );

      if (query.data.status === 200 || query.data.status === 201) {
         const data = query.data.section;

         setData((prevData: Section[]) => [data, ...prevData]);
         return {
            type: API_RESPONSE.SUCCESS,
            data: query.data.message,
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
