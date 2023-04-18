/* eslint-disable no-underscore-dangle */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import Sidebar from '../../../Components/Users/Sidebar/Sidebar';
import Feeds from '../../../Components/Users/Feeds/Feeds';
import Topbar from '../../../Components/Users/Topbar/Topbar';
import Right from '../../../Components/Users/RightBar/Right';
import { UseruseContext } from '../../../Context/Context';

function Home() {
  const { userDetails } = UseruseContext();
  // eslint-disable-next-line no-unused-vars
  const navigate = useNavigate();

  useEffect(() => {
    if (!userDetails.jwt) {
      navigate('/');
    }
  }, []);

  return (
    <div >

      <Feeds/>
    </div>
  );
}

export default Home;
