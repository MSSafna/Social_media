/* eslint-disable no-underscore-dangle */
/* eslint-disable no-shadow */
/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable no-unused-expressions */
import React, { useEffect, useContext, useState } from 'react';
import { useCookies } from 'react-cookie';
import { Outlet } from 'react-router-dom';

import { UseruseContext } from './Context';

function CheckToken() {
  const { userDetails, setUserDetails } = UseruseContext();
  const [cookies] = useCookies([]);
  const [loading, SetLoading] = useState(true);

  useEffect(() => {
    const checkAuth = () => {
      try {
        setUserDetails(cookies.jwt);
      } catch (err) {
        console.log(err);
      } finally {
        SetLoading(false);
      }
    };
    checkAuth();
    // localStorage.setItem('userID', userDetails.id._id);
    // !userDetails?.jwt ? checkAuth() : SetLoading(false);
  }, []);

  return (
    <>
      {
          loading
            ? <p>Loading ....</p>
            : <Outlet />
     }
    </>
  );
}

export default CheckToken;
