import React, { useState } from 'react';
import NavTabs from './components/NavBar';
import Home from './routes/Home';
import MyEvents from './routes/MyEvents';
import MyTasks from './routes/MyTasks';
import SignUp from './components/SignUp';
import LoginForm from './components/LoginForm';
// FOR TESTING ONLY - DELETE LATER (also delete Route path - line 23)
import TestEnv from './routes/testEnv';

import { Route, Routes } from 'react-router-dom';

const App = () => {
  const [currentPage, setCurrentPage] = useState('Home');

  const handlePageChange = (page) => setCurrentPage(page);

  return (
    <div>
      <NavTabs currentPage={currentPage} handlePageChange={handlePageChange} />
      <Routes>
       <Route path="/" element={<Home />} />
       <Route path="/myevents" element={<MyEvents />} />
       <Route path="/mytasks" element={<MyTasks />} /> 
       <Route path="/testing" element={<TestEnv />} />
       <Route path="/signup" element={<SignUp />} />
       <Route path="/loginform" element={<LoginForm />} />
     </Routes>
    </div>
  );
}

export default App;