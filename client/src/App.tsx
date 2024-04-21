import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Dashboard from './views/Dashboard/Dashboard';
import House from './views/House/House';

import './websockets/connection';

const App = () => {
   return (
      <Router>
         <Routes>
            <Route
               path='/'
               element={<Dashboard />}
            />
            <Route
               path='/house'
               element={<House />}
            />
         </Routes>
      </Router>
   );
};

export default App;
