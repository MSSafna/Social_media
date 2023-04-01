/* eslint-disable react/void-dom-elements-no-children */
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Avatar from '../Avatar/Avatar';

function Right() {
  const [users, searchUser] = useState([]);
  const [message, setMessage] = useState(false);

  const handleSearch = async (event) => {
    const result = await axios.get(`/api/user/searchuser?value=${event.target.value}`);
    console.log(result, 'result');
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

  useEffect(() => {
    console.log(message, 'message');
  }, [message]);

  return (
    <>
      <div className="pt-4 px-5 relative ">
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
        <div className="mt-12">

          {users
          && users.map((user) => (
            <div className=" px-5  bg-white shadow-md mt-5 w-64 flex ">
              <Avatar size="sm"> </Avatar>
              <div className='ml-4'>
              {user.field}
              <div className='ml-1'>
              {user.username}

              </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* <div className=" pt-10 bg-white shadow-md shadow-gray-300 rounded-md  w-1/6">
        hhkkh
      </div> */}
    </>
  );
}

export default Right;
