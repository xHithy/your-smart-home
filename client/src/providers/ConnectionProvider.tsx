import React, { createContext, ReactNode, useEffect, useState } from 'react';
import { ConnectionContextModel } from '../models/connectionContextModel';
import { AuthorizedSensor, UnauthorizedSensor } from '../models/sensorModel';

export const ConnectionContext = createContext<ConnectionContextModel>({
   authorized: [],
   unauthorized: [],
   setAuthorized: () => {},
   setUnauthorized: () => {},
});

interface Props {
   children: ReactNode[] | ReactNode;
}

const ConnectionProvider = ({ children }: Props) => {
   const [authorized, setAuthorized] = useState<AuthorizedSensor[]>([]);
   const [unauthorized, setUnauthorized] = useState<UnauthorizedSensor[]>([]);

   useEffect(() => {
      window.Echo.channel('connection-attempt-channel').listen(
         'SensorConnectionAttemptEvent',
         (event: any) => {
            console.log(event);
         }
      );

      return () => {
         window.Echo.leaveChannel('connection-attempt-channel');
      };
   }, []);

   return (
      <ConnectionContext.Provider
         value={{ authorized, unauthorized, setAuthorized, setUnauthorized }}
      >
         {children}
      </ConnectionContext.Provider>
   );
};

export default ConnectionProvider;
