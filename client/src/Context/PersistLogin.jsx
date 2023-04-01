/* eslint-disable no-unused-expressions */
import React, { useState, useEffect } from 'react';
import { Outlet } from 'react-router';
import { UseruseContext } from './Context';

function PersistLogin() {
  const { userDetails, setUserDetails } = UseruseContext();
  const [loading, SetLoading] = useState(true);

  useEffect(() => {
    function refresh() {
      try {
        const local = JSON.parse(localStorage.getItem('jwt'));
        if (local) {
          setUserDetails({ jwt: local });
        }
      } catch (err) {
        console.log(err);
      } finally {
        SetLoading(false);
      }
    }
    !userDetails?.jwt ? refresh() : SetLoading(false);
  }, []);

  return (
    loading ? <p>loading..</p> : <Outlet />
  );
}

export default PersistLogin;
