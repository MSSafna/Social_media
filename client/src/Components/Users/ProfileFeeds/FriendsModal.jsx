import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button
} from '@chakra-ui/react'
import { axiosPrivate as axios } from '../../../API/axios';
import { useEffect, useState } from 'react'
import Avatar from '../Avatar/Avatar'
import { useNavigate } from 'react-router';

function FriendsModal({ name, userId ,setProfileHandle, profileHandle}) {
  const navigate = useNavigate()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [stateName, setSateName] = useState('')
  const [friendDetails, setFriendDetails] = useState('')
  const [state,setState] =useState(false)

  const handleOpen = (async (name) => {
    setSateName(name)
    const res = await axios.get(`/api/user/getFriendDetails/${userId}`)
    console.log(res,'ressss');
    setFriendDetails(res.data)
  })

  useEffect(()=>{
    handleOpen(name)
  },[state])

const removeUser=async(followerId)=>{
  const confirmed = window.confirm("Are you sure you want to remove this user?")
  if(confirmed){
    const res= axios.put(`/api/user/removeFollower/${followerId}`,{userId})
    setState(!state)
    setProfileHandle(!profileHandle)

  }

}
  return (
    <>
      <p onClick={() => {
        onOpen()
        handleOpen(name)
      }} className='cursor-pointer'>{name}</p>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{name}</ModalHeader>
          <hr></hr>
          <ModalCloseButton />
          <ModalBody>
            <div className='justify-content-center '>

              {stateName === 'Followers' && (

                friendDetails && friendDetails.followersFriendList.map((friend) => (
                  <>
                    <div className="px-5 mt-5  flex cursor-pointer" >
                      <div className='mb-2' onClick={() =>{ 
                        navigate(`/profile/${friend._id}`)
                        onClose()
                        }}>
                        <Avatar  url={friend.profilepicture}></Avatar>
                      </div>
                        <span className='mt-2 font-semibold m-4'>{friend.username}</span>
                        <div className='w-full  flex justify-end'>
                       <Button  onClick={() => {
                        removeUser(friend._id)
                       }}>Remove</Button>
                      
                    </div>
                     </div>
                  </>
                ))

              )}


{stateName === 'Followings' && (

friendDetails && friendDetails.followingsFriendList.map((friend) => (
  <>
    <div className="px-5 mt-5 w-64 flex cursor-pointer h-34" >
      <div className='mb-2' onClick={() =>{ 
        navigate(`/profile/${friend._id}`)
        onClose()
        }}>
        <Avatar url={friend.profilepicture} ></Avatar>
      </div>
      <div className='ml-4 m-2 mt-2 flex  justify-center  w-full'>
      <span className='mt-1 font-semibold'>{friend.username}</span>

      </div>
    </div>
  </>
))

)}
           </div>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}

export default FriendsModal