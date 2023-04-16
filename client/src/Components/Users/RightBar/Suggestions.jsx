import React, { useEffect,useState } from 'react'
import { UseruseContext } from '../../../Context/Context';
import jwtDecode from 'jwt-decode';
import axios from 'axios';
import Avatar from '../Avatar/Avatar';
import { useNavigate } from 'react-router';

function Suggestions({ user,message,suggestions }) {

  const { userDetails } = UseruseContext();
  const details=jwtDecode(userDetails.jwt);
  const[state,setState]=useState(false)
  const userId=details.userDetails._id
  const navigate = useNavigate()

  const unfollow=async(unfollowId)=>{
    await axios.put(`/api/user/${unfollowId}/unfollow`,{userId})
    suggestions(true)
    setState(!state)
  }

  const follow=async(followingId)=>{
    await axios.put(`/api/user/${followingId}/follow`,{userId})
    suggestions(true)
    setState(!state)
    
  }
  return (
    
      // <div className=' fixed  w-1/6  '>
      //   {user && user.length > 0 && user.map((user) => (
         
      //   <div className=" w-full h-24 bg-slate-200 rounded-xl z-40 p-1 mt-2  ">

      //     <div className=' w-full h-full bg-white rounded-xl flex bg-indigo-400  ' >

      //       <div className='w-1/3 bg-white rounded-l-xl flex justify-center border-r-4
      //         items-center cursor-pointer' onClick={() => navigate(`/profile/${user._id}`)}>
      //         <div className='w-16 h-16 border-4 	rounded-full flex justify-center items-center overflow-hidden'  >
      //           {/* <img className='w-full h-full' alt="img" /> */}
      //           <Avatar/>
      //         </div>

      //       </div>
             
      //       <div className='w-2/3 flex flex-col justify-center gap-2 items-center bg-orange-200'>
      //         <div className='font-semibold italic text-xl text-white' > {user.username}</div>
      //         {result.length<0 &&  <button className=' hover:shadow-cyan-500/50 hover:bg-blue-400 hover:shadow-white hover:shadow-2xl	 px-1 rounded text-black font-semibold' onClick={()=>{follow(user._id)}} >Follow</button> }
           
      //         {result && result.includes(user._id)? 
      //         <button className=' hover:shadow-cyan-500/50 hover:bg-blue-400 hover:shadow-white hover:shadow-2xl hover:text-white	 px-1 rounded font-semibold' onClick={()=>{unfollow(user._id)}} >Unfollow</button>
      //         : <button className=' hover:shadow-cyan-500/50 hover:bg-green-400 hover:shadow-white hover:shadow-2xl	 hover:text-white px-1 rounded  font-semibold' onClick={()=>{follow(user._id)}} >Follow</button>
      //         }
      //         <div>
      //         </div>
      //       </div>
      //     </div>
             
          
      //   </div>
      //        )) }
      //       {message && 
      //       <div className='w-2/3 flex flex-col justify-center gap-2 items-center '>
      //       <div className='font-semibold italic text-xl text-black' >No user found</div>
      //       <div>
      //       </div>
      //     </div>}
      // </div>


      <div className='w-32'>
  {user && user.map((user) => (
    <div className='mb-3 flex  w-64'>
      <Avatar size='sm' url={user.profilePicture}/>
      <div className='m-2'>{user.username}</div>
      <div className='flex-grow'></div>
      <div className='flex  justify-end'>
        <span className='text-blue-400 font-semibold cursor-pointer m-2 mb-4' onClick={() => {follow(user._id)}}>Follow</span>
      </div>
    </div>
  ))}
</div>



  )
}

export default Suggestions
