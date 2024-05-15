import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Dashboard from './views/Dashboard/Dashboard';
import House from './views/House/House';

import './websockets/connection';
import DataProvider from './providers/DataProvider';
import { MessageProvider } from './providers/MessageContext';
import Room from './views/Room/Room';
import MessageContainer from './components/Message/MessageContainer';
import Settings from './views/Settings/Settings';
import ConnectionProvider from './providers/ConnectionProvider';

const App = () => {
   return (
      <MessageProvider>
         <Router>
            <Routes>
               <Route
                  path='/'
                  element={<Dashboard />}
               />
               <Route
                  path='/house'
                  element={
                     <ConnectionProvider>
                        <DataProvider>
                           <House />
                        </DataProvider>
                     </ConnectionProvider>
                  }
               />
               <Route
                  path='/house/:section_id'
                  element={
                     <ConnectionProvider>
                        <DataProvider>
                           <Room />
                        </DataProvider>
                     </ConnectionProvider>
                  }
               />
               <Route
                  path='/settings'
                  element={<Settings />}
               />
            </Routes>
         </Router>
         <MessageContainer />
      </MessageProvider>
   );
};

export default App;
