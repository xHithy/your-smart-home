import React from 'react';
import { TbArrowLeft, TbSlash } from 'react-icons/tb';

interface Props {
   title: string;
   breadcrumbs?: string[];
}

const PageTitle = ({ title, breadcrumbs }: Props) => {
   return (
      <div>
         <div className='flex items-center justify-start gap-1 space-x-1 text-xl font-black text-slate-900 md:text-2xl'>
            {breadcrumbs ? (
               <>
                  <span
                     className='flex cursor-pointer items-center space-x-1 rounded-md bg-gray-200 p-2 text-lg font-semibold duration-200 hover:bg-gray-300'
                     onClick={() => (window.location.href = '/house')}
                  >
                     <TbArrowLeft className='text-2xl' />
                     <span className='hidden sm:flex'>Back</span>
                  </span>
               </>
            ) : (
               <span className='cursor-pointer text-2xl md:text-3xl'>
                  {title}
               </span>
            )}
            {breadcrumbs && (
               <>
                  <div className='hidden items-center space-x-2 pl-2 md:flex'>
                     <span>Your House</span>
                  </div>
                  {breadcrumbs.map((breadcrumb, index) => (
                     <div
                        className='flex items-center space-x-2'
                        key={index}
                     >
                        <TbSlash className='mt-[4px] text-2xl md:text-3xl' />
                        <span> {breadcrumb}</span>
                     </div>
                  ))}
               </>
            )}
         </div>
      </div>
   );
};

export default PageTitle;
