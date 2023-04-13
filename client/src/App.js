import React from 'react';
import Home from './routes/Home';
import MyEvents from './routes/MyEvents';
import MyTasks from './routes/MyTasks';

import { Route, Routes } from 'react-router-dom';

const App = () => {
  return (
   <>
     <Routes>
       <Route path="/" element={<Home />} />
       <Route path="/myevents" element={<MyEvents />} />
       <Route path="/mytasks" element={<MyTasks />} />
     </Routes>
   
   
   </>
  )
}

export default App;