import React, { useEffect } from 'react';
import { UnauthorizedSensorModel } from '../models/UnauthorizedSensorModel';

const Sensors = () => {
   useEffect(() => {
      window.Echo.channel('connection-attempt-channel').listen(
         'SensorConnectionAttemptEvent',
         (event: UnauthorizedSensorModel) => {
            console.log(event);
         }
      );

      return () => {
         window.Echo.leaveChannel('connection-attempt-channel');
      };
   }, []);
   return (
      <div className='h-full max-h-screen w-full bg-gradient-to-br from-gray-900 to-gray-800'>
         <h1>Sensors</h1>
      </div>
   );
};

export default Sensors;
