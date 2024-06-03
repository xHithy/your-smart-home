import React, { useContext, useState } from 'react';
import SensorButton from './SensorButton';
import { ConnectionContext } from '../../../providers/ConnectionProvider';
import DialogContainer from '../../../components/Dialog/DialogContainer';
import UnauthorizedSensorDialog from '../../../components/Dialog/UnauthorizedSensorDialog/UnauthorizedSensorDialog';
import { timeAgo } from '../../../functions/timeAgo';
import AuthorizedSensorDialog from '../../../components/Dialog/AuthorizedSensorDialog/AuthorizedSensorDialog';

const Sensors = () => {
   const { authorized, unauthorized } = useContext(ConnectionContext);
   const [unauthorizedDialog, setUnauthorizedDialog] = useState(false);
   const [authorizedDialog, setAuthorizedDialog] = useState(false);

   const unauthorizedLength = unauthorized.filter(
      (sensor) => timeAgo(sensor.last_auth_attempt, true) < 15
   ).length;

   return (
      <>
         <div className='flex flex-wrap gap-3'>
            <SensorButton
               name={`Authorized Sensors`}
               notificationCount={authorized.length}
               onClick={() => setAuthorizedDialog(true)}
            />
            <SensorButton
               name='Unauthorized Sensors'
               notificationCount={unauthorizedLength}
               onClick={() => setUnauthorizedDialog(true)}
            />
         </div>
         {unauthorizedDialog && (
            <DialogContainer>
               <UnauthorizedSensorDialog
                  onClose={() => setUnauthorizedDialog(false)}
                  sensors={unauthorized}
               />
            </DialogContainer>
         )}
         {authorizedDialog && (
            <DialogContainer>
               <AuthorizedSensorDialog
                  sensors={authorized}
                  onClose={() => setAuthorizedDialog(false)}
               />
            </DialogContainer>
         )}
      </>
   );
};

export default Sensors;
