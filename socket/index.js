const io = require('socket.io')(8900,{
    cors:{
        origin:'http://localhost:3000'
    },
    
})
let users=[]
const addUser=(userId,socketId) => {
    !users.some(user=>user.userId === userId) && 
    users.push({userId,socketId})
}

const removeUser = (socketId) => {
    users=users.filter((user) => user.socketId !== socketId)
}



const getUser = (receiverId) => {
    return users.find((user) => user.userId == receiverId);
  };


io.on("connection",(socket) => {
    console.log("a user is connected");
    io.emit('welcome','connected')
   socket.on('addUser',userId=>{
     addUser(userId,socket.id)
     io.emit("getUsers",users)
   })

//send and getMessage
socket.on('sendMessage',({senderId,receiverId,text}) => { 
    console.log(receiverId, 'receiverid');
   const user = getUser(receiverId)
    console.log(user,'user');
   io.to( user.socketId).emit("getMessage", {
    senderId,
    text,
  });
})

   socket.on("disconnect",() => {
    console.log(users,'userssss');
    console.log("a user disconnected!");
    removeUser(socket.id)
    io.emit("getUsers",users)
})
})

