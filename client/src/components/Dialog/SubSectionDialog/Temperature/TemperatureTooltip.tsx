import React from 'react';
import { TbCalendar, TbClock, TbTemperature } from 'react-icons/tb';

interface Props {
   active: boolean;
   payload: any[];
   label: string;
}

const TemperatureTooltip = ({ active, payload, label }: Props) => {
   if (active && payload && payload.length) {
      const time = new Date(Number(label) * 1000).toLocaleTimeString([], {
         hour: '2-digit',
         minute: '2-digit',
         second: '2-digit',
      });

      const date = new Date(Number(label) * 1000).toDateString();

      return (
         <div className='rounded-md bg-gray-300 p-2'>
            <div className='flex items-center space-x-1'>
               <TbClock className='text-lg' />
               <span className='text-sm'>{time}</span>
            </div>
            <div className='flex items-center space-x-1'>
               <TbCalendar className='text-lg' />
               <span className='text-sm'>{date}</span>
            </div>
            {payload[0].payload.isInvalid ? (
               <span className='text-sm text-red-600'>Sensor offline</span>
            ) : (
               <div className='flex items-center space-x-1'>
                  <TbTemperature className='text-lg' />
                  <span className='text-sm'>{payload[0].value}°C</span>
               </div>
            )}
         </div>
      );
   } else {
      return null;
   }
};

export default TemperatureTooltip;
