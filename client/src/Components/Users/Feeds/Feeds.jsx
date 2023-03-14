/* eslint-disable import/no-cycle */
/* eslint-disable no-underscore-dangle */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable linebreak-style */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useState, useEffect } from 'react';
import axios from 'axios';
import jwtDecode from 'jwt-decode';
import Message from './Message';
import Posts from './Posts';
import { UseruseContext } from '../../../Context/Context';

function Feeds() {
  const [posts, setPosts] = useState([]);
  const { userDetails, setUserDetails } = UseruseContext();
  const user = jwtDecode(userDetails);
  localStorage.setItem('userId', user.id._id);
  useEffect(() => {
    const fetchPost = (async () => {
      const userID = localStorage.getItem('userId');
      const res = await axios.get(`/api/posts/timeline/${userID}`);
      console.log(res, 'res');
      setPosts(res.data.result);
    });
    fetchPost();
  }, []);
  return (
    <div>
      <Message />
      <div>
        {posts.map((post) => (
          <Posts key={post._id} image={post} />
        ))}
      </div>
    </div>
  );
}

export default Feeds;
