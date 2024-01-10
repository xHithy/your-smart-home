import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Sensors from './screens/Sensors';
import Dashboard from './screens/Dashboard';
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
               path='/sensors'
               element={<Sensors />}
            />
         </Routes>
      </Router>
   );
};

export default App;
