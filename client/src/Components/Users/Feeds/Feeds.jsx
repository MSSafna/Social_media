/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable no-underscore-dangle */
import { useState, useEffect } from 'react';
import axios from 'axios';
import jwtDecode from 'jwt-decode';
import Message from './Message';
import Posts from './Posts';
import { UseruseContext } from '../../../Context/Context';

function Feeds() {
  const [posts, setPosts] = useState([]);
  const { userDetails } = UseruseContext();
  const user = jwtDecode(userDetails.jwt);
  const userId = user.userDetails._id;

  useEffect(() => {
    const fetchPost = (async () => {
      const jwtToken = localStorage.getItem('jwt');
      const jwt = JSON.parse(jwtToken);
      const res = await axios.get(
        ` /api/posts/timeLine/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        },
      );
      setPosts(res.data.result);
    });
    fetchPost();
  }, []);
  console.log(posts, 'posts');
  return (
    <div>
      <Message />
      <div>
        {posts.map((post) => (
          <Posts key={post._id} image={post}  />
        ))}
      </div>
    </div>
  );
}

export default Feeds;
