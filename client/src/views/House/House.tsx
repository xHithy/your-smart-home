import React from 'react';
import Container from '../../components/Container';
import NavigationBar from '../../components/NavigationBar/NavigationBar';
import PageTitle from '../../components/PageTitle';
import { TbLayoutGridAdd } from 'react-icons/tb';
import DataProvider from '../../providers/DataProvider';
import HouseSections from '../../components/HouseSections/HouseSections';

const House = () => {
   return (
      <DataProvider>
         <Container>
            <NavigationBar />
            <div className='sticky top-0 flex w-full items-center justify-between py-3'>
               <PageTitle title='Your House layout' />
               <button className='flex items-center space-x-2 self-stretch rounded-sm bg-blue-600 p-2 font-semibold text-gray-200 shadow-sm outline outline-2 outline-blue-600 transition-colors duration-200 hover:bg-blue-600 hover:bg-opacity-70'>
                  <TbLayoutGridAdd className='text-2xl' />
                  <span className='text-sm'>New Section</span>
               </button>
            </div>
            <HouseSections />
         </Container>
      </DataProvider>
   );
};

export default House;
