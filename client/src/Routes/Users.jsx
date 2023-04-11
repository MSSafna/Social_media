
import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Routes,
} from 'react-router-dom';
import { useCookies} from 'react-cookie';
import Login from '../Pages/Users/Login/Login';
import Signup from '../Pages/Users/Signup/Signup/Signup';
import Profile from '../Pages/Users/Profile/Profile';
import Home from '../Pages/Users/Homepage/Home';
import CheckToken from '../Context/CheckToken';
import PersistLogin from '../Context/PersistLogin';
import Layout from '../Layout';

function Users() {
  const [cookies] = useCookies();
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/signup" element={<Signup />} />

          <Route path="/" element={<Login />} />
          
          <Route element={<PersistLogin />}>
            <Route element={<CheckToken />}>
              <Route element={<Layout/>}>

              <Route path="/home" element={<Home />} />
              <Route path="/profile/:id" element={<Profile />} />
              </Route>
            </Route>
          </Route>



        </Routes>
      </Router>
    </div>
  );
}

export default Users;
