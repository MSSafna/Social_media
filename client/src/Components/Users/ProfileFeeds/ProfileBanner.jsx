import React, { useEffect, useState, useRef } from 'react';
import Avatar from '../Avatar/Avatar';
import { Button, CloseButton } from '@chakra-ui/react';
import axios from 'axios';
import { UseruseContext } from '../../../Context/Context';
import jwtDecode from 'jwt-decode';
import Posts from '../Feeds/Posts';
import { useParams } from 'react-router-dom'
import Modal from './Modal';
import { AiTwotoneCamera } from 'react-icons/ai'
import FollowError from './FollowError';
import FriendsModal from './FriendsModal';

function ProfileBanner() {
  const { id } = useParams()
  const [userPosts, setUserPosts] = useState([])
  const [details, setUserDetails] = useState()
  const { userDetails } = UseruseContext();
  const [file, setFile] = useState('')
  const [postMessage, setMessage] = useState('')
  const [showModal, setShowModal] = useState(false);
  const [profile, setProfile] = useState('')
  const [formDataImage, setFormDataImage] = useState('')
  const [viewPassword, setViewPassword] = useState(false)
  const [values, setValues] = useState({ username: "", email: "", number: "", profile: "", field: "", password: "", bio: "" })
  const [profileModal, setProfileModal] = useState(false)
  const [displayPost, setDisplayPost] = useState(false)
  const [bannerModal, setBannerModal] = useState(false)
  const [bannerFile, setBannerFileInput] = useState('')
  const [bannerImage, setFormDataBanner] = useState('')
  const [getPosts, setGetPosts] = useState(false)
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState('')
  const[profileHandle,setProfileHandle]=useState(false)

  const user = jwtDecode(userDetails.jwt);
  const userId = user.userDetails._id;
  const jwtToken = localStorage.getItem('jwt')
  const jwt = JSON.parse(jwtToken);

  const fileInputRef = useRef(null);
  const profileInput = useRef(null)
  const bannerInput = useRef(null)

  const handlePost = (boolean) => {
    setGetPosts(boolean)
  }


  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  const setUserProfile = (file) => {
    setProfile(URL.createObjectURL(file))
    setFormDataImage(file)
  }

  const handleProfilePic = () => {
    profileInput.current.click()
  }




  useEffect(() => {
    alert('called')
    const userDetails = (async () => {
      const result = await axios.get(`/api/user/getuserdetails/${userId}`)
      const updatedFollowings = [...result.data.followings, userId];
      setResult(updatedFollowings);

    })
    userDetails()
  }, [profileHandle])


  //..................................removeProfilePic
  const removeProfilePic = (async () => {
    await axios.delete(`/api/user/deleteprofile/${id}`)
    setProfileModal(false)
    setDisplayPost(!displayPost)
  })
  //.......................................editProfilePic
  const submitProfile = (async () => {
    setLoading(true)
    const data = new FormData();
    data.append('file', formDataImage)
    data.append('userId', id)
    try {
      const updatedProfile = await axios.put('/api/user/updateprofileimage',
        data,
        {
          headers:
          {
            "Content-Type": "multipart/form-data",
          }
        })
      console.log('updatedProfile', updatedProfile);
      setProfileModal(false)
      setFormDataImage('')
      setProfile('')
      setDisplayPost(!displayPost)
      setLoading(false)
    } catch (error) {
      alert(error)
    }
  })
  //....................................cancelProfilePicUpdate
  const cancelProfile = () => {
    setProfile('')
  }
  //.................................editProfileData
  const editProfile = async (event) => {
    event.preventDefault()
    values.userId = id
    try {
      const updatedProfile = await axios.put('/api/user/updateprofile', { ...values })
      setDisplayPost(!displayPost)
      setShowModal(false)
    } catch (error) {
      alert(error)
    }
  }
  //......................................................getUserDetails
  useEffect(() => {
    const fetchPost = async () => {
      const response = await axios.get(`/api/user/${id}`, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        }
      })
      setUserDetails(response.data.userDetails)
      setUserPosts(response.data.userPost)
      setGetPosts(false)   
    }
    fetchPost()

  }, [displayPost, id, getPosts, profile, ])
  //......................................postMessageHandle
  const message = (event) => {
    setMessage(event.target.value)
  }
  //........................................sharePost
  const sharePost = async (event) => {
    setLoading(true)
    const data = new FormData();
    data.append('file', file)
    data.append('message', postMessage);
    data.append('userId', id)
    try {
      const post = await axios.post('/api/posts',
        data,
        {

          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      )
      setUserPosts([post.data, ...userPosts])
      setFile(null)
      setMessage('')
      setLoading(false)

    } catch (error) {
      alert(error)
    }
  }

  
  //.......................................passwordEyeControl
  const passwordView = () => {
    setViewPassword(!viewPassword)
  }
  //......................................profilePicModalControl 
  const viewProfileModal = () => {
    setProfileModal(!profileModal)
  }
  //...........................................changeBanner
  const changeBanner = () => {
    setBannerModal(!bannerModal)

  }
  //..............................................updateBanner
  const handleBanner = () => {
    bannerInput.current.click()
  }
  const banner = (file) => {
    setBannerFileInput(URL.createObjectURL(file))
    setFormDataBanner(file)
  }
  //.....................................................uploadBanner
  const uploadBanner = async () => {
    setLoading(true)
    const data = new FormData();
    data.append('file', bannerImage);
    data.append('userId', id);
    const banner = await axios.put('/api/user/banner', data, {
      headers: {
        "Content-Type": "multipart/form-data",
      }
    })
    setDisplayPost(!displayPost)
    setBannerModal(!bannerModal)
    setBannerFileInput('')
    setLoading(false)
  }
  //..................................................removeBanner
  const removeBanner = async () => {
    const banner = await axios.delete(`/api/user/removebanner/${id}`)
    setDisplayPost(!displayPost)
    setBannerModal(!bannerModal)

  }


  const unfollow=async(unfollowId)=>{
    await axios.put(`/api/user/${unfollowId}/unfollow`,{userId})
    setProfileHandle(!profileHandle)
  }


  const follow=async(followingId)=>{
    await axios.put(`/api/user/${followingId}/follow`,{userId})
    setProfileHandle(!profileHandle)
   
    
  }


  return (
    <div className="relative  w-5/6  ">
      <div className="h-64 flex   items-center rounded-xl ml-5 ">
        {id == userId &&
          <div className='rounded-full bg-white w-8 h-8 flex  justify-center absolute -mt-48 '>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 mt-1 cursor-pointer" onClick={changeBanner}>
              <path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
            </svg>
          </div>
        }
        <div className="w-full h-64  rounded-xl " >
          <img src={details && details.banner} alt="" className="w-full h-64  rounded-xl" />
        </div>
        <Modal
          open={bannerModal}
        >

          <div className='w-96 h-fit'>
            <Button
              className="p-1 ml-auto bg-transparent border-0 text-black  float-right text-3xl leading-none font-semibold  focus:outline-none "
              onClick={() => setBannerModal(false)}
            >
              <span className="bg-transparent text-black  h-6 w-6 text-2xl block -mt-2 mb-4">
                ×
              </span>
            </Button>
            <img src={bannerFile || details && details.banner} alt="" className="w-full h-64  rounded-xl" />
            <div className='mt-4 flex justify-center'>
              <input type="file" ref={bannerInput} style={{ display: "none" }} onChange={(e) => banner((e.target.files[0]))} />
              {!bannerFile &&
                <>
                  <Button class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-full" onClick={handleBanner}>
                    Update
                  </Button>
                  <Button class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full ml-4" onClick={removeBanner}>
                    Remove
                  </Button>
                </>
              }
              {bannerFile &&
                <>
                  <Button class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-full" onClick={uploadBanner} isLoading={loading}>
                    Share

                  </Button>
                  <Button class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full ml-2" >
                    Cancel
                  </Button>
                </>
              }
            </div>
          </div>
        </Modal>
      </div>

      <div className="absolute top-0 ml-5  mt-44 bg-white rounded-full pt-1 px-1 h-32 flex  pr-2">
        <Avatar size="lg" url={details && details.profilePicture} />
        <input type="file" ref={profileInput} style={{ display: 'none' }} accept="image/*"
          onChange={(e) => setUserProfile((e.target.files[0]))} />
        <AiTwotoneCamera size={25} className=' mt-24 -ml-8 z-100 cursor-pointer' onClick={viewProfileModal} />
      </div>
      <Modal
        open={profileModal}
      >
        <button
          className="p-1 ml-auto bg-transparent border-0 text-black  float-right text-3xl leading-none font-semibold  focus:outline-none "
          onClick={() => setProfileModal(false)}
        >
          <span className="bg-transparent text-black  h-6 w-6 text-2xl block -mt-2 mb-4">
            ×
          </span>
        </button>
        <div className='flex justify-center'>
          <Avatar size="lg" url={profile || details && details.profilePicture} />
        </div>
        <div className='mt-5'>
          {!profile &&
            <>
              <Button class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-full" onClick={handleProfilePic}>
                Update
              </Button>
              <Button class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full ml-4" onClick={removeProfilePic}>
                Remove
              </Button>
            </>
          }
          {profile &&
            <>
              <Button class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-full" onClick={submitProfile} isLoading={loading}>
                Share
              </Button>
              <Button class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full ml-4" onClick={cancelProfile}>
                Cancel
              </Button>
            </>
          }

        </div>
      </Modal>
      <div className="bg-white shadow-md ml-5 shadow-gray-300 rounded-md overflow-hidden grow   ">
        <div className=' mt-5 '>
          <div className='mb-4 flex '>
            <div className='text-center flex '>
              <h1 className="font-bold text-2xl ml-6 mt-8">{details && details.username}</h1>
              <span className='text-2xl ml-12'>{details && details.followers.length}</span>
              <p className=' ml-1 font-semibold'><FriendsModal name='Followers' userId={userId} setProfileHandle={setProfileHandle} profileHandle={profileHandle}/></p>
              <span className=' text-2xl ml-8'>{details && details.followings.length}</span>
              
              <p className='ml-1 font-semibold'> <FriendsModal name='Followings' userId={userId}/></p>
              <p className=' text-2xl ml-8'>{userPosts.length}</p>
              <p className='ml-1 font-semibold'>Posts</p>
            </div>

            <div className='ml-auto mr-4'>
              {id != userId ?
                <>
                  <button className="bg-orange-800  text-white font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150">Message</button>
                  {!result.includes(id) ?
                    <button className="bg-orange-800  text-white font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" onClick={()=>follow(id)} >Follow</button>
                    :
                    <button className="bg-orange-800  text-white font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" onClick={()=>unfollow(id)} >Unfollow</button>
                  }

                </> :
                <>
                  <button className="bg-orange-800  text-white font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" onClick={handleButtonClick} >Add post</button>
                  <input type="file" ref={fileInputRef} style={{ display: 'none' }} accept="image/*"
                    onChange={(e) => setFile(e.target.files[0])} />

                  <button
                    className="bg-orange-800  text-white font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setShowModal(true)}
                  >
                    Edit Profile
                  </button>
                  {showModal ? (
                    <>
                      <div
                        className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50  "
                      >
                        <div className="relative w-auto my-6 mx-auto max-w-3xl">
                          {/*content*/}
                          <form action onsubmit={editProfile} className="flex flex-col gap-2" >
                            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white ">
                              {/*header*/}
                              <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t ">

                                <button
                                  className="p-1 ml-auto bg-transparent border-0 text-black  float-right text-3xl leading-none font-semibold  focus:outline-none "
                                  onClick={() => setShowModal(false)}
                                >
                                  <span className="bg-transparent text-black  h-6 w-6 text-2xl block pt-6 mb-4">
                                    ×
                                  </span>
                                </button>
                              </div>
                              {/*body*/}
                              <div className="relative p-6 flex-auto">
                                <p className="my-4 text-slate-500 text-lg leading-relaxed">

                                  <input
                                    className="p-2  rounded-xl border"
                                    type="text"
                                    name="username"
                                    defaultValue={details && details.username}
                                    onChange={(e) => setValues({ ...values, [e.target.name]: e.target.value })}

                                  />

                                  <div className="relative my-2">
                                    <input
                                      className="p-2 rounded-xl border w-full"
                                      type="tel"
                                      name="number"
                                      defaultValue={details && details.number}
                                      onChange={(e) => setValues({ ...values, [e.target.name]: e.target.value })}
                                    />
                                  </div>
                                  <div className="relative my-2">
                                    <textarea
                                      className="p-2 rounded-xl border w-full"
                                      type="text"
                                      name="bio"
                                      placeholder='Bio'
                                      onChange={(e) => setValues({ ...values, [e.target.name]: e.target.value })}

                                    />

                                  </div>
                                  <div className="relative my-2">
                                    <input
                                      className="p-2 rounded-xl border w-full"
                                      type="email"
                                      name="email"
                                      defaultValue={details && details.email}
                                      onChange={(e) => setValues({ ...values, [e.target.name]: e.target.value })}

                                    />
                                  </div>
                                  <div className="relative my-2">
                                    <input
                                      className="p-2 rounded-xl border w-full"
                                      type={viewPassword ? "text" : "password"}
                                      name="password"
                                      placeholder="Reset password"
                                      onChange={(e) => setValues({ ...values, [e.target.name]: e.target.value })}
                                    />
                                    {viewPassword &&
                                      <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} fill="gray" className="bi bi-eye  absolute top-1/2 right-3 -translate-y-1/2" viewBox="0 0 16 16" onClick={passwordView} >
                                        <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z" />
                                        <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z" />
                                      </svg>
                                    }
                                    {!viewPassword &&
                                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-eye-slash absolute top-1/2 right-3 -translate-y-1/2" viewBox="0 0 16 16" onClick={passwordView}>
                                        <path d="M13.359 11.238C15.06 9.72 16 8 16 8s-3-5.5-8-5.5a7.028 7.028 0 0 0-2.79.588l.77.771A5.944 5.944 0 0 1 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.134 13.134 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755-.165.165-.337.328-.517.486l.708.709z" />
                                        <path d="M11.297 9.176a3.5 3.5 0 0 0-4.474-4.474l.823.823a2.5 2.5 0 0 1 2.829 2.829l.822.822zm-2.943 1.299.822.822a3.5 3.5 0 0 1-4.474-4.474l.823.823a2.5 2.5 0 0 0 2.829 2.829z" />
                                        <path d="M3.35 5.47c-.18.16-.353.322-.518.487A13.134 13.134 0 0 0 1.172 8l.195.288c.335.48.83 1.12 1.465 1.755C4.121 11.332 5.881 12.5 8 12.5c.716 0 1.39-.133 2.02-.36l.77.772A7.029 7.029 0 0 1 8 13.5C3 13.5 0 8 0 8s.939-1.721 2.641-3.238l.708.709zm10.296 8.884-12-12 .708-.708 12 12-.708.708z" />
                                      </svg>
                                    }
                                  </div>
                                </p>
                              </div>
                              <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                                <button
                                  className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                  type="button"
                                  onClick={() => setShowModal(false)}
                                >
                                  Close
                                </button>
                                <button
                                  className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                  typ="submit"
                                  onClick={editProfile}
                                >
                                  Save Changes
                                </button>
                              </div>
                            </div>
                          </form>
                        </div>
                      </div>
                      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                    </>
                  ) : null}
                </>
              }
            </div>
          </div>
        </div>
        <div className='-mt-4 pb-2'>
          <h1 className=" ml-6 text-slate-500 ">{details && details.bio}</h1>

        </div>
      </div>
      {
        file &&
        <div className="mt-5 pb-4 ml-5 shadow-md shadow-gray-300   ">
          <CloseButton onClick={() => setFile(null)} />
          <img src={URL.createObjectURL(file)} alt="" className=" h-64  w-full" />
          <textarea className='w-full border-teal-500 outline-none ml-4 mt-4'
            placeholder='Type your message'
            onChange={message}
            value={postMessage}
          />
          <Button className='ml-4 ' colorScheme="green" onClick={sharePost} isLoading={loading}>{loading ? "Loading..." : "Share"}</Button>
        </div>

      }

      <div className='mt-3 '>
        {!result.includes(id) && id != userId &&
          <FollowError />
        }

        {
          result.includes(id) &&
          userPosts.map((post) => (
            <Posts key={post._id} image={post} handleGetPost={handlePost} />
          ))
        }
      </div>
    </div >
  );
}

export default ProfileBanner;
