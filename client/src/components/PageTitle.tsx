import React from 'react';
import { TbArrowNarrowRight, TbHome } from 'react-icons/tb';

interface Props {
   title: string;
   breadcrumbs?: string[];
}

const PageTitle = ({ title, breadcrumbs }: Props) => {
   return (
      <div>
         <div className='flex items-center justify-start gap-1 space-x-1 text-lg font-black text-slate-900 md:text-3xl'>
            {breadcrumbs ? (
               <>
                  <span
                     className='cursor-pointer rounded-md bg-gray-300 p-2 md:hidden'
                     onClick={() => (window.location.href = '/house')}
                  >
                     <TbHome className='text-2xl' />
                  </span>
                  <span
                     className='hidden cursor-pointer md:flex'
                     onClick={() => (window.location.href = '/house')}
                  >
                     {title}
                  </span>
               </>
            ) : (
               <span
                  className='cursor-pointer'
                  onClick={() => (window.location.href = '/house')}
               >
                  {title}
               </span>
            )}
            {breadcrumbs &&
               breadcrumbs.map((breadcrumb, index) => (
                  <div
                     className='flex items-center space-x-2'
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
