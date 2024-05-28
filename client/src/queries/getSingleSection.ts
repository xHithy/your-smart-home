import axios, { AxiosError } from 'axios';
import React from 'react';
import { API_RESPONSE } from './responses';

const API_URL = process.env.REACT_APP_API_URL;

export const getSingleSection = async (
   setData: React.Dispatch<any>,
   id: number
) => {
   try {
      const query = await axios.get(`${API_URL}/section/${id}`, {
         headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('auth_token')}`,
         },
      });

      if (query.data.status === 200 || query.data.status === 201) {
         setData(query.data.section);
         return {
            type: API_RESPONSE.SUCCESS,
            data: query.data.section,
         };
      } else {
         return {
            type: API_RESPONSE.API_ERROR,
            data: query.data.message,
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
