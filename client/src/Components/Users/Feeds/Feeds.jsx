import { useState, useEffect } from 'react';
import axios from 'axios';
import jwtDecode from 'jwt-decode';
import Message from './Message';
import Posts from './Posts';
import { UseruseContext } from '../../../Context/Context';
import Avatar from '../Avatar/Avatar';
import Right from '../RightBar/Right';
import { useNavigate } from 'react-router';

function Feeds() {
  const [posts, setPosts] = useState([]);
  const { userDetails } = UseruseContext();
  const user = jwtDecode(userDetails.jwt);
  const userId = user.userDetails._id;
  const[getPosts,setGetPosts]=useState(false)
  const[currentUser, setCurrentUser] = useState('')
  const navigate =useNavigate()
   let count=0

  const handleDataFromChild = (data) => {
     setPosts([data.data,...posts]);
  };

  useEffect(()=>{
    const userDetails=(async()=>{
      const result= await axios.get(`/api/user/getuserdetails/${userId}`)
      setCurrentUser(result.data)
    })
    userDetails()
  },[userId])

  useEffect(() => {
    count++
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
        setGetPosts(false)
    });
    fetchPost();  
    console.log(count,'count');
  }, [getPosts]);

  const handlePost=(boolean)=>{
    setGetPosts(boolean)
  }

  return ( 
   <div className='flex '>
    <div className='w-4/6  ml-8 ' >
      <Message onData={handleDataFromChild} />
      <div >   
      {posts.map((post) => (
          <Posts key={post._id} image={post}  handleGetPost={handlePost} />
        ))}
      </div>
    </div>
    <div className='  ml-10 ' >
      <div className='flex ' onClick={()=>{
      navigate(`/profile/${userId}`)
      }}>       
      <Avatar size={12} url={currentUser.profilePicture}/>
      <span className='my-2 ml-2  font-semibold '>{currentUser.username}</span>
      </div>
     <h1 className='my-4  text-lg text-gray-400'>Suggestions for you</h1>
     <Right />
    </div>
    </div>
   
  );
}

export default Feeds;
