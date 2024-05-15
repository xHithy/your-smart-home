import React from 'react';
import { TbArrowNarrowRight } from 'react-icons/tb';

interface Props {
   title: string;
   breadcrumbs?: string[];
}

const PageTitle = ({ title, breadcrumbs }: Props) => {
   return (
      <div>
         <div className='flex items-center space-x-1 text-2xl font-black text-slate-900 md:text-3xl'>
            <span>{title}</span>
            {breadcrumbs &&
               breadcrumbs.map((breadcrumb, index) => (
                  <div
                     className='flex items-center space-x-1'
                     key={index}
                  >
                     <TbArrowNarrowRight className='mt-[4px]' />
                     <span> {breadcrumb}</span>
                  </div>
               ))}
         </div>
      </div>
   );
};

export default PageTitle;
