import React, { useEffect, useState } from 'react'
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  useDisclosure
} from '@chakra-ui/react'
import axios from 'axios';
import { UseruseContext } from '../../../Context/Context';
import jwtDecode from 'jwt-decode';
import Avatar from '../Avatar/Avatar';
import { useNavigate } from 'react-router';



function ModalComponent({ name }) {

  const { userDetails } = UseruseContext();
  const [users, searchUser] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [message, setMessage] = useState(false);
  const[currentUser,setCurrentUser] = useState('')
  const[state,setState]=useState(false)
  const navigate = useNavigate()


  const user = jwtDecode(userDetails.jwt);
  const userId = user.userDetails._id;
  const { isOpen, onOpen, onClose } = useDisclosure()

  const handleInputChange = (event) => {
    setSearchValue(event.target.value);
  };

  const handleSearch = async () => {
    const user= await axios.get(`/api/user/getuserdetails/${userId}`)
    setCurrentUser(user.data)
    const result = await axios.get(`/api/user/searchuser?value=${searchValue}&userId=${userId}`,)
    if (result.data.userNotFound) {
      setMessage(true);
      searchUser([]);
    } else {
      setMessage('');
      searchUser(result.data);
    }
  };

  useEffect(() => {
    handleSearch();
  }, [searchValue,state]);

  const follow=async(followingId)=>{
    await axios.put(`/api/user/${followingId}/follow`,{userId})
    setState(!state)
    
  }

  const unFollow=async(unfollowId)=>{
    await axios.put(`/api/user/${unfollowId}/unfollow`,{userId})
    setState(!state)
  }
 

  return (
    <div>
      <span className="cursor-pointer w-24 " onClick={onOpen}>{name}</span>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Search</ModalHeader>
          <ModalCloseButton  onClick={() => {
             setMessage('');
             searchUser([]);
             setSearchValue('')
          }}/>
          <ModalBody>
            <div className='justify-content-center '>

              <input
                type="text"
                className="w-full bg-slate-200 h-10 outline-none pl-2 rounded-md "
                placeholder="Search your friend .."
                value={searchValue}
                onChange={handleInputChange}
              />

            </div>
           
            <div className=' my-4 '>
              <hr />

                 
              {message && (
                <div className=" mt-2 w-64 flex text-2xl  ">
                  no user found
                </div>
              )}



              {users
                && users.map((user) => (
                  <>
                  <div className="px-5 mt-5 w-64 flex cursor-pointer " >
                  <div className='mb-2' onClick={() => navigate(`/profile/${user._id}`)}>
                    <Avatar size="sm"></Avatar>
                  </div>
                  <div className='ml-4 m-2 mt-2 flex  justify-center  w-full'>
                    <span className='mt-1 font-semibold'>{user.username}</span>
                    <div className='flex justify-end ml-auto'>
                      {!currentUser.followings.includes(user._id)?
                      <span className='text-blue-400 font-semibold cursor-pointer m-1 ' onClick={() => {follow(user._id)}}>Follow</span>
                      :
                      <span className='text-blue-900 font-semibold cursor-pointer m-1 ' onClick={() => {unFollow(user._id)}}>Unfollow</span>
                      }
                    </div>
                  </div>
                </div>
                </>
                ))}

            </div>

          </ModalBody>

        </ModalContent>
      </Modal>
    </div >
  )
}

export default ModalComponent
