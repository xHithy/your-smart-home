import React from 'react';
import Container from '../../components/Container';
import PageTitle from '../../components/PageTitle';
import NavigationBar from '../../components/NavigationBar/NavigationBar';
import Pinned from './Pinned/Pinned';
import Statistics from './Stats/Statistics';

const Dashboard = () => {
   return (
      <Container>
         <NavigationBar />
         <div className='sticky top-0 z-20 flex w-full items-center justify-between space-x-1 bg-gray-100 py-3'>
            <PageTitle title='Dashboard' />
         </div>
         <div className='flex flex-col space-y-6 pb-28 md:pb-5'>
            <Pinned />
            <Statistics />
         </div>
      </Container>
   );
};

export default Dashboard;
