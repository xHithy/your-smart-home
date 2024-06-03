import React from 'react';
import { HumidityModel } from '../../../../models/humidityModel';
import {
   Area,
   AreaChart,
   ResponsiveContainer,
   Tooltip,
   XAxis,
   YAxis,
} from 'recharts';
import HumidityTooltip from './HumidityTooltip';

interface Props {
   selectedChart: number;
   humidities: HumidityModel[];
}

const HumidityChart = ({ selectedChart, humidities }: Props) => {
   // Filter out null humidity values
   const validData = humidities.filter((data) => !data.isInvalid);
   const minTemp = Math.min(
      ...validData.map((data) => data.value as unknown as number)
   );
   const maxTemp = Math.max(
      ...validData.map((data) => data.value as unknown as number)
   );
   const yMin = Math.floor(minTemp) - 6;
   const yMax = Math.ceil(maxTemp) + 6;

   if (validData.length > 0) {
      return (
         <div className='flex flex-col space-y-2'>
            <div className='relative rounded-md py-2'>
               {selectedChart === 0 && (
                  <div className='absolute left-3 top-2 flex items-center space-x-2 font-semibold text-red-600'>
                     <div className='h-1 w-1 animate-ping rounded-full bg-red-600 duration-200'></div>
                     <span className='text-xs'>Live updates</span>
                  </div>
               )}
               <ResponsiveContainer
                  width='100%'
                  height={200}
               >
                  <AreaChart data={humidities}>
                     <defs>
                        <linearGradient
                           id='colorTemp'
                           x1='0'
                           y1='0'
                           x2='0'
                           y2='1'
                        >
                           <stop
                              offset='0%'
                              stopColor='#3b82f6'
                              stopOpacity={1}
                           />
                           <stop
                              offset='120%'
                              stopColor='#e5e7eb'
                              stopOpacity={0}
                           />
                        </linearGradient>
                     </defs>
                     <XAxis
                        hide
                        dataKey='timestamp'
                        tickFormatter={(time) => {
                           const date = new Date(time * 1000);
                           return date.toLocaleTimeString([], {
                              hour: '2-digit',
                              minute: '2-digit',
                           });
                        }}
                     />
                     <YAxis
                        hide
                        domain={[yMin, yMax]}
                        ticks={[yMin, yMax]}
                     />
                     <Tooltip
                        content={
                           <HumidityTooltip
                              active
                              label='Humidity'
                              payload={humidities}
                           />
                        }
                     />
                     <Area
                        type='monotone'
                        dataKey='value'
                        stroke='#2563eb'
                        fill='url(#colorTemp)'
                        fillOpacity={1}
                        dot={false}
                        strokeWidth={2}
                        connectNulls={true}
                        isAnimationActive={false}
                     />
                  </AreaChart>
               </ResponsiveContainer>
            </div>
         </div>
      );
   } else {
      return <div />;
   }
};

export default HumidityChart;
