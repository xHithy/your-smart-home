import React from 'react';
import { Sensor } from './sensorModel';

export interface ConnectionContextModel {
   authorized: Sensor[] | [];
   unauthorized: Sensor[] | [];
   sensors: Sensor[] | [];
   setAuthorized: React.Dispatch<React.SetStateAction<Sensor[]>>;
   setUnauthorized: React.Dispatch<React.SetStateAction<Sensor[]>>;
}
