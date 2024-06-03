import React, { useState } from 'react';
import DialogContainer from '../../../components/Dialog/DialogContainer';
import WipeDataDialog from '../../../components/Dialog/WipeDataDialog';

const Data = () => {
   const [isDialog, setIsDialog] = useState(false);
   return (
      <>
         <div className='flex'>
            <button
               onClick={() => setIsDialog(true)}
               className='relative flex cursor-pointer rounded-md bg-gray-200 p-2 text-gray-500 transition-colors duration-200 hover:bg-gray-300'
            >
               Wipe Data
            </button>
         </div>
         {isDialog && (
            <DialogContainer leaveHorizontalPadding>
               <WipeDataDialog onCancel={() => setIsDialog(false)} />
            </DialogContainer>
         )}
      </>
   );
};

export default Data;
