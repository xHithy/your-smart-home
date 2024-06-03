import axios, { AxiosError } from 'axios';
import { API_RESPONSE } from './responses';
import { Sensor } from '../models/sensorModel';

const API_URL = process.env.REACT_APP_API_URL;

export interface GET_SENSORS_RESPONSE {
   type:
      | API_RESPONSE.SUCCESS
      | API_RESPONSE.API_ERROR
      | API_RESPONSE.GENERIC_ERROR;
   data: Sensor[];
}

export const getSensorBySubsection = async (room_id: number) => {
   try {
      const query = await axios.get(`${API_URL}/sensor/${room_id}`, {
         headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('auth_token')}`,
         },
      });

      if (
         query.data.status === 200 ||
         query.data.status === 201 ||
         query.data.status === 404
      ) {
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
