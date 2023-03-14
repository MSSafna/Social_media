/* eslint-disable array-callback-return */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-underscore-dangle */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/jsx-no-undef */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
/* eslint-disable react/button-has-type */
/* eslint-disable max-len */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable no-unused-vars */
// eslint-disable-next-line linebreak-style
import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import axios from 'axios';
import Avatar from '../Avatar/Avatar';

function Posts(props) {
  const {
    imageName, caption, createdAt, username, likes,
  } = props.image;
  const [like, setLike] = useState(likes.length);
  const [isLike, setISLike] = useState(false);
  const [open, setOpen] = useState(false);
  const [comment, setComment] = useState([]);
  const now = moment();
  const someDate = moment(createdAt);
  const Time = someDate.from(now);
  const user = localStorage.getItem('userId');
  const inputRef = useRef();

  useEffect(() => {
    setISLike(likes.includes(user));
  }, [user, likes]);

  const viewComment = (async () => {
    try {
      const allComments = await axios.get(`/api/posts/${props.image._id}/getComment`);
      setComment(allComments);
    } catch (error) {
      console.log(error);
    }
    setOpen(!open);
  });
  const submitComment = ((event) => {
    event.preventDefault();
    try {
      axios.post(`/api/posts/${props.image._id}/comment`, { userId: user, comment: inputRef.current.value });
      inputRef.current.value = '';
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
  return (
    <div className="bg-white shadow-md shadow-gray-300 rounded-md mb-4 ml-5 overflow-hidden w-4/3">
      <div className="flex gap-2 ">
        <Link to="/profile">
          <div className="mx-2 my-2 ">
            <Avatar />
          </div>
        </Link>
        <div className="ml-2 -ml-2 mt-2">
          <a href="">
            <span className="font-semibold ">{props.image.userId.username}</span>
            <span className="pl-2">shared a post</span>
          </a>
          <p className="text-gray-500 text-sm ">{Time}</p>
        </div>
      </div>
      <div className="mx-2">

        <p className="my-3 text-sm">
          {caption || null}
        </p>
        <div className="  flex  overflow-hidden  items-center">
          {imageName ? <img src={imageName} alt="" className=" w-full  max-h-96  " /> : null}
        </div>
        <div className=" mt-5 flex gap-1  ">
          <button className="flex item-center focus:outline-none">
            <img src="images/heart.png" alt="heart" className="cursor-pointer w-10 h-10 " />
          </button>
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
          <div
            className="grow text-end mt-4 cursor-pointer"
            onClick={viewComment}
          >
            comments
            {open && (
              comment.data.map((data) => (

                <div className=" grid justify-start  ">
                  <div className="flex mt-5 ">
                    <Avatar size="sm" />
                    <div className="border bg-slate-300 mx-5  rounded-md h-24 w-96">
                      <span className=" flex font-semibold justify-start ">{data.userId.username}</span>
                      <h1 className="flex justify-start ml-5">{data.comment}</h1>
                    </div>
                  </div>
                </div>

              ))
            )}
          </div>
        </div>
        <div />
      </div>
      <div className="mt-4 flex gap-3 pb-5">
        <div className="ml-2 ">
          <Avatar />
        </div>
        <form className="border grow rounded-full w-full h-12 mr-4" onSubmit={submitComment}>
          <div>
            <input className=" p-2 h-12 w-full rounded-full focus:outline-[#48a7c7] pb-3" placeholder="Leave a comment" ref={inputRef} />
          </div>
        </form>
      </div>

    </div>

  );
}

export default Posts;
