/* eslint-disable no-underscore-dangle */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router';
import axios from 'axios';
import jwtDecode from 'jwt-decode';
import Sidebar from '../../../Components/Users/Sidebar/Sidebar';
import Feeds from '../../../Components/Users/Feeds/Feeds';
import Topbar from '../../../Components/Users/Topbar/Topbar';
import { UseruseContext } from '../../../Context/Context';

function Home() {
  const { userDetails } = UseruseContext();
  // eslint-disable-next-line no-unused-vars
  const navigate = useNavigate();
  const [cookies, removeCookie] = useCookies([]);
  useEffect(() => {
    const verifyUser = () => {
      if (!cookies.jwt) {
        navigate('/');
      } else {
        axios.post(
          '/api/auth',
          {},
          { withCredentials: true },
        ).then((response) => {
          // eslint-disable-next-line no-unused-vars
          if (!response.data.status) {
            removeCookie('jwt');
            navigate('/');
          }
          const user = jwtDecode(userDetails.jwt);
          localStorage.setItem('userId', user.id._id);
        });
      }
    };
    verifyUser();
  }, [cookies, navigate, removeCookie]);

  return (
    <div>
      <Topbar />
      <div className="flex full">
        <Sidebar />
        <div className="w-3/5 mt-2 ">
          <Feeds />
        </div>
      </div>
    </div>
  );
}

export default Home;
