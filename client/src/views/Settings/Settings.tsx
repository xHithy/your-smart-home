import React from 'react';
import Container from '../../components/Container';
import NavigationBar from '../../components/NavigationBar/NavigationBar';
import PageTitle from '../../components/PageTitle';
import Sensors from './Sensors/Sensors';
import Logout from './Account/Logout';
import Data from './Data/Data';

const Settings = () => {
   return (
      <Container>
         <NavigationBar />
         <div className='sticky top-0 z-10 flex w-full items-center justify-between space-x-1 bg-gray-100 py-3'>
            <PageTitle title='Settings' />
         </div>
         <div className='flex flex-col space-y-2'>
            <div className='flex flex-col'>
               <h2 className='font-semibold text-gray-500'>Sensors</h2>
               <Sensors />
            </div>
            <div className='flex flex-col'>
               <h2 className='font-semibold text-gray-500'>Data</h2>
               <Data />
            </div>
            <div className='flex flex-col'>
               <h2 className='font-semibold text-gray-500'>Account</h2>
               <Logout />
            </div>
         </div>
      </Container>
   );
};

export default Settings;
