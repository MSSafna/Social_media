/* eslint-disable import/no-unresolved */
/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react';
import ProfileBanner from '../../../Components/Users/ProfileFeeds/ProfileBanner';
import Sidebar from '../../../Components/Users/Sidebar/Sidebar';
import Topbar from '../../../Components/Users/Topbar/Topbar';
import { UseruseContext } from '../../../Context/Context';
import { userToken } from '../../../Context/CheckUserToken';

function Profile() {
  // const { userDetails } = UseruseContext();
  // console.log(userDetails, 'jjjjj');
  const verifyUser = userToken();
  useEffect(() => {
    verifyUser();
  }, []);

  return (
    <div>
      <div>
        <Topbar />
        <div className="flex full">
          <Sidebar />
          <div className="grow mt-2  h-64 mx-8 ">
            <ProfileBanner />
          </div>
          <div className="flex " />
        </div>
      </div>
    </div>
  );
}

export default Profile;
