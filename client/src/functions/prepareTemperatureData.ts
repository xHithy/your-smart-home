import { TemperatureModel } from '../models/temperatureModel';

export interface PrepareTemperatureDataModel {
   time: string;
   value: number | null;
}

export const prepareTemperatureData = (
   data: TemperatureModel[],
   intervalMinutes: number,
   dataLengthInDays: number
): PrepareTemperatureDataModel[] => {
   const now = Math.floor(Date.now() / 1000);
   const dataLengthInSeconds = dataLengthInDays * 24 * 60 * 60;
   const startTime = now - dataLengthInSeconds;

   const filteredData = data.filter((entry) => entry.timestamp >= startTime);

   const aggregatedData: PrepareTemperatureDataModel[] = [];
   const interval = intervalMinutes * 60;

   let currentIntervalStart = startTime;
   let currentIntervalEnd = startTime + interval;
   let intervalTemps: number[] = [];

   const addAggregatedData = (start: number, temps: number[]) => {
      if (temps.length > 0) {
         const avgTemp =
            temps.reduce((sum, temp) => sum + temp, 0) / temps.length;
         aggregatedData.push({
            time: new Date(start * 1000).toLocaleTimeString([], {
               hour: '2-digit',
               minute: '2-digit',
            }),
            value: parseFloat(avgTemp.toFixed(2)),
         });
      } else {
         aggregatedData.push({
            time: new Date(start * 1000).toLocaleTimeString([], {
               hour: '2-digit',
               minute: '2-digit',
            }),
            value: 0,
         });
      }
   };

   filteredData.forEach((entry, index) => {
      if (
         entry.timestamp >= currentIntervalStart &&
         entry.timestamp < currentIntervalEnd
      ) {
         intervalTemps.push(Number(entry.value));
      } else {
         addAggregatedData(currentIntervalStart, intervalTemps);

         // Check if there is a significant gap before adding null values
         const nextTimestamp =
            index < filteredData.length - 1
               ? filteredData[index + 1].timestamp
               : currentIntervalEnd;
         if (nextTimestamp - currentIntervalEnd > 30) {
            while (entry.timestamp >= currentIntervalEnd + 30) {
               // Adjust the threshold as needed
               currentIntervalStart = currentIntervalEnd;
               currentIntervalEnd += interval;
               addAggregatedData(currentIntervalStart, []);
            }
         }

         currentIntervalStart = currentIntervalEnd;
         currentIntervalEnd += interval;
         intervalTemps = [Number(entry.value)];
      }
   });

   if (intervalTemps.length > 0) {
      addAggregatedData(currentIntervalStart, intervalTemps);
   }

   return aggregatedData;
};
