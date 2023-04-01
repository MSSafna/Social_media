/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-filename-extension */
import axios from 'axios';
import React from 'react';
import { UseruseContext } from './Context';

function RefreshToken() {
  const { setUserDetails } = UseruseContext();
  const refreshToken = (async () => {
    const response = await axios.get('/api/refresh', {
      withCredentials: true,
    });
    setUserDetails(response.data.accessToken);
  });
  return refreshToken;
}

export default RefreshToken;
