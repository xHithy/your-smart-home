import React from 'react';
import { HumidityModel } from '../../../../models/humidityModel';

interface StatItemProps {
   text: string;
   humidity: number | string;
}

const StatItem = ({ text, humidity }: StatItemProps) => {
   return (
      <div className='flex flex-col rounded-md bg-gray-200 px-2 py-4'>
         <span className='text-center text-sm text-gray-500'>{text}</span>
         <span className='text-center text-2xl font-black'>{humidity}%</span>
      </div>
   );
};

interface Props {
   humidities: HumidityModel[];
}

const HumidityStats = ({ humidities }: Props) => {
   const validHumidities = humidities.filter((data) => !data.isInvalid);
   let currentHumidity: number;
   let highestHumidity: number;
   let lowestHumidity: number;
   let averageHumidity: number;

   if (validHumidities.length > 0) {
      currentHumidity = validHumidities.reduce((latest, temp) =>
         temp.timestamp > latest.timestamp ? temp : latest
      ).value as number;

      highestHumidity = Math.max(
         ...validHumidities.map((humidity) => humidity.value as number)
      );

      lowestHumidity = Math.min(
         ...validHumidities.map((humidity) => humidity.value as number)
      );

      averageHumidity =
         validHumidities.reduce(
            (acc, temp) => acc + (temp.value as number),
            0
         ) / validHumidities.length;
   } else {
      return <span>No humidity data available for this period...</span>;
   }

   const formatHumidity = (temp: number | string) => Number(temp).toFixed(1);

   return (
      <div className='grid grid-cols-2 gap-2 md:grid-cols-4'>
         <StatItem
            text='Current'
            humidity={formatHumidity(currentHumidity)}
         />
         <StatItem
            text='Average'
            humidity={formatHumidity(averageHumidity)}
         />
         <StatItem
            text='Highest'
            humidity={formatHumidity(highestHumidity)}
         />
         <StatItem
            text='Lowest'
            humidity={formatHumidity(lowestHumidity)}
         />
      </div>
   );
};

export default HumidityStats;
