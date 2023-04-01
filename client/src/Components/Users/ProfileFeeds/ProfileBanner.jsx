/* eslint-disable react/button-has-type */
import React, { useEffect, useState } from 'react';
import Avatar from '../Avatar/Avatar';
import Feeds from '../Feeds/Feeds';
import { Card } from '@chakra-ui/react';
import ProfilePosts from './ProfilePosts';
import {  CardHeader, CardBody, CardFooter , Text} from '@chakra-ui/react'
import axios from 'axios';
import { UseruseContext } from '../../../Context/Context';
import jwtDecode from 'jwt-decode';
import Posts from '../Feeds/Posts';


function ProfileBanner() {
  const [userPosts,setUserPosts]=useState([])
  const { userDetails } = UseruseContext();
  const user = jwtDecode(userDetails.jwt);
  const userId = user.userDetails._id;
   const jwtToken=localStorage.getItem('jwt')
   const jwt = JSON.parse(jwtToken);

   useEffect(()=>{
    const fetchPost=async ()=>{
      const userPost=await axios.get(`/api/user/${userId}`,{
        headers:{
          Authorization: `Bearer ${jwt}`,
        }
      })
      setUserPosts(userPost.data)
    }
    fetchPost()
   },[])
  
  return (
    <div className="relative ">
      <div className="h-64 flex   items-center rounded-xl ml-5">
        <img src="images/filmbanner.jpg" alt="" className="w-full h-64  rounded-xl" />
      </div>
      <div className="absolute top-0 ml-5  mt-44 bg-white rounded-full pt-1 px-1 h-32">
        <Avatar size="lg" />
      </div>
      <div className="bg-white shadow-md ml-5 shadow-gray-300 rounded-md overflow-hidden grow h-28 ">
        <div className="text-end mt-4 mr-4">
          <button className="bg-profileButton text-white text-sm px-3 h-8 rounded-md -mb-4 "> Add Post</button>
          <button className="ml-4 bg-profileButton text-white text-sm px-3 h-8 rounded-md">Edit Profile</button>
        </div>
        <h1 className="font-bold text-2xl ml-9 mt-1">ketty</h1>
        <h1 className=" ml-9 text-slate-500 ">Producer</h1>
        <div className="pb-32 h-2 text-end" />
      </div>


          <div className='mt-3 '>
         {
          userPosts.map((post)=>(
            <Posts  key={post._id} image={post} />
          ))
         }
          </div>

    </div>
  );
}

export default ProfileBanner;
