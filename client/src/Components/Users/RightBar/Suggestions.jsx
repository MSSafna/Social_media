import React, { useState } from 'react'
import { UseruseContext } from '../../../Context/Context';
import jwtDecode from 'jwt-decode';
import axios from 'axios';
import Avatar from '../Avatar/Avatar';


function Suggestions({ user, message, suggestions }) {
  const { userDetails } = UseruseContext();
  const details = jwtDecode(userDetails.jwt);
  const [state, setState] = useState(false)
  const userId = details.userDetails._id

  const follow = async (followingId) => {
  const res =  await axios.put(`/api/user/${followingId}/follow`, { userId })
  const userName =res.data.username
   alert(`started following ${userName}`)
     suggestions(true)
     setState(!state)
  
  }
  return (

    <div className='w-32'>
      {user && user.map((user) => (
        <div className='mb-3 flex  w-64'>
          <Avatar size='sm' url={user.profilePicture} />
          <div className='m-2 '>{user.username}</div>
          <div className='flex-grow'></div>
          <div className='flex  justify-end'>
            <span className='text-blue-400 font-semibold cursor-pointer m-2 mb-4 ' onClick={() => { follow(user._id) }}>Follow</span>
          </div>
        </div>
      ))}
    </div>

  )
}

export default Suggestions
