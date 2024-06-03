import React, { ReactNode } from 'react';

interface Props {
   children: ReactNode;
   leaveHorizontalPadding?: boolean;
}

const DialogContainer = ({ children, leaveHorizontalPadding }: Props) => {
   return (
      <div
         style={{
            paddingLeft: leaveHorizontalPadding ? 20 : undefined,
            paddingRight: leaveHorizontalPadding ? 20 : undefined,
         }}
         className='fixed right-0 top-0 z-30 flex min-h-screen w-screen items-center justify-center bg-black bg-opacity-80'
      >
         {children}
      </div>
   );
};

export default DialogContainer;
