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

export const getSensors = async () => {
   try {
      const query = await axios.get(`${API_URL}/sensor`, {
         headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('auth_token')}`,
         },
      });

      if (query.data.status === 200 || query.data.status === 201) {
         return {
            type: API_RESPONSE.SUCCESS,
            data: query.data.sensors,
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
