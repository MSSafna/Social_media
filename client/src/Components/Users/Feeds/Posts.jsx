
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import axios from 'axios';
import { MdSend } from 'react-icons/md';
import jwtDecode from 'jwt-decode';
import Avatar from '../Avatar/Avatar';
import Comment from './Comment';
import InputEmoji from 'react-input-emoji';

function Posts(props) {
  console.log(props, 'props');
  const {
    imageName, caption, createdAt, likes, comments,
  } = props.image;

  const userId = props.image.userId._id


  const [like, setLike] = useState(likes.length);
  const [isLike, setISLike] = useState(false);
  const [open, setOpen] = useState(false);
  const [comment, setComment] = useState([]);
  const [displayComment, setDisplayComment] = useState([]);
  const [count, setCount] = useState(0);
  const [typeComment, setTypeComment] = useState('')
  const [optionDisplay, setOptionDisplay] = useState(false)


  const now = moment();
  const someDate = moment(createdAt);
  const Time = someDate.from(now);
  const userDetails = jwtDecode(JSON.parse(localStorage.getItem('jwt')));
  const user = userDetails.userDetails._id;


  useEffect(() => {
    setISLike(likes.includes(user));
  }, [user, likes]);

  const viewComment = async () => {
    try {
      console.log('emterrr');
      setOpen(!open);
      console.log('open', open);
      displayComment.length > 0 && setDisplayComment([])
      displayComment.length > 0 && setCount(0)
      const allComments = await axios.get(`/api/posts/${props.image._id}/getcomment`);
      console.log(allComments.data, 'allcomments');
      setComment(allComments.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    const itemsToDisplay = comment.slice(0, count * 3);
    setDisplayComment(itemsToDisplay);
    setCount(count + 1);
    return () => {

    };
  }, [comment]);


  const viewMore = (() => {
    const itemsToDisplay = comment.slice(0, count * 3);
    setDisplayComment(itemsToDisplay);
    setCount(count + 1);
  });
  const getComment = (comment) => {
    setTypeComment(comment)
  }

  const submitComment = (async (event) => {
    event.preventDefault();
    try {
      const newComment = await axios.post(`/api/posts/${props.image._id}/comment`, { userId: user, comment: typeComment });
      setComment([newComment.data, ...comment])
      setOpen(true)
      setTypeComment('')
    } catch (error) {
      console.log(error);
    }
  });

  const likeHandler = (() => {
    try {
      axios.put(`/api/posts/${props.image._id}/like`, { userId: user });
    } catch (error) {
      console.log(error);
    }
    setLike(isLike ? like - 1 : like + 1);
    setISLike(!isLike);
  });

  const handlePost = (async (event) => {
    const postId = props.image._id
    const elementId = event.target.parentNode.getAttribute('id');
    if (elementId == 'delete') {
      const confirmed = window.confirm("Are you sure you want to delete this post?")
      if (confirmed) {
        const response = await axios.delete(`api/posts/${postId}/deletepost`, { userId: user })

      }
    }
  })

  return (
    <div className="bg-white shadow-md shadow-gray-300 rounded-md mb-4 ml-5 overflow-hidden w-4/3 ">
      <div className="flex gap-2  ">
        <Link to="/profile">
          <div className="mx-2 my-2 ">
            <Avatar />
          </div>
        </Link>
        <div className="ml-2 -ml-2 mt-2 flex relative">
          <a href=" ">
            <span className="font-semibold ">{props.image.userId.username}</span>
            <span className="pl-2">shared a post</span>
            <p className="text-gray-500 text-sm ">{Time}</p>
          </a>
          <div className='flex justify-end w-96 ml-72 cursor-pointer  '>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" onClick={() => setOptionDisplay(!optionDisplay)} viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM12.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM18.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
            </svg>
          </div>
        </div>
        <div className='flex bg-indigo-500  justify-end mt-8'>
          {optionDisplay &&
            <div className=' w-1/6 bg-white shadow-md shadow-gray-300 rounded-md pb-2  absolute'>
              <div className='flex'>
                <p className='ml-5 mt-3 cursor-pointer' id='delete' onClick={handlePost}>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" id='delete' viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 inline-block">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                  </svg>
                  <span className=' ml-2'>Delete</span>
                </p>

              </div>
              {userId != user &&
                <div className='flex'>
                  <p className='ml-5 mt-3 mb-2 cursor-pointer'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6  inline-block">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M3 3v1.5M3 21v-6m0 0l2.77-.693a9 9 0 016.208.682l.108.054a9 9 0 006.086.71l3.114-.732a48.524 48.524 0 01-.005-10.499l-3.11.732a9 9 0 01-6.085-.711l-.108-.054a9 9 0 00-6.208-.682L3 4.5M3 15V4.5" />
                    </svg>
                    <span className=' ml-2'>
                      Report
                    </span>
                  </p>
                </div>
              }
            </div>}
        </div>
      </div>







      {/* <p className="text-gray-500 text-sm ">{Time}</p> */}

      <div className="mx-2 ">

        <p className="my-3 text-lg">
          {caption || null}
        </p>
        <div className="  flex  overflow-hidden  items-center">
          {imageName ? <img src={imageName} alt="" className=" w-full  max-h-96  " /> : null}
        </div>
        <div className='mt-10'>

          <hr className=" h-1  bg-gray-100 border-0 rounded  dark:bg-gray-700" />
        </div>
        <div className=" mt-2 flex gap-1  ">

          <button className="flex  item-center gap-1 focus:outline-none " onClick={likeHandler}>
            {!isLike
              && <img src="images/Like.png" className="w-8 cursor-pointer  border-none" alt="like" />}

            {isLike
              && <img src="images/likePost.png" className="w-8 cursor-pointer  border-none" alt="like" />}

            <div className="mt-4 border-none">
              {like}
              {' '}
              Likes
            </div>
          </button>
          <div className='ml-10 mt-3 flex items-center'>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="M8.625 9.75a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375m-13.5 3.01c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.184-4.183a1.14 1.14 0 01.778-.332 48.294 48.294 0 005.83-.498c1.585-.233 2.708-1.626 2.708-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" />
            </svg>
            <span className="ml-2 cursor-pointer" onClick={viewComment}>
              Comments
            </span>
          </div>

        </div>
        <div>
          {open && displayComment.length > 0 && <div className=' h-4/5 ' >
            {open
              && displayComment.map((data) => (
                <Comment key={data._id} value={data} />
              ))}
          </div>
          }
        </div>
        <div />
        {open && comment.length > 3 && <p onClick={viewMore} className='cursor-pointer text-end mr-20'>View more</p>}
      </div>
      <div class="relative flex  ">
        <InputEmoji onChange={getComment} value={typeComment} type="Type comment" id="search" className="inline-block w-96 p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search" required />
        <div className='flex justify-center items-center cursor-pointer'>
          {typeComment && <MdSend onClick={submitComment} className=' mr-10  text-green-700' size={25} />}
        </div>

      </div>


    </div>

  );
}

export default Posts;
