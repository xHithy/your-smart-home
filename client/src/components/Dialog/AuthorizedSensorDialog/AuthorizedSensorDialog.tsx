import React from 'react';
import { Sensor } from '../../../models/sensorModel';
import { TbX } from 'react-icons/tb';
import AuthorizedSensorItem from './AuthorizedSensorItem';

interface Props {
   sensors: Sensor[];
   onClose: () => void;
}

const AuthorizedSensorDialog = ({ sensors, onClose }: Props) => {
   return (
      <div className='relative h-screen max-h-screen w-full justify-between bg-gray-100 px-5 py-3 pb-14 shadow-md sm:h-auto sm:max-w-lg sm:rounded-md md:pb-3'>
         <div className='flex items-center justify-between pb-2'>
            <h2 className='text-2xl font-bold text-gray-900'>
               Authorized sensors
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
                  <AuthorizedSensorItem
                     key={index}
                     sensor={sensor}
                  />
               ))}
            {sensors.length === 0 && (
               <div className='col-span-2 rounded-md bg-gray-200 p-3 text-center'>
                  <h2 className='font-semibold'>
                     No authorized sensors found...
                  </h2>
                  <p className='text-sm'>
                     Once an authorized sensor is found, it will show up here!
                  </p>
               </div>
            )}
         </div>
      </div>
   );
};

export default AuthorizedSensorDialog;
