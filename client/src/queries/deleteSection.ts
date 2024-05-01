import React from 'react';
import axios, { AxiosError } from 'axios';
import { API_RESPONSE } from './responses';
import { Section } from '../models/sectionModel';

const API_URL = process.env.REACT_APP_API_URL;

export const deleteSection = async (
   setData: React.Dispatch<any>,
   id: number
) => {
   try {
      const query = await axios.delete(`${API_URL}/section/delete/${id}`);

      if (query.data.status === 200 || query.data.status === 201) {
         setData((data: Section[]) => data.filter((item) => item.id !== id));
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
         data: error,
      };
   }
};
