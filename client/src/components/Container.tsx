import React, { ReactNode } from 'react';

interface Props {
   children: ReactNode;
}

const Container = ({ children }: Props) => {
   return (
      <div className='flex justify-center p-5 lg:px-0'>
         <div className='flex w-full max-w-5xl flex-col text-gray-100'>
            {children}
         </div>
      </div>
   );
};

export default Container;
