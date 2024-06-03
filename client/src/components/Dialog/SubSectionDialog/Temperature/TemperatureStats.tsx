import React from 'react';
import { TemperatureModel } from '../../../../models/temperatureModel';

interface StatItemProps {
   text: string;
   degrees: number | string;
}

const StatItem = ({ text, degrees }: StatItemProps) => {
   return (
      <div className='flex flex-col rounded-md bg-gray-200 px-2 py-4'>
         <span className='text-center text-sm text-gray-500'>{text}</span>
         <span className='text-center text-2xl font-black'>{degrees} °C</span>
      </div>
   );
};

interface Props {
   temperatures: TemperatureModel[];
}

const TemperatureStats = ({ temperatures }: Props) => {
   const validTemperatures = temperatures.filter((data) => !data.isInvalid);
   let currentTemperature: number;
   let highestTemperature: number;
   let lowestTemperature: number;
   let averageTemperature: number;

   if (validTemperatures.length > 0) {
      currentTemperature = validTemperatures.reduce((latest, temp) =>
         temp.timestamp > latest.timestamp ? temp : latest
      ).value as number;

      highestTemperature = Math.max(
         ...validTemperatures.map((temp) => temp.value as number)
      );

      lowestTemperature = Math.min(
         ...validTemperatures.map((temp) => temp.value as number)
      );

      averageTemperature =
         validTemperatures.reduce(
            (acc, temp) => acc + (temp.value as number),
            0
         ) / validTemperatures.length;
   } else {
      return <span>No temperature data available for this period...</span>;
   }

   const formatTemperature = (temp: number | string) => Number(temp).toFixed(1);

   return (
      <div className='grid grid-cols-2 gap-2 md:grid-cols-4'>
         <StatItem
            text='Current'
            degrees={formatTemperature(currentTemperature)}
         />
         <StatItem
            text='Average'
            degrees={formatTemperature(averageTemperature)}
         />
         <StatItem
            text='Highest'
            degrees={formatTemperature(highestTemperature)}
         />
         <StatItem
            text='Lowest'
            degrees={formatTemperature(lowestTemperature)}
         />
      </div>
   );
};

export default TemperatureStats;
