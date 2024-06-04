import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Dashboard from './views/Dashboard/Dashboard';
import House from './views/House/House';

import './websockets/connection';
import DataProvider from './providers/DataProvider';
import { MessageProvider } from './providers/MessageContext';
import MessageContainer from './components/Message/MessageContainer';
import Settings from './views/Settings/Settings';
import ConnectionProvider from './providers/ConnectionProvider';
import Rooms from './views/Rooms/Rooms';
import Login from './views/Login/Login';
import AuthorizedRoute from './components/AuthorizedRoute';

const App = () => {
   return (
      <MessageProvider>
         <Router>
            <Routes>
               <Route
                  path='/'
                  element={<Login />}
               />
               <Route
                  path='/dashboard'
                  element={
                     <AuthorizedRoute>
                        <DataProvider>
                           <Dashboard />
                        </DataProvider>
                     </AuthorizedRoute>
                  }
               />
               <Route
                  path='/house'
                  element={
                     <AuthorizedRoute>
                        <ConnectionProvider>
                           <DataProvider>
                              <House />
                           </DataProvider>
                        </ConnectionProvider>
                     </AuthorizedRoute>
                  }
               />
               <Route
                  path='/house/:section_id'
                  element={
                     <AuthorizedRoute>
                        <ConnectionProvider>
                           <DataProvider>
                              <Rooms />
                           </DataProvider>
                        </ConnectionProvider>
                     </AuthorizedRoute>
                  }
               />
               <Route
                  path='/settings'
                  element={
                     <AuthorizedRoute>
                        <DataProvider>
                           <ConnectionProvider>
                              <Settings />
                           </ConnectionProvider>
                        </DataProvider>
                     </AuthorizedRoute>
                  }
               />
            </Routes>
         </Router>
         <MessageContainer />
      </MessageProvider>
   );
};

export default App;
