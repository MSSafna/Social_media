import React, { useEffect, useState } from 'react';
import axios from 'axios';
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
         <div >
          {!users[0] && !message && 
          <Suggestions  user={userSuggestions} suggestions={handleSuggestion}/>
          }
         </div>
  );
}

export default Right;
