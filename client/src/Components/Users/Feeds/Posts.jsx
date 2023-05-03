import React, { useEffect, useState, useRef, createContext } from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { axiosPrivate as axios } from '../../../API/axios';
import { MdSend } from 'react-icons/md';
import jwtDecode from 'jwt-decode';
import Avatar from '../Avatar/Avatar';
import Comment from './Comment';
import InputEmoji from 'react-input-emoji';
import { RiDeleteBin6Line } from 'react-icons/ri'
import { GoReport } from 'react-icons/go'
import { AiFillEdit } from 'react-icons/ai'
import { FiMoreHorizontal } from 'react-icons/fi'
import { BiCommentDetail } from 'react-icons/bi'
import Modal from '../ProfileFeeds/Modal'
import { Button } from '@chakra-ui/react';
import ReportModal from './ReportModal';
import SimpleImageSlider from "react-simple-image-slider";
import './imageSlider.css'
import zIndex from '@mui/material/styles/zIndex';

function Posts(props) {
  console.log(props, 'props post')
  const {
    _id, imageName, caption, createdAt, likes,
  } = props.image;

  const userId = props.image.userId._id
  const postRef = useRef()
  const MyContext = createContext();

  const [like, setLike] = useState(likes.length);
  const [isLike, setISLike] = useState(false);
  const [open, setOpen] = useState(false);
  const [comment, setComment] = useState([]);
  const [displayComment, setDisplayComment] = useState([]);
  const [count, setCount] = useState(1);
  const [typeComment, setTypeComment] = useState('')
  const [optionDisplay, setOptionDisplay] = useState(false)
  const [fetchUser, setFetchUser] = useState('')
  const [testDisplay, setTest] = useState(false)
  const [commentLength, setCommentLength] = useState(0)
  const [editPostModal, setEditPostModal] = useState(false)
  const [editPostInput, setEditPostInput] = useState('')
  const [updateFile, setUpdateFile] = useState('')
  const [editCaption, setEditCaption] = useState('')
  const [loading, setLoading] = useState(false)
  const [handleComment, setHandleComment] = useState(false)


  const editCommentHandle = () => {
    setHandleComment(true)
  }

  const now = moment();
  const someDate = moment(createdAt);
  const Time = someDate.from(now);
  const userDetails = jwtDecode(JSON.parse(localStorage.getItem('jwt')));
  const user = userDetails.userDetails._id;

  const handledisplayComment = (boolean) => {
    setTest(boolean)
    setCommentLength(commentLength - 1)
  }

  useEffect(() => {
    const fetchUser = (async () => {
      const response = await axios.get(`/api/user/getuserdetails/${user}`)
      setFetchUser(response.data)

    })

    fetchUser()
    setISLike(likes.includes(user));
  }, [user, likes]);

  useEffect(() => {
    const viewComment = async () => {
      try {
        displayComment.length > 0 && setDisplayComment([])
        displayComment.length > 0 && setCount(0)
        const allComments = await axios.get(`/api/posts/${props.image._id}/getcomment`);
        setComment(allComments.data);
        setCommentLength(allComments.data.length)
        setHandleComment(false)

      } catch (error) {
        console.log(error);
      }
    };
    viewComment()
  }, [open, testDisplay, handleComment])

  useEffect(() => {
    const itemsToDisplay = comment.slice(0, 1 * 3);
    setDisplayComment(itemsToDisplay);
    setCount(count + 1);
    setTest(false)
  }, [comment, testDisplay]);


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
      setCommentLength(commentLength + 1)
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

  const deletePost = (async () => {
    const postId = props.image._id
    const confirmed = window.confirm("Are you sure you want to delete this post?")
    if (confirmed) {
      try {

        const response = await axios.delete(`/api/posts/${postId}/deletepost`, { userId: user })
      } catch (error) {
        console.log(error);
      }

    }

    { props.handleGetPost(true) }


  })

  //...................editPost
  const editModal = (() => {
    setEditPostModal(!editPostModal)
  })

  // useEffect(()=>{
  //   const userDetails=(async()=>{
  //     const result= await axios.get(`/api/user/getuserdetails/${userId}`)
  //     setResult(result.data.followings)
  //   })
  //   userDetails()
  // },[])

  const postHandle = (file) => {
    setEditPostInput(URL.createObjectURL(file))
    setUpdateFile(file)
  }

  const saveChanges = async (e) => {
    e.preventDefault()
    setLoading(true)
    const data = new FormData();
    data.append('file', updateFile);
    data.append('message', editCaption);
    data.append('postId', _id);
    console.log(data.get('file'));
    console.log([...data]);
    const response = await axios.put('/api/posts/editpost', data,
      {

        headers: {
          "Content-Type": "multipart/form-data",
        },
      
    })
    console.log('responseeee',response);
    setLoading(false)
    setEditPostModal(!editPostModal)
    { props.handleGetPost(true) }

  }



  return (
    <div className=" shadow-md shadow-gray-200 rounded-md mb-6 ml-5 overflow-hidden w-4/3 ">
      <div className="flex gap-2  ">
        <Link to="/profile">
          <div className="mx-2 my-2 ">
            <Avatar url={props.image.userId.profilePicture} />
          </div>
        </Link>
        <div className="ml-2 -ml-2 mt-2 flex relative whitespace-nowrap">
          <a href=" ">
            <span className="font-semibold ">{props.image.userId.username}</span>
            <span className="ml-2 ">share a post</span>
            <p className="text-gray-500 text-sm ">{Time}</p>
          </a>
          <div className='flex justify-end  w-full  ml-12 cursor-pointer '>
            <span onClick={() => setOptionDisplay(!optionDisplay)}>
              <FiMoreHorizontal size={24} />
            </span>
          </div>
        </div>

        <div className='flex bg-indigo-500  justify-end mt-8'>
          {optionDisplay &&
            <div className=' w-36 bg-white shadow-md shadow-gray-300 rounded-md pb-2  absolute  '>
              {userId == user &&
                <div >
                  <div >

                  <p className='ml-5 mt-3 cursor-pointer z-auto' onClick={deletePost} style={{zIndex:'-1'}}>
                    <RiDeleteBin6Line size={25} className='inline-block' />
                    <span className=' ml-2'>Delete</span>
                  </p>

                  <p className='ml-5 mt-3 cursor-pointer z-auto' onClick={editModal} style={{zIndex:'-1'}}>
                    <AiFillEdit size={25} className='inline-block' />
                    <span className=' ml-2'>Edit</span>
                  </p>
                  </div>
                  {
                    <Modal
                      open={editPostModal}
                    >
                      <div className='w-96 h-fit'>
                        <Button
                          className="p-1 ml-auto bg-transparent border-0 text-black  float-right text-3xl leading-none font-semibold  focus:outline-none "
                          onClick={() => {
                            setEditPostModal(false)
                          }}
                        >
                          <span className="bg-transparent text-black  h-6 w-6 text-2xl block -mt-2 mb-4">
                            ×
                          </span>
                        </Button>

                        <> 
                          
                          <input type="file"  ref={postRef} style={{ display: "none" }} onChange={(e) => {
                            postHandle((e.target.files[0]))
                          }} />
                                    

                          <img src={editPostInput || imageName && imageName} alt="" className="w-full h-64  rounded-xl" />
                          <div className='rounded-full bg-white w-8 h-8 flex  justify-center absolute -mt-64 '>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none"
                              viewBox="0 0 24 24" stroke-width="1.5"
                              stroke="currentColor" class="w-6 h-6 mt-1 cursor-pointer "
                              onClick={(event) => {
                                event.stopPropagation()
                                postRef.current.click()

                              }} >
                              <path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                            </svg>
                          </div>
                        </>

                        <textarea placeholder={caption ? caption : "Type your message"} className='w-full  h-32 mt-1 py-2 pl-2 text-xl' onChange={(event) => setEditCaption(event.target.value)}></textarea>

                        <div className='flex justify-center mt-1'>

                          <Button class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-full " onClick={saveChanges} isLoading={loading}>
                            Save Changes
                          </Button>
                        </div>
                      </div>


                    </Modal>

                  }


                </div>
              }
              {userId != user &&
                <div className='flex flex-row p-5 cursor-pointer'>

                  <span className='inline-block'>
                    <GoReport size={25} className='inline-block' />
                  </span>
                  <span className=' inline-block ml-2 '>
                    <ReportModal postId={_id} />
                  </span>



                </div>
              }
            </div>}
        </div>
      </div>
      <div className="mx-2 ">
        <p className="my-3 text-lg ">
          {caption || null}
        </p>
        <div className="  flex  overflow-hidden  items-center">
          {imageName && imageName.length > 1 ?
            <SimpleImageSlider
            style={{position:'relative',}}
            width={900}
              height={400}
              images={imageName}
              showBullets={true}
    
             
            />

            :
            <img src={imageName} alt="" className=" w-full  max-h-96  " />
          }


        </div>
        <div className='mt-10'>

          <hr className=" h-1  bg-gray-100 border-0 rounded  dark:bg-gray-700" />
        </div>
        <div className=" mt-2 flex gap-1  ">

          <button className="flex  item-center gap-1 focus:outline-none " onClick={likeHandler}>
            {!isLike
              && <img src="/images/Like.png" className="w-8 cursor-pointer  border-none" alt="like" />}

            {isLike
              && <img src="/images/likePost.png" className="w-8 cursor-pointer  border-none" alt="like" />}

            <div className="mt-4 border-none ">
              {like}
              {' '}
              Likes
            </div>
          </button>
          <div className='ml-10 mt-3 flex items-center '>
            <BiCommentDetail size={24} />
            {commentLength}
            <span className="ml-2 cursor-pointer " onClick={() => setOpen(!open)}>
              Comments
            </span>
          </div>

        </div>
        <div>
          {open && displayComment.length > 0 && <div className=' h-4/5 ' >
            {open
              && displayComment.map((data) => (


                <Comment key={data._id} value={data} displayComment={handledisplayComment} editCommentHandle={editCommentHandle} />



              ))}
          </div>
          }

        </div>
        <div />
        {open && comment.length > 3 && <p onClick={viewMore} className='cursor-pointer text-end mr-20'>View more</p>}
      </div>
      <div class="relative flex  ">
        <InputEmoji onChange={getComment} value={typeComment} type="Type comment" id="search" className=" focus:outline-none inline-block w-96 p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Comment"
          required />
        <div className='flex justify-center items-center cursor-pointer'>
          {typeComment && <MdSend onClick={submitComment} className=' mr-10  text-green-700' size={25} />}
        </div>

      </div>
    </div>

  );
}

export default Posts;
