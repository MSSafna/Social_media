/* eslint-disable react/button-has-type */
import React from 'react';
import Avatar from '../Avatar/Avatar';

function ProfileBanner() {
  return (
    <div className="relative">
      <div className="h-64 flex   items-center rounded-xl ">
        <img src="images/filmbanner.jpg" alt="" className="w-full h-64  rounded-xl" />
      </div>
      <div className="absolute top-0   mt-44 bg-white rounded-full pt-1 px-1 h-32">
        <Avatar size="lg" />
      </div>

      <div className="bg-white shadow-md shadow-gray-300 rounded-md overflow-hidden grow h-28 ">
        <div className="text-end mt-4 mr-4">
          <button className="bg-profileButton text-white text-sm px-3 h-8 rounded-md -mb-4 "> Add Post</button>
          <button className="ml-4 bg-profileButton text-white text-sm px-3 h-8 rounded-md">Edit Profile</button>
        </div>
        <h1 className="font-bold text-2xl ml-9 mt-1">ketty</h1>
        <h1 className=" ml-9 text-slate-500 ">Producer</h1>
        <div className="pb-32 h-2 text-end" />
      </div>

    </div>
  );
}

export default ProfileBanner;
