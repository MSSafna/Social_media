const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const helmet = require('helmet')
const morgan = require('morgan')
const userRoute = require('./routes/users/users')
const userAuth = require('./routes/users/auth')
const userPost = require('./routes/users/posts')
const adminRoute=require('./routes/Admin/adminauth')
var cors = require('cors')
const authRoutes=require('./routes/users/auth')
const cookieParser = require('cookie-parser')
const app = express()


dotenv.config();
mongoose.connect(process.env.MONGO_URL,{useNewUrlParser:true,useUnifiedTopology:true}, () => {
  console.log('connected to mongo')
})


// middleware
app.use(cookieParser())
app.use(express.json())
app.use(helmet())
app.use(morgan('common'))
app.use(cors({
  origin:["http://localhost:3000"],
  method:["GET","POST"],
  credentials:true
}))
app.use('/',authRoutes)
app.use('/api/user', userRoute)
app.use('/api/auth', userAuth)
app.use('/api/posts', userPost)
app.use('/api/admin',adminRoute)


app.listen(4000, () => {
  console.log('connected to server')
})
