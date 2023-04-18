import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from '@chakra-ui/react'
import { UseruseContext } from '../../../Context/Context';
import jwtDecode from 'jwt-decode';
import { HiOutlineDocumentSearch } from 'react-icons/hi'
import { useState, useEffect } from 'react';
import axios from 'axios';
import Avatar from '../Avatar/Avatar';

function ChatModal({setgetConversation,setCurrentChat}) {
  console.log(setCurrentChat);
  const { userDetails } = UseruseContext();
  const { isOpen, onOpen, onClose } = useDisclosure()

  const user = jwtDecode(userDetails.jwt);
  const userId = user.userDetails._id;

  const [users, searchUser] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [message, setMessage] = useState(false);
  const [state, setState] = useState(false)
  const handleInputChange = (event) => {
    setSearchValue(event.target.value);
  };

  const handleSearch = async () => {
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
  }, [searchValue, state]);


  const createConversation=(async(receiverId) => {
    const senderId = userId
    const res = await axios.post('/api/conversation',{senderId, receiverId})
    setCurrentChat(res.data)
    setgetConversation(true)
   
    
  }) 
  return (
    <>
      <HiOutlineDocumentSearch size={30} className='cursor-pointer ' onClick={onOpen} />

      <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose} >
        <ModalOverlay />
        <ModalContent >
          <ModalHeader>Search</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
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
              {users.length > 0 && <div className='h-64 overflow-y-scroll'>
                {users
                  && users.map((user) => (
                    <>
                      <div className="px-5 mt-5 w-64 flex cursor-pointer  "  
                       onClick={(() => {
                         onClose()
                        createConversation(user._id)
                       })}
                    
                       >
                        <div className='mb-2' >
                          <Avatar size="sm" url={user.profilePicture}></Avatar>
                        </div>
                        <div className='ml-4 m-2 mt-2 flex flex-row justify-center  w-full'>
                          <span className='mt-1 font-semibold'>{user.username}</span>
                          <div className='flex justify-end ml-auto'>
                          </div>
                        </div>
                      </div>
                    </>
                  ))}
              </div>
              }
            </div>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}

export default ChatModal