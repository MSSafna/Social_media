
const mongoose = require('mongoose')
const commentSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required:true,
    },
    postId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Posts',
        required:true,
    },
    comment: {
        type: String,
        required: true
    },
    postedAt: {
        type: Date,
        default: Date.now
    },
},
    { timestamps: true }
);
module.exports = mongoose.model('Comments', commentSchema)
