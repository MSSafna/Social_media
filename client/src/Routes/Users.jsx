/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable no-unused-expressions */
/* eslint-disable max-len */
/* eslint-disable react/jsx-key */
/* eslint-disable no-unused-vars */
import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  redirect,
} from 'react-router-dom';
import { useCookies, useEffect } from 'react-cookie';
import Login from '../Pages/users/Login/Login/Login';
import Signup from '../Pages/users/Signup/Signup/Signup';
import Profile from '../Pages/users/Profile/Profile';
import Home from '../Pages/users/Homepage/Home';
import CheckToken from '../Context/CheckToken';

function Users() {
  const [cookies] = useCookies();
  return (
    <div>
      <Router>
        <Routes>
          {/* <Route exact path='/home' element={<Sidebar props={<HomePage/>}/>} ></Route> */}
          {/* <Route  extact path="/home" element={[<Topbar/>,<Sidebar props={<HomePage/>}/>]} /> */}

          {/* <Route
            path="/"
            element={() => {
              cookies.jwt ? <Login /> : '';
            }}
          /> */}
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<CheckToken />}>
            <Route path="/home" element={<Home />} />
          </Route>

          <Route path="/signup" element={<Signup />} />

          <Route path="/profile" element={<CheckToken />}>

            <Route path="/profile" element={<Profile />} />
          </Route>
          {/* <Route path="/home" element={<CheckToken />} /> */}
          {/* <Route path='/profile' element={[<Header/>,<Sidebar props={<Profile/>}/>]} /> */}

        </Routes>
      </Router>
    </div>
  );
}

export default Users;
