/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import moment from 'moment';
import Avatar from '../Avatar/Avatar';
import InputEmoji from 'react-input-emoji';
import { MdSend } from 'react-icons/md';
import axios from 'axios';
import jwtDecode from 'jwt-decode';
import {AiFillDelete} from 'react-icons/ai'



function Comment({ value,displayComment }) {
  const [state, setState] = useState({id:'',state:false})
  const [replayState, setReplayState] = useState([])
  const [newReplay, setNewReplay] = useState('')
  const [display, setDisplay] = useState({id:'',state:false})
  const [id,setId]=useState('')

  const now = moment();
  const someDate = moment(value.createdAt);
  const Time = someDate.from(now);
  const commentId = value._id
  const jwtToken = localStorage.getItem('jwt');
  const userDetails = jwtDecode(jwtToken)
  const userId = userDetails.userDetails._id

  const setReplay = async (event) => {
    var id=event.target.id;
    event.stopPropagation()
    const response = await axios.get(`/api/posts/${id}/replaycomment`);
    console.log(response.data,'response.data');
    setReplayState(response.data);
    if(event.target.id == display.id){
      setDisplay({id:'',state:false})
    }else{
      setDisplay({id:id,state:true})
    }
  }
  const handleInputEmojiClick = (event) => {
    event.stopPropagation()
  }
  const replayComment = (replyComment) => {
    setNewReplay(replyComment)
  }
  const viewReplyInput = (event) => {
    var id=event.target.id
    event.stopPropagation()
    setState({id:id,state:!state.state})
  }
  const submitReplay = async (event) => {
    alert(event.target.id)
    var id=event.target.id
    try {
      const Replay = await axios.post(`/api/posts/${id}/replaycomment`, { userId: userId, postId: value.postId, comment: newReplay })
      const testingReplay = Replay.data;
      console.log(Replay,'Replay');
      setReplayState([testingReplay,...replayState])
      setNewReplay('')
      setDisplay({id:id,state:true})
      setState(!state)
    } catch (err) {
      console.log(err);
    }
  }
  // useEffect(() => {
  //   const fetchData = async () => {
  //     const response = await axios.get(`/api/posts/${value._id}/replaycomment`);
  //     console.log(response.data.reverse(), 'replayComment');
  //     setReplayState(response.data);
  //   };
  //   fetchData();
  // }, []);
 const deleteComment=async()=>{
     console.log(value._id,'commentId')
   const response=  await axios.delete(`/api/posts/deletecomment?postId=${value.postId}&commentId=${value._id}`)
    console.log(response,'responseee');
    if(response.data.deletedComment){
      displayComment(true)
    }

 }

 console.log(value,'value');
  return (
    <div>
      <div className=" grid justify-center overflow-auto  " >
        <div className="flex mt-5">
          <Avatar size="sm" />
          <div className="border mx-5  rounded-md h-24 w-96 " style={{ background: '#f2f2f2' }}>
            <div className='flex justify-between items-center'>
            <span className=" flex font-semibold justify-start ml-3">{value.userId.username}</span>
            {value.userId._id == userId && 
            <AiFillDelete size={24} className='text-right mx-1 mt-1 cursor-pointer' onClick={deleteComment}/>
            }
            </div>
          
            <div className="flex text-xs ml-3">
              {Time}
            </div>
            <h1 className="flex justify-start mt-2 ml-3">{value.comment}</h1>
          </div>
        </div>
        <div className='flex'>
          <span onClick={viewReplyInput} className='ml-16 cursor-pointer' id={value._id}>
            reply
          </span>
          <div className='bg-indigo-500 w-grow'>
         
          </div>
          <div class="border-l border-gray-400 h-4 ml-3 mt-1"></div>
          {value.replayComment.length > 0 ? <p onClick={setReplay} id={value._id} className="ml-3 cursor-pointer">view replay</p> : <p onClick={setReplay} id={value._id} className="ml-3 text-neutral-400">view replay</p> }
        </div>
        {state.id==value._id && state.state &&
            <div className="relative flex justify-between " onClick={handleInputEmojiClick}>
              <InputEmoji onChange={replayComment} value={newReplay} type="text"  className="inline-block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-500 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-500 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 border-none" placeholder="Search" required />
              <div className='flex justify-center items-center cursor-pointer'>
               {newReplay && <MdSend onClick={submitReplay} id={value._id} className=' mr-10  text-green-700' size={25} />}
              </div>
            </div>
          }


        { display.id ==value._id && display.state   && replayState.map((replay) => (

          <div>
           
          <div className="flex mt-5 ml-32 " key={replay._id}>
          
            <Avatar size="sm" />
            <div className="border mx-5  rounded-md h-24 w-96 " style={{ background: '#f2f2f2' }}>
              <div className='flex justify-between items-center'>
              <span className=" flex font-semibold justify-start ml-3 ">{replay.userId.username}</span>

              {value.userId._id == userId && 
            <AiFillDelete size={24} className='text-right mx-1 mt-1 cursor-pointer' onClick={deleteComment}/>
            }
              </div>
              <div className="flex text-xs ml-3">
                {Time}
              </div>
              <h1 className="flex justify-start mt-2 ml-3">{replay.comment}</h1>   
            </div>
          </div>
          <div className='flex pl-32'>
          {/* <span onClick={viewReplyInput} id={replay._id} className='ml-16 cursor-pointer'>
            reply
          </span> */}
          <div className='bg-indigo-500 w-grow'>
         
          </div>
          {/* <div class="border-l border-gray-400 h-4 ml-3 mt-1"></div>
          {replay.replayComment.length > 0 ? <p onClick={setReplay} id={replay._id} className="ml-3 cursor-pointer">view replay</p> : <p  className="ml-3 text-neutral-400">view replay</p> } */}
        </div>

        {replay._id==state.id && state.state &&
            <div className="relative flex justify-between " onClick={handleInputEmojiClick}>
              <InputEmoji onChange={replayComment} value={newReplay} type="text"  className="inline-block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-500 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-500 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 border-none" placeholder="Search" required />
              <div className='flex justify-center items-center cursor-pointer'>
               {newReplay && <MdSend onClick={submitReplay} id={replay._id} className=' mr-10  text-green-700' size={25} />}
              </div>
            </div>
          }
          </div>
        ))}

      </div>
    </div>
  );
}
export default Comment;
