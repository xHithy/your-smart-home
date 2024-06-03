import React, { useState } from 'react';
import DialogContainer from '../../../components/Dialog/DialogContainer';
import LogoutDialog from '../../../components/Dialog/LogoutDialog';
import { postLogout } from '../../../queries/postLogout';

const Logout = () => {
   const [isDialog, setIsDialog] = useState(false);

   const queryLogout = async () => {
      await postLogout();
      localStorage.clear();
      window.location.href = '/';
   };

   return (
      <>
         <div className='flex'>
            <button
               onClick={() => setIsDialog(true)}
               className='relative flex cursor-pointer rounded-md bg-gray-200 p-2 text-gray-500 transition-colors duration-200 hover:bg-gray-300'
            >
               Log Out
            </button>
         </div>
         {isDialog && (
            <DialogContainer leaveHorizontalPadding>
               <LogoutDialog
                  onCancel={() => setIsDialog(false)}
                  onLogout={() => queryLogout()}
               />
            </DialogContainer>
         )}
      </>
   );
};

export default Logout;
