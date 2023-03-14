const mongoose = require('mongoose')

const PostsSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref:'User',
      required: true
    },
    caption: {
      type: String,
      max: 500
    },
    comments:[{
      type: mongoose.Schema.Types.ObjectId,
      ref:'Comments'
     }],
    imageName: {
      type: String,
      default:""
    },
    likes: {
      type: Array,
      default: []
    },
   
  },

  { timestamps: true }
)
module.exports = mongoose.model('Posts', PostsSchema)
