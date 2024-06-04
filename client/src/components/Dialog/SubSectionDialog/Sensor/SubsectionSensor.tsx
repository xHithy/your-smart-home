import { useEffect, useRef, useState } from 'react';
import { Sensor } from '../../../../models/sensorModel';
import { getSensorBySubsection } from '../../../../queries/getSensorBySubsection';
import { API_RESPONSE } from '../../../../queries/responses';
import { useMessages } from '../../../../providers/MessageContext';
import { MESSAGE_TYPES } from '../../../../models/messageContextModel';
import AuthorizedSensorItem from '../../AuthorizedSensorDialog/AuthorizedSensorItem';
import LoadingSkeleton from './LoadingSkeleton';
import { getUnassignedSensors } from '../../../../queries/getUnassignedSensors';
import Select from '../../../Select';
import { putAssignSensor } from '../../../../queries/putAssignSensor';
import { timeAgo } from '../../../../functions/timeAgo';

interface Props {
   room_id: number;
}

const SubsectionSensor = ({ room_id }: Props) => {
   const { addMessage } = useMessages();
   const [sensor, setSensor] = useState<Sensor | null>(null);
   const [unassignedSensors, setUnassignedSensors] = useState<Sensor[] | null>(
      null
   );
   const [isLoading, setIsLoading] = useState(true);
   const [isLoadingUnassigned, setIsLoadingUnassigned] = useState(true);
   const sensorRef = useRef<Sensor | null>(null);

   const queryGetSensor = async () => {
      setIsLoading(true);
      const response = await getSensorBySubsection(room_id);

      if (response.type === API_RESPONSE.SUCCESS) {
         if (response.data.sensor) {
            setSensor(response.data.sensor);
            sensorRef.current = response.data.sensor;
         }
      }

      if (response.type === API_RESPONSE.GENERIC_ERROR) {
         addMessage(MESSAGE_TYPES.ERROR, response.data);
      }

      setIsLoading(false);
   };

   const queryGetUnassignedSensors = async () => {
      setIsLoadingUnassigned(true);
      const response = await getUnassignedSensors();

      if (response.type === API_RESPONSE.SUCCESS) {
         setUnassignedSensors(response.data);
      } else {
         addMessage(MESSAGE_TYPES.ERROR, 'Failed to fetch unassigned sensors');
      }

      setIsLoadingUnassigned(false);
   };

   const queryAssignSensor = async (sensor_id: number) => {
      setIsLoading(true);
      const response = await putAssignSensor(sensor_id, room_id);

      if (response.type === API_RESPONSE.SUCCESS) {
         setSensor(response.data);
         sensorRef.current = response.data;
         addMessage(
            MESSAGE_TYPES.SUCCESS,
            'Sensor successfully assigned to this room'
         );
      } else {
         setSensor(null);
         sensorRef.current = null;
         addMessage(
            MESSAGE_TYPES.ERROR,
            'There was an error while assigning the sensor to this room'
         );
      }
      setIsLoading(false);
   };

   const queryUnassignSensor = async (sensor_id: number) => {
      setIsLoading(true);
      const response = await putAssignSensor(sensor_id, 0);

      if (response.type === API_RESPONSE.SUCCESS) {
         queryGetUnassignedSensors();
         addMessage(
            MESSAGE_TYPES.SUCCESS,
            'Sensor successfully unassigned from this room'
         );
      } else {
         addMessage(
            MESSAGE_TYPES.ERROR,
            'There was an error while unassigning the sensor from this room'
         );
      }

      setSensor(null);
      sensorRef.current = null;
      setIsLoading(false);
   };

   // Update the subsections sensor timestamps
   useEffect(() => {
      const handleDataUpdate = (event: any) => {
         if (sensorRef.current) {
            if (
               sensorRef.current.sensor_token === event.data.sensor.sensor_token
            ) {
               setSensor(event.data.sensor);
               sensorRef.current = event.data.sensor;
            }
         }
      };

      const channel = window.Echo.channel(`room-data-channel-${room_id}`);
      channel.listen('RoomDataLogEvent', handleDataUpdate);

      return () => {
         channel.stopListening('RoomDataLogEvent', handleDataUpdate);
      };
   }, []);

   useEffect(() => {
      queryGetSensor();
      queryGetUnassignedSensors();
   }, []);

   let unassignedSensorValues;

   if (unassignedSensors && unassignedSensors.length > 0) {
      unassignedSensorValues = unassignedSensors.map((item) => {
         const sensorActivity =
            timeAgo(item.last_data_update, true) < 35
               ? '(Active)'
               : '(Offline)';
         return { id: item.id, name: `${item.sensor_name} ${sensorActivity}` };
      });
   }

   if (isLoading || isLoadingUnassigned) {
      return <LoadingSkeleton />;
   }

   if (sensor) {
      return (
         <AuthorizedSensorItem
            sensor={sensor}
            unassign={() => queryUnassignSensor(sensor.id)}
         />
      );
   }

   if (!unassignedSensorValues || unassignedSensorValues.length === 0) {
      return (
         <div className='flex flex-col'>
            <span>No unassigned sensors to connect...</span>
         </div>
      );
   }

   if (unassignedSensorValues && unassignedSensorValues.length > 0) {
      return (
         <div className='flex flex-col'>
            <Select
               title='Select a sensor to assign'
               values={unassignedSensorValues}
               value={0}
               text='Assign a sensor'
               onValueChange={(sensor_id) => queryAssignSensor(sensor_id)}
            />
         </div>
      );
   }

   return <div />;
};

export default SubsectionSensor;
