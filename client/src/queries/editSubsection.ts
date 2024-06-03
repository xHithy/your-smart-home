import axios, { AxiosError } from 'axios';
import { API_RESPONSE } from './responses';

const API_URL = process.env.REACT_APP_API_URL;

export const editSubsection = async (
   id: number,
   sectionName: string,
   categoryId: number | undefined
) => {
   const payload = {
      id: id,
      name: sectionName,
      category_id: categoryId,
   };

   try {
      const query = await axios.put(
         `${API_URL}/subsection/edit`,
         JSON.stringify(payload),
         {
            method: 'PUT',
            headers: {
               'Content-Type': 'application/json',
               Authorization: `Bearer ${localStorage.getItem('auth_token')}`,
            },
         }
      );

      if (query.data.status === 200 || query.data.status === 201) {
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
      console.log(e);
      return {
         type: API_RESPONSE.GENERIC_ERROR,
         data: error.message,
      };
   }
};
