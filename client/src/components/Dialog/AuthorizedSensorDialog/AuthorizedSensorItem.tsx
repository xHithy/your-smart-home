import React, { useContext, useEffect, useState } from 'react';
import { Sensor } from '../../../models/sensorModel';
import { timeAgo } from '../../../functions/timeAgo';
import { TbDots } from 'react-icons/tb';
import OptionDialog from '../../OptionDialog/OptionDialog';
import { API_RESPONSE } from '../../../queries/responses';
import { useMessages } from '../../../providers/MessageContext';
import { MESSAGE_TYPES } from '../../../models/messageContextModel';
import { deleteSensor } from '../../../queries/deleteSensor';
import { ConnectionContext } from '../../../providers/ConnectionProvider';
import { putAssignSensor } from '../../../queries/putAssignSensor';

interface Props {
   sensor: Sensor;
   unassign?: () => void;
}

const ActiveButton = () => {
   return (
      <div className='rounded-md bg-green-600 px-1.5 py-1 text-xs font-normal text-gray-200 shadow-sm'>
         Active
      </div>
   );
};

const InactiveButton = () => {
   return (
      <div className='self-start rounded-md bg-gray-400 px-1.5 py-1 text-xs text-gray-700 shadow-sm'>
         Offline
      </div>
   );
};

const UnassignedButton = () => {
   return (
      <div className='rounded-md bg-amber-400 px-1.5 py-1 text-xs text-gray-800 shadow-sm'>
         Unassigned
      </div>
   );
};

const AssignedButton = () => {
   return (
      <div className='rounded-md bg-green-600 px-1.5 py-1 text-xs font-normal text-gray-200 shadow-sm'>
         Assigned
      </div>
   );
};

const AuthorizedSensorItem = ({ sensor, unassign }: Props) => {
   const { addMessage } = useMessages();
   const { setAuthorized } = useContext(ConnectionContext);
   const [isDialog, setIsDialog] = useState(false);
   const [sensorName, setSensorName] = useState(sensor.sensor_name);
   const [timeSinceLastUpdate, setTimeSinceLastUpdate] = useState(
      timeAgo(sensor.last_data_update, true)
   );

   const queryEditSensorName = async (newName: string) => {
      const response = await putAssignSensor(
         sensor.id,
         sensor.sub_section_id,
         newName
      );
      if (response.type === API_RESPONSE.SUCCESS) {
         addMessage(MESSAGE_TYPES.SUCCESS, 'Sensor name updated successfully');
      }

      if (response.type === API_RESPONSE.API_ERROR) {
         if (response.data.sensor_name) {
            addMessage(MESSAGE_TYPES.ERROR, response.data.sensor_name);
         } else {
            addMessage(
               MESSAGE_TYPES.ERROR,
               'Incorrectly formatted sensor name'
            );
         }
         setSensorName(sensor.sensor_name);
      }

      if (response.type === API_RESPONSE.GENERIC_ERROR) {
         addMessage(MESSAGE_TYPES.ERROR, response.data);
         setSensorName(sensor.sensor_name);
      }
   };

   const queryDeleteSensor = async () => {
      const response = await deleteSensor(sensor.sensor_token);

      if (response.type === API_RESPONSE.SUCCESS) {
         setAuthorized((prev) =>
            prev.filter((item) => item.sensor_token !== sensor.sensor_token)
         );
         addMessage(MESSAGE_TYPES.SUCCESS, response.data);
         setIsDialog(false);
      } else {
         addMessage(
            MESSAGE_TYPES.ERROR,
            'There was an error while trying to remove the sensor'
         );
      }
   };

   useEffect(() => {
      const intervalId = setInterval(() => {
         setTimeSinceLastUpdate(timeAgo(sensor.last_data_update, true));
      }, 1000);

      return () => clearInterval(intervalId);
   }, [sensor.last_data_update]);

   return (
      <div className='flex flex-col items-start rounded-md bg-gray-200 p-2'>
         <div className='flex w-full flex-col pb-2'>
            <div className='flex flex-col space-y-2'>
               <div className='relative flex w-full items-center justify-between space-x-2'>
                  <span
                     className='h-auto w-full py-0.5 font-semibold leading-none'
                     contentEditable
                     onBlur={(e) => {
                        const newName = e.target.innerText;
                        if (newName !== sensorName) {
                           setSensorName(newName);
                           queryEditSensorName(newName);
                        }
                     }}
                  >
                     {sensorName}
                  </span>
                  <span
                     className='relative z-10 flex h-8 min-h-8 w-8 min-w-8 cursor-pointer items-center justify-center rounded-md text-gray-800 transition-colors duration-200 hover:bg-blue-600 hover:text-gray-100'
                     onClick={(e) => {
                        e.stopPropagation();
                        setIsDialog(true);
                     }}
                  >
                     <TbDots className='text-2xl' />
                  </span>
                  {isDialog && (
                     <OptionDialog
                        onUnassign={unassign}
                        onDelete={() => queryDeleteSensor()}
                        deleteText='Are you sure you want to delete this sensor?'
                        onClose={() => setIsDialog(false)}
                     />
                  )}
               </div>
               <div className='flex flex-col space-y-2'>
                  <div className='flex items-center space-x-1'>
                     {timeSinceLastUpdate <= 35 && <ActiveButton />}
                     {timeSinceLastUpdate > 35 && <InactiveButton />}
                     {sensor.sub_section_id === 0 && <UnassignedButton />}
                     {sensor.sub_section_id !== 0 && <AssignedButton />}
                  </div>
                  <span className='text-xs leading-none text-gray-600'>
                     Last update: {timeAgo(sensor.last_data_update)}
                  </span>
               </div>
            </div>
         </div>
      </div>
   );
};

export default AuthorizedSensorItem;
