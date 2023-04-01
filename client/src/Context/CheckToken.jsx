/* eslint-disable no-unused-expressions */
import React from 'react';
import { Navigate, Outlet } from 'react-router';
import { UseruseContext } from './Context';

function CheckToken() {
  const { userDetails } = UseruseContext();

  return (
    !userDetails?.jwt ? <Navigate to="/" /> : <Outlet />

  );
}

export default CheckToken;
