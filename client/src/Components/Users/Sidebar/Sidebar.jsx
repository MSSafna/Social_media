
import React, { useState, useEffect, } from 'react';
import { useNavigate, useParams } from 'react-router';
import { Cookies, useCookies } from 'react-cookie';
import Cards from '../Card/Cards';
import More from '../More/More';
import { UseruseContext } from '../../../Context/Context';
import { Link } from 'react-router-dom';
import jwtDecode from 'jwt-decode';


function Sidebar(props) {

  const navigate = useNavigate();
  const {id} = useParams()
  
  const [cookies, setCookie, removeCookie] = useCookies([]);
  const { userDetails, setUserDetails } = UseruseContext();

  const user = jwtDecode(userDetails.jwt);
  const userId = user.userDetails._id;

  const non_activeElements = 'block gap-2 flex py-3  hover:bg-orange-800 hover:text-white  -mx-1 px-1 rounded-md transition-all hover:scale-110 hover:shadow-gray-300 mt-2 ';
  const activeElements = 'block flex gap-2 py-3  bg-orange-900 text-white rounded-md shadow-md -mx-4 px-4';
   
  const {pathname}=location
  console.log(pathname, "pathnamee")
  
  const logout = (() => {
    removeCookie('jwt');
    localStorage.removeItem('jwt');
    setUserDetails('');
    navigate('/');
  });
  return (
    <div className="flex">

      <div className="w-64 mt-2    ">
        <Cards>
          

          <p
            className={pathname == '/home'? activeElements : non_activeElements}
            onClick={() => {
              navigate('/home');
            }}
            >
            <svg xmlns="http://www.w3.org/2000/svg" fiflexll="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 cursor-pointer">
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
            </svg>
            <span className="cursor-pointer">Home</span>
           
          </p>

          <p
             className={pathname == `/profile/${userId}`? activeElements : non_activeElements}
            onClick={()=>{
              navigate(`/profile/${userId}`)
            }}
         
            
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 cursor-pointer">
              <path stroke-linecap="round" stroke-linejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span className="cursor-pointer">My Profile</span>

          </p>

          <p
           className={pathname == '/notification'? activeElements : non_activeElements}
           onClick={()=>{
             navigate('/notification')
           }}
            
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0M3.124 7.5A8.969 8.969 0 015.292 3m13.416 0a8.969 8.969 0 012.168 4.5" />
            </svg>
            Notification

          </p>

          <p
           className={pathname == '/chat'? activeElements : non_activeElements}
           onClick={()=>{
             navigate('/chat')
           }}
            
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 9.75a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375m-13.5 3.01c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.184-4.183a1.14 1.14 0 01.778-.332 48.294 48.294 0 005.83-.498c1.585-.233 2.708-1.626 2.708-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" />
            </svg>
            Chats

          </p>
          <More />
          <button className="block gap-2 flex py-3 " onClick={logout}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
            </svg>
            Logout

          </button>
        </Cards>
      </div>

      <div className="mr-8 w-3/5">
        {props.props}
      </div>

    </div>

  );
}

export default Sidebar;
