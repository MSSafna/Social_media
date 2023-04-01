const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    require: true,
    min: 3,
    max: 20,
    unique: true
  },
  email: {
    type: String,
    required: true,
    max: 50,
    unique: true
  },
  password: {
    type: String,
    required: true,
    min: 6
  },
  // refreshToken:{
  //   type:String,
  //   default:''
  // },
  profilePicture: {
    type: String,
    default: ''
  },
  followers: {
    type: Array,
    default: []

  },
  followings: {
    type: Array,
    default: []

  },
  field: {
    type: String,
    require: true
  },
  number:{
    type:Number,
    require:true
  },
  Bio: {
    type: String,
    max: 50

  },
  isAdmin: {
    type: Boolean,
    default: false
  }
},
{ timestamps: true }
)
module.exports = mongoose.model('User', UserSchema)
