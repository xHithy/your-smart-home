import React, { useEffect, useRef, useState } from 'react';
import { TbCaretRightFilled } from 'react-icons/tb';
import { getLogs } from '../../../queries/getLogs';
import { API_RESPONSE } from '../../../queries/responses';
import { useMessages } from '../../../providers/MessageContext';
import { MESSAGE_TYPES } from '../../../models/messageContextModel';

interface Props {
   value: string;
   timestamp: number;
}

interface LogModel {
   log: string;
   timestamp: number;
}

const LoadingItem = () => {
   return (
      <>
         <span className='h-3 w-[80%] animate-pulse rounded-md bg-gray-300'></span>
         <span className='h-3 w-[40%] animate-pulse rounded-md bg-gray-300'></span>
         <span className='h-3 w-[60%] animate-pulse rounded-md bg-gray-300'></span>
         <span className='h-3 w-[20%] animate-pulse rounded-md bg-gray-300'></span>
         <span className='h-3 w-[40%] animate-pulse rounded-md bg-gray-300'></span>
      </>
   );
};

const LogItem = ({ value, timestamp }: Props) => {
   const formatDate = (timestamp: number): string => {
      const date = new Date(timestamp * 1000);
      const hours = String(date.getHours()).padStart(2, '0');
      const minutes = String(date.getMinutes()).padStart(2, '0');
      const seconds = String(date.getSeconds()).padStart(2, '0');
      return `${hours}:${minutes}:${seconds}`;
   };

   return (
      <div className='flex items-start space-x-1 text-sm'>
         <code className='flex items-center space-x-1'>
            <code>{formatDate(timestamp)}</code>
            <TbCaretRightFilled className='h-4 w-4 text-lg' />
         </code>
         <code className='text-sm'>{value}</code>
      </div>
   );
};

const LogWindow = () => {
   const { addMessage } = useMessages();
   const [isLoading, setIsLoading] = useState(true);
   const [logs, setLogs] = useState<LogModel[]>([]);
   const logContainerRef = useRef<HTMLDivElement>(null);

   const queryGetLogs = async () => {
      setIsLoading(true);
      const response = await getLogs();

      if (response.type === API_RESPONSE.SUCCESS) {
         setLogs(response.data);
      } else {
         addMessage(MESSAGE_TYPES.ERROR, 'Error while fetching logs');
      }

      setIsLoading(false);
   };

   useEffect(() => {
      const handleLogUpdate = (event: any) => {
         setLogs((prev) => [...prev, event.data]);
      };

      window.Echo.channel('logs-channel').listen(
         'ActionLogEvent',
         handleLogUpdate
      );

      return () => {
         window.Echo.leaveChannel('logs-channel');
      };
   }, []);

   useEffect(() => {
      queryGetLogs();
   }, []);

   useEffect(() => {
      if (logContainerRef.current) {
         logContainerRef.current.scrollTop =
            logContainerRef.current.scrollHeight;
      }
   }, [logs]);

   if (isLoading) {
      return (
         <div className='flex h-[300px] w-full flex-col space-y-1 overflow-hidden rounded-md bg-gray-200 p-3'>
            <LoadingItem />
            <LoadingItem />
            <LoadingItem />
            <LoadingItem />
         </div>
      );
   }

   return (
      <div
         ref={logContainerRef}
         className='h-[90%] min-h-[300px] w-full space-y-2 overflow-auto rounded-md bg-gray-950 px-4 pb-2 pt-2 md:h-[300px]'
      >
         {logs.map((log, index) => (
            <LogItem
               key={index}
               value={log.log}
               timestamp={log.timestamp}
            />
         ))}
      </div>
   );
};

export default LogWindow;
