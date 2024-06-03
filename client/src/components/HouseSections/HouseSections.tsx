import React, { useContext, useEffect } from 'react';
import { DataContext } from '../../providers/DataProvider';
import LoadingSkeleton from './LoadingSkeleton';
import SingleSection from './SingleSection';
import { Section } from '../../models/sectionModel';

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
            <div className='flex flex-col items-center justify-center rounded-md bg-gray-200 py-5'>
               <span className='text-xl font-black text-gray-900'>
                  No sections found...
               </span>
               <span className='text-gray-500'>
                  Try creating a new section, for example 'First Floor'
               </span>
            </div>
         ) : (
            <div className='grid grid-cols-1 gap-2 md:grid-cols-2'>
               {sections.map((section: Section, index) => (
                  <SingleSection
                     key={index}
                     name={section.name}
                     color={section.color}
                     subsectionCount={section.sub_sections.length}
                     id={section.id}
                  />
               ))}
            </div>
         )}
      </div>
   );
};

export default HouseSections;
