import React from 'react';
import { AuthorizedSensor, UnauthorizedSensor } from './sensorModel';

export interface ConnectionContextModel {
   authorized: AuthorizedSensor[] | [];
   unauthorized: UnauthorizedSensor[] | [];
   setAuthorized: React.Dispatch<React.SetStateAction<AuthorizedSensor[]>>;
   setUnauthorized: React.Dispatch<React.SetStateAction<UnauthorizedSensor[]>>;
}
