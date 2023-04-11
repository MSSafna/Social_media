/* eslint-disable react/void-dom-elements-no-children */
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Avatar from '../Avatar/Avatar';
import { useNavigate } from 'react-router';
import { UseruseContext } from '../../../Context/Context';
import jwtDecode from 'jwt-decode';
import Suggestions from './Suggestions';

function Right() {
  const { userDetails } = UseruseContext();
  const [users, searchUser] = useState([]);
  const [message, setMessage] = useState(false);
  const[userSuggestions,setSuggestions]=useState('')
  const[displaySuggestion,setDisplaysuggestion]=useState(false)
  const [search,setSearch]=useState(false)

  const[event,setEvent]=useState('')
  
  const user = jwtDecode(userDetails.jwt);
  const userId = user.userDetails._id;
  
  const handleSearch = async (event) => {
    const result = await axios.get(`/api/user/searchuser?value=${event.target.value}&userId=${userId}`,)
    console.log('result',result);
    if (result.data.userNotFound) {
      setMessage(true);
      searchUser([]);
      console.log(message, 'messsafge');
    } else {
      setMessage('');
      searchUser(result.data);
      console.log(users, 'serach');
    }
  };
 
  useEffect((event)=>{

    handleSearch(event)
  },[search])

  const PropsSearch=(boolean)=>{
    setSearch(boolean)
  }
 
  const handleSuggestion=(boolean)=>{
    setDisplaysuggestion(boolean)

  }


useEffect(()=>{
  const getSuggestions=async ()=>{
    const response= await axios.get(`/api/user/getsuggestions/${userId}`)
    setSuggestions(response.data)
   
  }
  setDisplaysuggestion(false)
  getSuggestions()
},[displaySuggestion])

  return (
    <>
      {/* <div className="pt-4 px-5 relative ">
        <input
          type="text"
          className="w-1/6 bg-slate-200 h-10 outline-none text-center rounded-md fixed"
          placeholder="Search your friend .."
          onChange={handleSearch}
        />
        {message && (
          <div className=" px-5  bg-white shadow-md mt-12  w-64 flex fixed h-9 ">
            no user found
          </div>
        )}
        <div className="mt-12 fixed">

          {users
            && users.map((user) => (
              <div className=" px-5  bg-white shadow-md mt-5 w-64 flex cursor-pointer " onClick={() => navigate(`/profile/${user._id}`)}>
                <div className='mb-2'>
                  <Avatar size="sm" > </Avatar>
                </div>
                <div className='ml-4 flex justify-center'>
                  {user.username}
                </div>
              </div>
            ))}
        </div>
      </div> */}

      <div className=" pt-10   rounded-md  w-1/6 ml-8 ">

        <input
          type="text"
          className="w-1/6 bg-slate-200 h-10 outline-none text-center rounded-md fixed -mt-10"
          placeholder="Search your friend .."
          onChange={handleSearch}
        />
         <div>
          {!users[0] && !message && 
         
          <Suggestions  user={userSuggestions} suggestions={handleSuggestion}/>
          }
        
          {users &&  
          <Suggestions   user={users} message={message} suggestions={PropsSearch} />
         
          }
         </div>

      </div> 
    </>
  );
}

export default Right;
