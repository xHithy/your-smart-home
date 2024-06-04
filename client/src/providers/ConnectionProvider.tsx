import React, { createContext, ReactNode, useEffect, useState } from 'react';
import { ConnectionContextModel } from '../models/connectionContextModel';
import { GET_SENSORS_RESPONSE, getSensors } from '../queries/getSensors';
import { API_RESPONSE } from '../queries/responses';
import { Sensor } from '../models/sensorModel';
import { useMessages } from './MessageContext';
import { MESSAGE_TYPES } from '../models/messageContextModel';

export const ConnectionContext = createContext<ConnectionContextModel>({
   authorized: [],
   unauthorized: [],
   sensors: [],
   setAuthorized: () => {},
   setUnauthorized: () => {},
});

interface Props {
   children: ReactNode[] | ReactNode;
}

const ConnectionProvider = ({ children }: Props) => {
   const [sensors, setSensors] = useState<Sensor[]>([]);
   const [authorized, setAuthorized] = useState<Sensor[]>([]);
   const [unauthorized, setUnauthorized] = useState<Sensor[]>([]);

   const { addMessage } = useMessages();

   const queryGetSensors = async () => {
      const response: GET_SENSORS_RESPONSE = await getSensors();

      if (response.type === API_RESPONSE.SUCCESS) {
         setSensors(response.data);

         console.log(response.data);

         // Set unauthorized sensors
         const unauthorizedSensors = response.data.filter(
            (sensor) => !sensor.authorized
         );

         // Set authorized sensors
         const authorizedSensors = response.data.filter(
            (sensor) => sensor.authorized
         );

         console.log(authorizedSensors);

         // Sort the authorized sensors by id in descending order
         authorizedSensors.sort((a, b) => b.id - a.id);
         setAuthorized(authorizedSensors);

         // Check if the unauthorized sensors already exist in state
         setUnauthorized((prev) => {
            const existingSensorIds = new Set(prev.map((sensor) => sensor.id));
            const newUnauthorizedSensors = unauthorizedSensors.filter(
               (sensor) => !existingSensorIds.has(sensor.id)
            );
            return [...prev, ...newUnauthorizedSensors];
         });
      }
   };

   useEffect(() => {
      const handleSensorConnectionAttempt = (event: any) => {
         let newSensor;

         setUnauthorized((prev) => {
            const sensorIndex = prev.findIndex(
               (sensor) => sensor.sensor_token === event.data.sensor_token
            );

            if (sensorIndex !== -1) {
               const updatedSensors = [...prev];
               updatedSensors[sensorIndex] = {
                  ...updatedSensors[sensorIndex],
                  last_auth_attempt: event.data.last_auth_attempt,
               };
               return updatedSensors;
            } else {
               newSensor = event.data;
               return [...prev, event.data];
            }
         });

         if (newSensor) {
            addMessage(
               MESSAGE_TYPES.CONNECTION_ATTEMPT,
               `${event.data.sensor_name} is trying to connect...`,
               event.data.sensor_token
            );
         }
      };

      window.Echo.channel('connection-attempt-channel').listen(
         'SensorConnectionAttemptEvent',
         handleSensorConnectionAttempt
      );

      return () => {
         window.Echo.leaveChannel('connection-attempt-channel');
      };
   }, [addMessage]);

   useEffect(() => {
      const handleDataUpdate = (event: any) => {
         if (!event.data.temperature && !event.data.humidity) {
            const updatedAuthorized = [
               event.data.sensor,
               ...authorized.filter(
                  (sensor) =>
                     sensor.sensor_token !== event.data.sensor.sensor_token
               ),
            ];

            // Sort the array by id in descending order
            updatedAuthorized.sort((a, b) => b.id - a.id);

            setAuthorized(updatedAuthorized);
         } else {
            const updatedAuthorized = [
               event.data.sensor,
               ...authorized.filter(
                  (sensor) =>
                     sensor.sensor_token !== event.data.sensor.sensor_token
               ),
            ];

            // Sort the array by id in descending order
            updatedAuthorized.sort((a, b) => b.id - a.id);

            setAuthorized(updatedAuthorized);
         }
      };

      window.Echo.channel('main-data-channel').listen(
         'MainDataLogEvent',
         handleDataUpdate
      );

      return () => {
         window.Echo.leaveChannel('main-data-channel');
      };
   }, [authorized]);

   useEffect(() => {
      queryGetSensors();
   }, []);

   return (
      <ConnectionContext.Provider
         value={{
            authorized,
            unauthorized,
            sensors,
            setAuthorized,
            setUnauthorized,
         }}
      >
         {children}
      </ConnectionContext.Provider>
   );
};

export default ConnectionProvider;
