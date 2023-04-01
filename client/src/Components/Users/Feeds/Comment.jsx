/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import moment from 'moment';
import Avatar from '../Avatar/Avatar';
import InputEmoji from 'react-input-emoji';
import { MdSend } from 'react-icons/md';
import axios from 'axios';
import jwtDecode from 'jwt-decode';



function Comment({ value }) {
  const [state, setState] = useState(false)
  const [replayState, setReplayState] = useState([])
  const [newReplay, setNewReplay] = useState('')
  const [display, setDisplay] = useState(false)

  const now = moment();
  const someDate = moment(value.createdAt);
  const Time = someDate.from(now);
  const commentId = value._id
  const jwtToken = localStorage.getItem('jwt');
  const userDetails = jwtDecode(jwtToken)
  const userId = userDetails.userDetails._id

  const setReplay = (event) => {
    event.stopPropagation()
    setDisplay(!display)
  }
  const handleInputEmojiClick = (event) => {
    event.stopPropagation()
  }
  const replayComment = (replyComment) => {
    setNewReplay(replyComment)
  }
  const viewReplyInput = (event) => {
    event.stopPropagation()
    setState(!state)
  }
  const submitReplay = async () => {
    try {
      const Replay = await axios.post(`/api/posts/${commentId}/replaycomment`, { userId: userId, postId: value.postId, comment: newReplay })
      const testingReplay = Replay.data;
      console.log(Replay,'Replay');
      setReplayState([...replayState, testingReplay])
      setNewReplay('')
      setState(!state)
    } catch (err) {
      console.log(err);
    }
  }
  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(`/api/posts/${value._id}/replaycomment`);
      console.log(response.data.reverse(), 'replayComment');
      setReplayState(response.data);
    };
    fetchData();
  }, []);

 

  return (
    <div>
      <div className=" grid justify-center overflow-auto  " >
        <div className="flex mt-5">
          <Avatar size="sm" />
          <div className="border mx-5  rounded-md h-24 w-96 " style={{ background: '#f2f2f2' }}>
            <span className=" flex font-semibold justify-start ml-3">{value.userId.username}</span>
            <div className="flex text-xs ml-3">
              {Time}
            </div>
            <h1 className="flex justify-start mt-2 ml-3">{value.comment}</h1>
          </div>
        </div>
        <div className='flex'>
          <span onClick={viewReplyInput} className='ml-16 cursor-pointer'>
            reply
          </span>
          <div className='bg-indigo-500 w-grow'>
         
          </div>
          <div class="border-l border-gray-400 h-4 ml-3 mt-1"></div>
          {replayState.length > 0 ? <p onClick={setReplay} className="ml-3 cursor-pointer">view replay</p> : <p  className="ml-3 text-neutral-400">view replay</p> }
        </div>
        {state &&
            <div className="relative flex justify-between " onClick={handleInputEmojiClick}>
              <InputEmoji onChange={replayComment} value={newReplay} type="text" id="search" className="inline-block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-500 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-500 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 border-none" placeholder="Search" required />
              <div className='flex justify-center items-center cursor-pointer'>
               {newReplay && <MdSend onClick={submitReplay} className=' mr-10  text-green-700' size={25} />}
              </div>
            </div>
          }
        {display && replayState.map((replay) => (
          <div className="flex mt-5 ml-32" key={replay._id}>
            <Avatar size="sm" />
            <div className="border mx-5  rounded-md h-24 w-96 " style={{ background: '#f2f2f2' }}>
              <span className=" flex font-semibold justify-start ml-3">{replay.userId.username}</span>
              <div className="flex text-xs ml-3">
                {Time}
              </div>
              <h1 className="flex justify-start mt-2 ml-3">{replay.comment}</h1>

            </div>

          </div>
        ))}

      </div>
    </div>
  );
}
export default Comment;
