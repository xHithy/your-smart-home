import React, { useState, useEffect, useContext } from 'react';
import { Sensor } from '../../../models/sensorModel';
import { timeAgo } from '../../../functions/timeAgo';
import FormButton from '../../FormButton';
import { ConnectionContext } from '../../../providers/ConnectionProvider';

interface Props {
   sensor: Sensor;
   onAccept: () => void;
}

const UnauthorizedSensorItem = ({ sensor, onAccept }: Props) => {
   const { setUnauthorized } = useContext(ConnectionContext);
   const [elapsedTime, setElapsedTime] = useState(0);

   useEffect(() => {
      const intervalId = setInterval(() => {
         setElapsedTime((prev) => prev + 1);

         if (timeAgo(sensor.last_auth_attempt, true) > 15) {
            setUnauthorized((prev) =>
               prev.filter((item) => item.sensor_token !== sensor.sensor_token)
            );
         }
      }, 1000);

      return () => clearInterval(intervalId);
   }, [sensor.last_auth_attempt, setUnauthorized]);

   return (
      <div className='flex flex-col items-start rounded-md bg-gray-200 p-2'>
         <div className='flex flex-col pb-4'>
            <div className='flex flex-col space-y-2'>
               <span className='font-semibold leading-none'>
                  {sensor.sensor_name}
               </span>
               <span className='text-xs leading-none text-gray-600'>
                  Last connection attempt: {timeAgo(sensor.last_auth_attempt)}
               </span>
            </div>
         </div>
         <FormButton
            title='Verify'
            onSubmit={onAccept}
         />
      </div>
   );
};

export default UnauthorizedSensorItem;
