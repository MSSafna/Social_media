import React,{useEffect,useState} from 'react'
import Avatar from '../Avatar/Avatar'
import axios from 'axios'


function Conversation({conversation,currentUser}) {
  const[user,setUser]=useState('')
  useEffect(()=>{
    const friendId=conversation.members.find((m) => m !== currentUser)
    const getUser=async ()=>{
    const response= await  axios.get(`/api/user/getuserdetails/${friendId}`)
    setUser(response.data)
   
    }
    getUser()
  },[conversation,currentUser])
  return (
    <div className=' hover:bg-gray-300 my-4 '>
        <div className='mx-2 my-2  flex py-1  '>
        <Avatar url={user.profilePicture} />
        <span className='mx-2 my-2 font-semibold '>{user.username}</span>
        </div>
    </div>
  )
}

export default Conversation
