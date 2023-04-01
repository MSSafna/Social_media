import React from 'react'
import { Link } from 'react-router-dom'
import Avatar from '../Avatar/Avatar'

function ProfilePosts() {
  return (
    <div className="bg-white shadow-md shadow-gray-300 rounded-md mb-4 ml-5 overflow-hidden w-4/3 -ml-1">
      <div className="flex gap-2  ">
        <Link to="/profile">
          <div className="mx-2 my-2 ">
            <Avatar />
          </div>
        </Link>
        <div className="ml-2 -ml-2 mt-2 flex relative">
          <a href=" ">
            <span className="font-semibold ">safna</span>
            <span className="pl-2">shared a post</span>
            <p className="text-gray-500 text-sm ">1hr</p>
          </a>
          <div className='flex justify-end w-96 ml-72 cursor-pointer  '>
            <img src="https://res.cloudinary.com/do4my2sxk/image/upload/v1680330682/xwziqw61qic7pbxaiylt.png" alt="" />
          </div>
        </div>

      

      
    </div>
    </div>
  )
}

export default ProfilePosts
