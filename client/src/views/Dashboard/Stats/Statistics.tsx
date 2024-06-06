import React, { useEffect, useState } from 'react';
import { getStatistics } from '../../../queries/getStatistics';
import { API_RESPONSE } from '../../../queries/responses';
import { StatsModel } from '../../../models/statsModel';
import LoadingSkeleton from './LoadingSkeleton';
import { TbChartBar } from 'react-icons/tb';

interface StatsRowItemProps {
   title: string;
   value: string;
   timestamp?: number;
}

const StatsRowItem = ({ title, value, timestamp }: StatsRowItemProps) => {
   const formatDate = (timestamp: number): string => {
      const date = new Date(timestamp * 1000); // Convert from Unix timestamp (seconds) to milliseconds
      const day = String(date.getDate()).padStart(2, '0');
      const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed
      const year = date.getFullYear();
      return `${day}.${month}.${year}`;
   };

   return (
      <div className='flex h-[92px] flex-col items-center justify-center rounded-md bg-gray-200 p-3'>
         <span className='text-center text-sm text-gray-500'>{title}</span>
         <span className='text-center text-2xl font-black text-gray-900'>
            {value}
         </span>
         {timestamp && (
            <span className='text-center text-xs text-gray-500'>
               On: {formatDate(timestamp)}
            </span>
         )}
      </div>
   );
};

interface StatsRowProps {
   title: string;
   stats: StatsModel;
   valueType: string;
}

const StatsRow = ({ title, stats, valueType }: StatsRowProps) => {
   return (
      <div className='flex flex-col text-gray-800'>
         <div className='flex items-center space-x-1 pb-1 text-lg font-semibold'>
            <TbChartBar className='text-xl' />
            <span>{title}</span>
         </div>
         <div className='grid grid-cols-2 gap-2 md:grid-cols-4'>
            <StatsRowItem
               title='All Time High'
               value={`${stats.ath.value}${valueType}`}
               timestamp={stats.ath.timestamp}
            />
            <StatsRowItem
               title='All Time Low'
               value={`${stats.atl.value}${valueType}`}
               timestamp={stats.atl.timestamp}
            />
            <StatsRowItem
               title='All Time Average'
               value={`${stats.avg}${valueType}`}
            />
            <StatsRowItem
               title='Total records'
               value={`${stats.total_records}`}
            />
         </div>
      </div>
   );
};

const Statistics = () => {
   const [isLoading, setIsLoading] = useState(true);
   const [temperatureStats, setTemperatureStats] = useState<StatsModel>();
   const [humidityStats, setHumidityStats] = useState<StatsModel>();
   const queryGetStatistics = async () => {
      setIsLoading(true);
      const response = await getStatistics();

      if (response.type === API_RESPONSE.SUCCESS) {
         setTemperatureStats(response.data.temperature);
         setHumidityStats(response.data.humidity);
      }

      setIsLoading(false);
   };

   useEffect(() => {
      queryGetStatistics();
   }, []);

   return (
      <div className='flex flex-col'>
         <div className='flex flex-col space-y-6'>
            {isLoading ? (
               <>
                  <LoadingSkeleton title='Temperature statistics' />
                  <LoadingSkeleton title='Humidity statistics' />
               </>
            ) : (
               temperatureStats &&
               humidityStats && (
                  <>
                     <StatsRow
                        title='Temperature statistics'
                        stats={temperatureStats}
                        valueType='°C'
                     />
                     <StatsRow
                        title='Humidity statistics'
                        stats={humidityStats}
                        valueType='%'
                     />
                  </>
               )
            )}
         </div>
      </div>
   );
};

export default Statistics;
