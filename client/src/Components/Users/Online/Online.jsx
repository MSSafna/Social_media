import React,{useState, useEffect} from 'react'
import Avatar from '../Avatar/Avatar'
import axios from 'axios'

function Online({onlineUsers, currentId, setCurrentChat}) {
  const [friends, setFriends] = useState([])
  const [onlineFriends, setOnlineFriends] = useState([])

  useEffect(() => {
    const getFriends = async () => {
     const res = await axios.get(`/api/user/friends/${currentId}`)
     setFriends(res.data)

    }
    getFriends()
  },[currentId])
 
  useEffect(() => {
    setOnlineFriends(friends.filter((f) => onlineUsers?.includes(f._id)))
  },[friends])

 const handleClick=async (users) =>{
 
   try{
   const res = await axios.get(`/api/conversation/find/${currentId}/${users._id}`)
   console.log(res);
   setCurrentChat(res.data)
   }catch(err){
    console.log(err);
   }
 }
  return (
  <div>
    {onlineFriends.map((o) => (
    
    <div className='relative' onClick={() => handleClick(o)}>
        <div className='flex   w-40 p-4'>
         <Avatar  url={o.profilePicture}/>
        <span className='p-2'>{o.username}</span>
        </div>
        <div className='absolute rounded-full ml-2 bg-green-500 w-3 h-3 bottom-4 left-10 '></div>
        </div>
       ))} 
  </div>



  )
}

export default Online
