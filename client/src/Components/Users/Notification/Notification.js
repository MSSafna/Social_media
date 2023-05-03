import React, { useEffect, useState } from 'react'
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
  
} from '@chakra-ui/react'
import Avatar from '../Avatar/Avatar';
import { UseruseContext } from '../../../Context/Context'
import jwtDecode from 'jwt-decode';
import { axiosPrivate as axios} from '../../../API/axios';
import { useNavigate } from 'react-router';

function Notification() {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [notification , setNotification ] = useState([])
  const { userDetails } = UseruseContext();
  const navigate = useNavigate()
  const user = jwtDecode(userDetails.jwt)
  const userId = user.userDetails._id;

  const getNotification = async () => {
    const result =await  axios.get(`/api/user/getnotification/${userId}`)
    setNotification(result.data)
    
  }
  
  useEffect(() => {   
    getNotification()
  },[userId])

console.log(notification,'notification');
  return (
    <div>
     <p onClick={onOpen} className='cursor-pointer'>Notification</p>

<Modal isOpen={isOpen} onClose={onClose}>
  <ModalOverlay />
  <ModalContent>
    <ModalHeader>Notification</ModalHeader>
    <ModalCloseButton />
    
    <ModalBody>
      <div  className='h-48 overflow-y-scroll'>

       {notification && 
       notification.map((noty) => (
        <div className='flex flex-row p-2' onClick={() =>{ 
          onClose()
          navigate(`/profile/${noty.senderName._id}`)
          }}>
           <Avatar url={noty.senderName.profilePicture}/>
         <span className='p-3 font-bold'>{noty.senderName.username} </span> 
         <span className='p-3 -ml-4' >{noty.message}</span>
        </div>
      
       ))
       }
      </div>
    </ModalBody>
  </ModalContent>
</Modal>
    </div>
  )
}

export default Notification
