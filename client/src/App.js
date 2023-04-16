import React, { useState } from 'react';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import NavTabs from './components/NavBar';
import Home from './routes/Home';
import MyEvents from './routes/MyEvents';
import MyTasks from './routes/MyTasks';
import Event from './routes/Event';
import SignUp from './components/SignUp';
import LoginForm from './components/LoginForm';
import CreateEvent from './components/CreateEvent';
import CreateTask from './components/CreateTask';
// FOR TESTING ONLY - DELETE LATER (also delete Route path - line 23)
import TestEnv from './routes/testEnv';

import { Route, Routes } from 'react-router-dom';

const client = new ApolloClient({
  uri: '/graphql',
  cache: new InMemoryCache(),
});

const App = () => {
  const [currentPage, setCurrentPage] = useState('Home');

  const handlePageChange = (page) => setCurrentPage(page);

  return (
    <ApolloProvider client={client}>
      <NavTabs currentPage={currentPage} handlePageChange={handlePageChange} />
      <Routes>
       <Route path="/" element={<Home />} />
       <Route path="/myevents" element={<MyEvents />} />
       <Route path="/mytasks" element={<MyTasks />} /> 
       <Route path="/event/:eventId" element={<Event />} />
       <Route path="/testing" element={<TestEnv />} />
       <Route path="/signup" element={<SignUp />} />
       <Route path="/loginform" element={<LoginForm />} />
       <Route path="/CreateEvent" element={<CreateEvent />} />
       <Route path="/CreateTask" element={<CreateTask />} />
     </Routes>
    </ApolloProvider>
  );
}

export default App;