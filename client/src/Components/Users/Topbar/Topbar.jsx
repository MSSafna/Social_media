/* eslint-disable react/button-has-type */
/* eslint-disable no-unused-vars */
import React from 'react';
import SearchIcon from '@mui/icons-material/Search';
import PersonIcon from '@mui/icons-material/Person';
import ChatIcon from '@mui/icons-material/Chat';
import CircleNotificationsIcon from '@mui/icons-material/CircleNotifications';
import { Link } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router';
import Avatar from '../Avatar/Avatar';

function Topbar() {
  const navigate = useNavigate();

  const [cookies, setCookie, removeCookie] = useCookies([]);

  const logout = (() => {
    removeCookie('jwt');
    navigate('/');
  });
  return (
    <div className=" h-16 w-full bg-socialBlue flex item-center sticky top-0  z-index: 999  ">
      <div className=" flex-row basis-1/4 mt-3">

        <span className="text-3xl ml-2 font-bold text-white cursor-pointer "><Link to="/home">Book my time</Link></span>

      </div>
      <div className="flex-row basis-2/6 mt-3">
        <div className=" w-full h-8 bg-white rounded-full flex text-center ">
          <SearchIcon className="text-xs ml-10 " />
          <input
            placeholder="Search for friend, post or video"
            className="focus:outline-none w-1/2 "
          />
        </div>
      </div>
      <div className="flex flex-row basis-1/4 text-center justify-center text-white mt-3">
        <div className="mr-10 text-xl cursor: pointer ml-5">
          <span className="mr-10 text-xl cursor: pointer ">Homepage</span>
          <span className="mr-10 text-xl cursor: pointer">Timeline</span>
        </div>
        <div className="flex">
          <div className="mr-8 cursor:pointer position:relative">

            <PersonIcon />
            <span className=" w-4 h-4 rounded-full text-white position-absolute -mt-8 flex item center justify-center text-xs ml-4 bg-red-500/100">1</span>

          </div>
          <div className="mr-8 cursor:pointer position:relative">
            <ChatIcon />
            <span className=" w-4 h-4 rounded-full text-white position-absolute -mt-8 flex item center justify-center text-xs ml-4 bg-red-500/100">2</span>
          </div>
          <div className="mr-8 cursor:pointer position:relative">
            <CircleNotificationsIcon />
            <span className=" w-4 h-4 rounded-full text-white position-absolute -mt-8 flex item center justify-center text-xs ml-4 bg-red-500/100">1</span>
          </div>
        </div>
      </div>
      <div>
        <button className=" text-white mt-3 ml-2 text-xl" onClick={logout}>Logout</button>
      </div>
      <div className="my-1 ml-1">
        <Avatar />
      </div>
    </div>
  );
}

export default Topbar;
