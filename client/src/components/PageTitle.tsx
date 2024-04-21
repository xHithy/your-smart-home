import React from 'react';

interface Props {
   title: string;
}

const PageTitle = ({ title }: Props) => {
   return (
      <div>
         <h1 className='text-3xl font-black text-slate-900'>{title}</h1>
      </div>
   );
};

export default PageTitle;
