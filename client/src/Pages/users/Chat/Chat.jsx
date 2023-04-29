import React, { useEffect, useState, useRef } from 'react'
import Conversation from '../../../Components/Users/Conversation/Conversation'
import Message from '../../../Components/Users/ChatMessage/Message'
import InputEmoji from 'react-input-emoji';
import Online from '../../../Components/Users/Online/Online';
import { UseruseContext } from '../../../Context/Context'
import jwtDecode from 'jwt-decode';
import axios from 'axios'
import { MdSend } from 'react-icons/md';
import {io} from 'socket.io-client'

import ChatModal from '../../../Components/Users/ChatModal/ChatModal';

function Chat() {
    const { userDetails } = UseruseContext();
    const user = jwtDecode(userDetails.jwt);
    const userId = user.userDetails._id;

    const scrollRef = useRef()  
    const socket=useRef()

    const [conversation, setConversation] = useState([])
    const [message, setMessage] = useState([])
    const [currentChat, setCurrentChat] = useState(null)
    const [newMessage, setNewMessage] = useState('')
    const [arrivalMessage, setArrivalMessage] = useState(null);
    const [onlineUsers, setOnlineUsers] = useState([]);
    const[friendDetail,setFriendDetail]=useState('')
    const[currentUserDetails,setCurrentUser]=useState('')
    const[handlegetConversation, setgetConversation] = useState(false)


    useEffect(() => {
        socket.current = io("ws://localhost:8900");
            socket.current.on("getMessage",data => {
                setArrivalMessage({
                    senderId: data.senderId,
                    text: data.text,
                    createdAt: Date.now(),
                });
            })
      }, []);
       
      useEffect(() => {
        arrivalMessage &&
          currentChat?.members.includes(arrivalMessage.senderId) &&
          setMessage((prev) => [...prev, arrivalMessage]);
      }, [arrivalMessage, currentChat]);


 useEffect(()=>{
    socket.current.emit("addUser",userId)
    socket.current.on('getUsers', users => {
        setOnlineUsers(currentUserDetails.followings?.filter((f) =>users.some((u) => u.userId === f) ))
    })
 },[currentUserDetails])




    useEffect(() => {
        const getConversation = async () => {
            const res = await axios.get(`/api/conversation/${userId}`)
            const user= await  axios.get(`/api/user/getuserdetails/${userId}`)
            setCurrentUser(user.data)
            setConversation(res.data)   
        }
        getConversation()
    }, [userId, handlegetConversation])

    useEffect(() => {
        const getMessage = async () => {
            try {
                const res = await axios.get(`/api/message/${currentChat._id}`)
                setMessage(res.data)
            } catch (error) {
                console.log(error);
            }
        }
        getMessage()
    }, [currentChat])

    const handleSubmit = async (event) => {
        event.preventDefault()
        const message = {
            senderId: userId,
            text: newMessage,
            conversationId: currentChat._id
        }

        const receiverId=  currentChat.members.find((member) => member != userId)
        console.log(receiverId,'reciverids');
        socket.current.emit('sendMessage',{
           senderId: userId,
           receiverId,
           text: newMessage
       })
        try {
            const res = await axios.post('/api/message', message)
            console.log(res.data);
            setMessage((prevMessages) => [...prevMessages, res.data]);
            setNewMessage('')

        } catch (error) {
            console.log(error);
        }
    }
 
  console.log(message,'messageee');


    useEffect(() => {
        scrollRef.current?.scrollIntoView({ behavior: "smooth" })
    }, [message])


    useEffect(()=>{
        console.log(currentChat);
        const friendId=currentChat?.members.find((m) => m !== userId)
        const getUser=async ()=>{
        const response= await  axios.get(`/api/user/getuserdetails/${friendId}`)
        setFriendDetail(response.data)
       
        }
        getUser()
      },[currentChat])

    return (
        <div>
            <div className='flex  h-[40rem] mx-8 border-2 border-neutral-400  '>
                <div className='flex-none w-1/4 '>
                    <div >
                        <div className='h-16  text-center pt-4 border flex justify-center'>
                          <span className='text-xl font-semibold  '>{currentUserDetails.username}</span> 
                         
                         <ChatModal setgetConversation={setgetConversation} setCurrentChat={setCurrentChat}/>
                       
                        </div>
                        <div className='border cursor-pointer'>
                            {conversation.map((c) => (
                                <div onClick={() => setCurrentChat(c)}>
                                    <Conversation conversation={c} currentUser={userId} />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <div className='flex-none w-2/4 h-full overflow-y-auto relative '>
                {currentChat ?
                        <>
                            <div className='h-16  border text-center pt-4'>
                            <span  className='text-xl font-semibold '> {friendDetail.username}</span> 
                            </div>


                           <div className='h-4/5 overflow-y-scroll ' >
                                {message && message.map((m) => (
                                 <div key={m._id} ref={scrollRef} className='my-4'>

                                        <Message message={m} own={m.senderId === userId} />
                                        
                                 </div>
                                        ))}
                                       
                            </div>
                            <div className='absolute bottom-0 right-0 left-0'>
                                <div className='flex items-center mr-6 '>
                                    <div className='flex-grow '>
                                        <InputEmoji onChange={(message) => setNewMessage(message)} value={newMessage} className='h-1' />
                                    </div>
                                    {newMessage && <MdSend className=' text-green-700' size={25} onClick={handleSubmit} />}
                                </div>
                            </div>

                        </> : (<span className='absolute top-36 text-4xl text-gray-400 ml-8 '>Open a conversation to start a chat</span>)
                    }
                </div>

                    <div className=' flex-col w-1/4 cursor-pointer'>
                        <div >
                            <Online
                            onlineUsers={onlineUsers} 
                            currentId={userId}
                            setCurrentChat={setCurrentChat} />
                        </div>
                    </div>
            </div>
        </div>
    )
}

export default Chat
