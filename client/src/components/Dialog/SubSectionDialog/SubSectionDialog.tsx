import React, { useEffect, useState } from 'react';
import { TbCpu, TbTemperature, TbWhirl, TbX } from 'react-icons/tb';
import { TemperatureModel } from '../../../models/temperatureModel';
import { getTemperatures } from '../../../queries/getTemperatures';
import { API_RESPONSE } from '../../../queries/responses';
import TemperatureChart from './Temperature/TemperatureChart';
import TemperatureStats from './Temperature/TemperatureStats';
import Select from '../../Select';
import HumidityChart from './Humidity/HumidityChart';
import { HumidityModel } from '../../../models/humidityModel';
import { useMessages } from '../../../providers/MessageContext';
import { MESSAGE_TYPES } from '../../../models/messageContextModel';
import { getHumidities } from '../../../queries/getHumidities';
import HumidityStats from './Humidity/HumidityStats';
import SubsectionSensor from './Sensor/SubsectionSensor';
import LoadingSkeleton from './LoadingSkeleton';

interface Props {
   room_id: number;
   name: string;
   onClose: () => void;
}

const SubSectionDialog = ({ room_id, name, onClose }: Props) => {
   const { addMessage } = useMessages();
   const [isLoadingHumidity, setIsLoadingHumidity] = useState(true);
   const [isLoadingTemperature, setIsLoadingTemperature] = useState(true);
   const [temperatures, setTemperatures] = useState<TemperatureModel[]>([]);
   const [humidities, setHumidities] = useState<HumidityModel[]>([]);
   const [selectedTemperatureChart, setSelectedTemperatureChart] = useState(0);
   const [selectedHumidityChart, setSelectedHumidityChart] = useState(0);
   const [lastTemperatureUpdate, setLastTemperatureUpdate] = useState(
      Date.now()
   );
   const [lastHumidityUpdate, setLastHumidityUpdate] = useState(Date.now());

   const queryGetTemperature = async (query: string) => {
      setIsLoadingTemperature(true);
      const response = await getTemperatures(room_id, query);

      if (response.type === API_RESPONSE.SUCCESS) {
         setTemperatures(response.data);
      } else {
         addMessage(MESSAGE_TYPES.ERROR, response.data);
      }

      setIsLoadingTemperature(false);
   };

   const queryGetHumidity = async (query: string) => {
      setIsLoadingHumidity(true);
      const response = await getHumidities(room_id, query);

      if (response.type === API_RESPONSE.SUCCESS) {
         setHumidities(response.data);
      } else {
         addMessage(MESSAGE_TYPES.ERROR, response.data);
      }

      setIsLoadingHumidity(false);
   };

   const ChartTypes = [
      { name: 'Live', id: 0 },
      { name: 'Day', id: 1 },
      { name: 'Week', id: 2 },
   ];

   useEffect(() => {
      const handleDataUpdate = (event: any) => {
         if (event.data.temperature && selectedTemperatureChart === 0) {
            if (event.data.sensor.sub_section_id === room_id) {
               const temperature = event.data.temperature;
               setTemperatures((prev) => {
                  const updated = [...prev, temperature];
                  if (selectedTemperatureChart === 0) {
                     updated.shift();
                  }
                  return updated;
               });
               setLastTemperatureUpdate(Date.now());
            }
         }
         if (event.data.humidity && selectedHumidityChart === 0) {
            if (event.data.sensor.sub_section_id === room_id) {
               const humidity = event.data.humidity;
               setHumidities((prev) => {
                  const updated = [...prev, humidity];
                  if (selectedHumidityChart === 0) {
                     updated.shift();
                  }
                  return updated;
               });
               setLastHumidityUpdate(Date.now());
            }
         }
      };

      window.Echo.channel('main-data-channel').listen(
         'MainDataLogEvent',
         handleDataUpdate
      );

      return () => {
         window.Echo.leaveChannel('main-data-channel');
      };
   }, [room_id, selectedTemperatureChart, selectedHumidityChart]);

   useEffect(() => {
      const query =
         (selectedTemperatureChart === 0 && 'hour') ||
         (selectedTemperatureChart === 1 && 'day') ||
         'week';
      queryGetTemperature(query);
   }, [selectedTemperatureChart]);

   useEffect(() => {
      const query =
         (selectedHumidityChart === 0 && 'hour') ||
         (selectedHumidityChart === 1 && 'day') ||
         'week';
      queryGetHumidity(query);
   }, [selectedHumidityChart]);

   useEffect(() => {
      const intervalId = setInterval(() => {
         if (Date.now() - lastTemperatureUpdate > 32000) {
            setTemperatures((prev) => {
               const updated = [
                  ...prev,
                  {
                     id: 0,
                     sub_section_id: room_id,
                     value: 0,
                     timestamp: Date.now(),
                     isInvalid: true,
                  },
               ];
               if (selectedTemperatureChart === 0) {
                  updated.shift();
               }
               return updated;
            });
            setLastTemperatureUpdate(Date.now());
         }

         if (Date.now() - lastHumidityUpdate > 32000) {
            setHumidities((prev) => {
               const updated = [
                  ...prev,
                  {
                     id: 0,
                     sub_section_id: room_id,
                     value: 0,
                     timestamp: Date.now(),
                     isInvalid: true,
                  },
               ];
               if (selectedHumidityChart === 0) {
                  updated.shift();
               }
               return updated;
            });
            setLastHumidityUpdate(Date.now());
         }
      }, 32000);

      return () => clearInterval(intervalId);
   }, [
      lastTemperatureUpdate,
      lastHumidityUpdate,
      room_id,
      selectedTemperatureChart,
      selectedHumidityChart,
   ]);

   return (
      <div className='relative h-screen max-h-screen w-full justify-between overflow-y-auto bg-gray-100 px-5 pb-14 shadow-md sm:h-auto sm:rounded-md md:max-w-screen-lg md:pb-3'>
         <div className='sticky top-0 z-20 flex w-full items-center justify-between bg-gray-100 pb-2 pt-3'>
            <h2 className='text-2xl font-bold text-gray-900'>{name}</h2>
            <div
               className='flex h-10 w-10 cursor-pointer items-center justify-center rounded-md text-gray-900 transition-colors duration-200 hover:bg-blue-600 hover:text-gray-200'
               onClick={() => {
                  onClose();
               }}
            >
               <TbX className='cursor-pointer text-2xl' />
            </div>
         </div>
         <div className='flex flex-col text-gray-800'>
            <div className='flex flex-col space-y-2 pb-10'>
               <div className='grid grid-cols-1 gap-4 gap-y-8 lg:grid-cols-2'>
                  <div className='col-span-1 flex flex-col space-y-2'>
                     <div className='flex items-center justify-between'>
                        <div className='flex items-center space-x-2 text-lg font-semibold'>
                           <TbTemperature /> <span>Temperature</span>
                        </div>
                        <Select
                           values={ChartTypes}
                           value={selectedTemperatureChart}
                           onValueChange={(value: number) =>
                              setSelectedTemperatureChart(Number(value))
                           }
                        />
                     </div>
                     {isLoadingTemperature ? (
                        <LoadingSkeleton />
                     ) : (
                        <>
                           <TemperatureStats temperatures={temperatures} />
                           <TemperatureChart
                              selectedChart={selectedTemperatureChart}
                              temperatures={temperatures}
                           />
                        </>
                     )}
                  </div>
                  <div className='col-span-1 flex flex-col space-y-2'>
                     <div className='flex items-center justify-between'>
                        <div className='flex items-center space-x-2 text-lg font-semibold'>
                           <TbWhirl /> <span>Humidity</span>
                        </div>
                        <Select
                           values={ChartTypes}
                           value={selectedHumidityChart}
                           onValueChange={(value: number) =>
                              setSelectedHumidityChart(Number(value))
                           }
                        />
                     </div>
                     {isLoadingHumidity ? (
                        <LoadingSkeleton />
                     ) : (
                        <>
                           <HumidityStats humidities={humidities} />
                           <HumidityChart
                              selectedChart={selectedHumidityChart}
                              humidities={humidities}
                           />
                        </>
                     )}
                  </div>
                  <div className='col-span-1 lg:col-span-2'>
                     <div className='flex w-full flex-col space-y-2 md:w-[300px]'>
                        <div className='flex items-center space-x-2 text-lg font-semibold'>
                           <TbCpu /> <span>Sensor</span>
                        </div>
                        <SubsectionSensor room_id={room_id} />
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
};

export default SubSectionDialog;
