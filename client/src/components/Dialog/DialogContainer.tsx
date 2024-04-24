import React, { ReactNode } from 'react';

interface Props {
   children: ReactNode;
}

const DialogContainer = ({ children }: Props) => {
   return (
      <div className='fixed right-0 top-0 z-30 flex min-h-screen w-screen items-center justify-center bg-black bg-opacity-80'>
         {children}
      </div>
   );
};

export default DialogContainer;
