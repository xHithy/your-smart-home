import React, { useContext, useEffect } from 'react';
import { DataContext } from '../../providers/DataProvider';
import LoadingSkeleton from './LoadingSkeleton';
import SingleSection from './SingleSection';

const HouseSections = () => {
   const { sections, setSections, sectionDataLoading } =
      useContext(DataContext);

   useEffect(() => {
      console.log(sections);
   }, [sections, setSections]);

   if (sectionDataLoading) {
      return <LoadingSkeleton />;
   }

   return (
      <div className='flex w-full flex-col'>
         {sections.length === 0 ? (
            <div className='flex flex-col items-center justify-center py-10'>
               <span className='text-xl font-black text-gray-900'>
                  No sections found...
               </span>
               <span className='text-gray-500'>
                  Try creating a new section, for example 'First Floor'
               </span>
            </div>
         ) : (
            <div className='flex flex-col'>
               {sections.map((section, index) => (
                  <SingleSection
                     key={index}
                     name={section.name}
                     color={section.color}
                     id={section.id}
                  />
               ))}
            </div>
         )}
      </div>
   );
};

export default HouseSections;
