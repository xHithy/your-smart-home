import React, { useContext } from 'react';
import { TbX } from 'react-icons/tb';
import { Sensor } from '../../../models/sensorModel';
import UnauthorizedSensorItem from './UnauthorizedSensorItem';
import { postAcceptSensor } from '../../../queries/postAcceptSensor';
import { API_RESPONSE } from '../../../queries/responses';
import { ConnectionContext } from '../../../providers/ConnectionProvider';
import { useMessages } from '../../../providers/MessageContext';
import { MESSAGE_TYPES } from '../../../models/messageContextModel';

interface Props {
   sensors: Sensor[];
   onClose: () => void;
}

const UnauthorizedSensorDialog = ({ onClose, sensors }: Props) => {
   const { addMessage } = useMessages();
   const { setAuthorized, setUnauthorized } = useContext(ConnectionContext);

   const queryAcceptSensor = async (name: string, token: string) => {
      const response = await postAcceptSensor(token);

      if (response.type === API_RESPONSE.SUCCESS) {
         const sensor = sensors.filter(
            (sensor) => sensor.sensor_token === token
         );
         sensor[0].last_data_update = Math.floor(Date.now() / 1000);
         const unauthorizedWithoutAuthorized = sensors.filter(
            (sensor) => sensor.sensor_token !== token
         );
         setUnauthorized(unauthorizedWithoutAuthorized);
         setAuthorized((prev) => [...sensor, ...prev]);
         addMessage(MESSAGE_TYPES.SUCCESS, `${name} authorized successfully!`);
         onClose();
      }
   };

   return (
      <div className='relative h-screen max-h-screen w-full justify-between bg-gray-100 px-5 py-3 pb-14 shadow-md sm:h-auto sm:max-w-lg sm:rounded-md md:pb-3'>
         <div className='flex items-center justify-between pb-2'>
            <h2 className='text-2xl font-bold text-gray-900'>
               Unauthorized sensors
            </h2>
            <div
               className='flex h-10 w-10 cursor-pointer items-center justify-center rounded-md text-gray-900 transition-colors duration-200 hover:bg-blue-600 hover:text-gray-200'
               onClick={() => {
                  onClose();
               }}
            >
               <TbX className='cursor-pointer text-2xl' />
            </div>
         </div>
         <div className='grid grid-cols-1 gap-2 text-gray-800 md:grid-cols-2'>
            {sensors &&
               sensors.map((sensor, index) => (
                  <UnauthorizedSensorItem
                     key={index}
                     sensor={sensor}
                     onAccept={() =>
                        queryAcceptSensor(
                           sensor.sensor_name,
                           sensor.sensor_token
                        )
                     }
                  />
               ))}
            {sensors.length === 0 && (
               <div className='col-span-2 rounded-md bg-gray-200 p-3 text-center'>
                  <h2 className='font-semibold'>
                     No unauthorized sensors found...
                  </h2>
                  <p className='text-sm'>
                     Once a sensor is attempting to connect it will show up
                     here!
                  </p>
               </div>
            )}
         </div>
      </div>
   );
};

export default UnauthorizedSensorDialog;
