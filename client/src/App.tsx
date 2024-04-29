import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Dashboard from './views/Dashboard/Dashboard';
import House from './views/House/House';

import './websockets/connection';
import DataProvider from './providers/DataProvider';
import { MessageProvider } from './providers/MessageContext';
import MessageContainer from './components/Message/MessageContainer';

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
                     <DataProvider>
                        <House />
                     </DataProvider>
                  }
               />
            </Routes>
         </Router>
         <MessageContainer />
      </MessageProvider>
   );
};

export default App;
