import React, { useState } from 'react';
import DialogContainer from '../../../components/Dialog/DialogContainer';
import LogsDialog from '../../../components/Dialog/Logs/LogsDialog';

const Logs = () => {
   const [isDialog, setIsDialog] = useState(false);
   return (
      <>
         <div className='flex'>
            <button
               onClick={() => setIsDialog(true)}
               className='relative flex cursor-pointer rounded-md bg-gray-200 p-2 text-gray-500 transition-colors duration-200 hover:bg-gray-300'
            >
               Logs
            </button>
         </div>
         {isDialog && (
            <DialogContainer>
               <LogsDialog onClose={() => setIsDialog(false)} />
            </DialogContainer>
         )}
      </>
   );
};

export default Logs;
