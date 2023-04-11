const User = require('../models/User')
const Posts = require('../models/Posts')
const Comment = require('../models/Comment')
const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt')
const ReplayComment = require('../models/ReplayComment');
const multer = require("multer");
const cloudinary = require('cloudinary').v2;
cloudinary.config({
  cloud_name: 'do4my2sxk',
  api_key: '737763838648535',
  api_secret: '9eVoUyJjMQ05m0XGtsUYH99691Y',
  colors: true,
});



module.exports = {
  //.......................................................................getPost.......................
  getPosts: async (req, res) => {
    try {
      const currentUser = await User.findById(req.params.userId)
      const userPosts = await Posts.find({ userId: currentUser._id }).sort({ _id: - 1 }).populate('userId')
      const friendPosts = await Promise.all(
        currentUser.followings.map((friendId) => {
          return Posts.find({ userId: friendId }).sort({ _id: - 1 }).populate('userId');
        })
      )
      let result = userPosts.concat(...friendPosts).sort((a, b) => b.createdAt - a.createdAt)
      res.json({ result })
    } catch (err) {
      console.log(err);
      res.status(500).json(err)
    }
  },

  //....................................................................postPost....................
  postPost: async (req, res) => {
    const { message, userId } = req.body;
    try {
      if (req.file) {
        const file = req.file.path;
        const imageUrl = await new Promise((resolve, reject) => {
          cloudinary.uploader.upload(file, (err, result) => {
            if (err) {
              reject(err);
            } else {
              resolve(result.url);
            }
          });
        });
        var data = {
          userId: userId,
          caption: message,
          imageName: imageUrl,
        };
      } else {
        var data = {
          userId: userId,
          caption: message
        }
      }

      const newPost = new Posts(data);
      const savedPost = await newPost.save();
      const post = await Posts.findOne({ _id: savedPost._id }).populate('userId');
      res.status(200).json(post);
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },


  //............................................getSearchUser....................................
  getSearchUser: async (req, res) => {
    const { value } = req.query
    console.log(req.query.userId, 'req.body.userId');
    console.log(value);
    const regex = new RegExp(value, 'i');
    if (regex.test('')) {
      res.json([])
    } else {
      const users = await User.find({
        $and: [
          { _id: { $ne: req.query.userId } },
          { username: { $regex: regex } }
        ]
      });

      if (users.length == 0) {
        res.json({ userNotFound: true })
      } else {
        res.json(users)
      }

    }

  },

  //....................................................postComment....................................
  postComment: async (req, res) => {
    const data = {
      userId: req.body.userId,
      postId: req.params.id,
      comment: req.body.comment
    }
    const newComment = new Comment(data);
    try {
      const savedComment = await newComment.save()
      const Post = await Posts.findById(req.params.id).updateOne({ $push: { comments: savedComment._id } })
      const comment = await Comment.findOne({ _id: savedComment._id }).populate('userId').sort('-createdAt')
      res.status(200).json(comment)
    } catch (error) {
      console.log(error);
    }
  },

  //.............................................................getComment....................................
  getComment: async (req, res) => {
    try {
      const comment = await Comment.find({ postId: req.params.id, parentcomment: { $exists: false } }).populate('userId').sort('-createdAt')
      res.status(200).json(comment)
    } catch (error) {
      console.log(error, 'error');
    }
  },

  //...................................................getReplycomment...........................

  getReply: async (req, res) => {
    try {
      const replayComment = await Comment.find({ parentcomment: req.params.id }).populate('userId').sort('-createdAt')
      res.json(replayComment)
    } catch (error) {
      console.log(error);
    }
  },
  //...................................................................postReplyComment........................
  replayComment: async (req, res) => {
    try {
      const data = {
        userId: req.body.userId,
        postId: req.body.postId,
        parentcomment: req.params.id,
        comment: req.body.comment

      }

      const replayComment = new Comment(data);
      const savedReplyComment = await replayComment.save()
      const testing = await Comment.findOneAndUpdate({ _id: data.parentcomment }, { $push: { replayComment: savedReplyComment._id } })
      console.log(testing, '');
      const newComment = await Comment.findOne({ _id: savedReplyComment._id }).populate('userId').sort('-createdAt')
      res.json(newComment)
    } catch (error) {
      res.status(500).json(error)
    }

  },

  //...........................................................deletePost...................................
  deletePost: async (req, res) => {
    try {
      console.log(req.params);
      const deleteComment = await Comment.deleteMany({ postId: req.params.id })
      const post = await Posts.findOne({ _id: req.params.id })
      console.log(post,'postssssssssssssss');
      if(post.imageName.trim()!=''){
        const imageUrl = post.imageName
        const urlArray = imageUrl.split('/');
        const image = urlArray[urlArray.length - 1]
        const imageName = image.split('.')[0]
        const response = await cloudinary.uploader.destroy(imageName, { invalidate: true, resource_type: "image" },)
      }
      const deletePost = await Posts.deleteOne({ _id: req.params.id })
      res.json('succcessfully deleted')
    } catch (err) {
      console.log(err);
    }
  },

  //.................................................................getUserPosts..............................
  userPosts: async (req, res) => {
    const userPost = await Posts.find({ userId: req.params.id }).sort({ _id: - 1 }).populate('userId')
    const userDetails = await User.findById({ _id: req.params.id })
    res.json({ userPost, userDetails })


  },
  //.................................................................updateProfile.................
  updateProfile: async (req, res) => {
    console.log(req.body);
    const { username, userId, password, email, number, bio } = req.body;
    var data = {}
    try {
      if (password) {
        var hashedPassword = await bcrypt.hash(password, 10)
      }

      username.trim() != "" ? data.username = username : '';
      number != "" ? data.number = number : '';
      password != "" ? data.password = hashedPassword : '';
      email.trim() != "" ? data.email = email : '';
      bio.trim() != "" ? data.bio = bio : '';

      console.log(data, 'dataa');
      const updateUser = await User.updateOne({ _id: userId }, { $set: data })
      res.status(200).json({ updated: true })
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  //....................................................................deleteProfile............................
  deleteProfile: async (req, res) => {
     const user=await User.findById({_id:req.params.id})
    const imageUrl = user.profilePicture
      const urlArray = imageUrl.split('/');
      const image = urlArray[urlArray.length - 1]
      const imageName = image.split('.')[0]
      const response = await cloudinary.uploader.destroy(imageName, { invalidate: true, resource_type: "image" },)
    const result = await User.updateOne({ _id: req.params.id }, { profilePicture: "" })
    res.status(200).json({ profileDeleted: true })
  },

  //........................................................updateprofileimage..................................
  updateprofileimage: async (req, res) => {
    console.log('reacheddd');
    const file = req.file.path;
    const imageUrl = await new Promise((resolve, reject) => {
      cloudinary.uploader.upload(file, (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result.url);
        }
      });
    });
    const updateUser = await User.updateOne({ _id: req.body.userId }, { $set: { profilePicture: imageUrl } })
    res.status(200).json(updateUser)

  },

  //.........................................................bannerUpdate
  bannerUpdate: async (req, res) => {
    const file = req.file.path;
    const imageUrl = await new Promise((resolve, reject) => {
      cloudinary.uploader.upload(file, (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result.url);
        }
      });
    });
    const updateProfile = await User.updateOne({ _id: req.body.userId }, { $set: { banner: imageUrl } });
    res.status(200).json(updateProfile)
  },
  //................................................................removeBanner
  removeBanner: async (req, res) => {
    try {
      const user=await User.findById({_id:req.params.id})
      const imageUrl = user.banner
        const urlArray = imageUrl.split('/');
        const image = urlArray[urlArray.length - 1]
        const imageName = image.split('.')[0]
        const response = await cloudinary.uploader.destroy(imageName, { invalidate: true, resource_type: "image" },)
      const result = await User.updateOne({ _id: req.params.id }, { $set: { banner: 'https://www.mub.eps.manchester.ac.uk/graphene/wp-content/themes/uom-theme/assets/images/default-banner.jpg' } })
      res.json(result)
    } catch (err) {
      res.json(err)
    }
  },

  //...........................................................................getUserDetails
  getUserDetails: async (req, res) => {
    console.log('reached');
    try {
      const result = await User.findById({ _id: req.params.id })
      res.status(200).json(result)
    } catch (err) {
      console.log(err);
    }
  },

  //..................................................................................deleteComment
  deleteComment:async(req,res)=>{
      const{postId,commentId}=req.query
    try{
      const post=await Posts.updateOne({_id:postId},{$pull:{comments:commentId}})
      const childComment=await Comment.deleteMany({parentcomment:commentId})
      const comment=await Comment.deleteOne({_id:commentId})
      res.status(200).json({deletedComment:true})
      
    }catch(err){
      console.log(err);
    }
  },
  //............................................................................getSuggestions

  getSUggestions:async(req,res)=>{
   const userDetails=await User.findById(req.params.id)
  const otherUsers=await User.find({
    $and:[
      {
        _id:{$ne:userDetails._id},
      },
      {
        _id:{$nin:userDetails.followings}
      },
      {
        _id:{$nin:userDetails.followers}
      }
    ]
  }).sort('-createdAt').limit(5) 
   res.status(200).json(otherUsers)
  },

  //................................................................................editPost
  editPost:async(req,res)=>{
    try{
      console.log(req.body);
      const{message,postId}=req.body
      const data={}
     if(req.file){
      const file = req.file.path;
      var imageUrl = await new Promise((resolve, reject) => {
        cloudinary.uploader.upload(file, (err, result) => {
          if (err) {
            reject(err);
          } else {
            resolve(result.url);
          }
        });
      })
     }
   message &&  message.trim() != "" ? data.caption = message : '';
    imageUrl && imageUrl.trim() !=""? data.imageName=imageUrl:'';
    const result= await Posts.updateOne({_id :postId},{$set:data})
    res.status(200).json(result)
    }catch(error){
      console.log(error);
    }
  },
  //...................................................follow User
  followUser:async(req,res)=>{
    try{
      if (req.body.userId !== req.params.id) {
        try {
          const user = await User.findById(req.params.id)
          const currentUser = await User.findById(req.body.userId)
          if (!user.followers.includes(req.body.userId)) {
            await user.updateOne({ $push: { followers: req.body.userId } })
            await currentUser.updateOne({ $push: { followings: req.params.id } })
            return res.status(200).json('user has been followed')
            
          } else  if (!currentUser.followings.includes(req.params.id)){
            await currentUser.updateOne({ $push: { followings: req.params.id } })
            return res.status(200).json('user has been followed')
          }else{
            res.status(403).json('you already follow this user')
          }
        } catch (err) {
          console.log(err);
          return res.status(403)
        }
      } else {
        return res.status(403).json('you cant follow yourself')
      }
    }catch(error){
      console.log(error);
    }
  },
  //..........................................................unfolowUser.......
  unfollowUser:async(req,res)=>{
    try{
      if (req.body.userId !== req.params.id) {
        try {
          const user = await User.findById(req.params.id)
          const currentUser = await User.findById(req.body.userId)
          if (user.followers.includes(req.body.userId)) {
            await User.updateOne({ $pull: { followers: req.body.userId } })
            await currentUser.updateOne({ $pull: { followings: req.params.id } })
            return res.status(200).json('user has unfollow')
          } else {
            res.status(403).json('you dont follow this user')
          }
        } catch (err) {
          return res.status(403).json(err)
        }
      } else {
        return res.status(403).json('you cant unfollow yourself')
      }
    }catch(error){
      console.log(error);
    }

  },

  //............................................................likendUnlike
  likeAndUnlike:async(req,res)=>{
      try {
        const post = await Posts.findById(req.params.id)
        if (!post.likes.includes(req.body.userId)) {
          await post.updateOne({ $push: { likes: req.body.userId } })
          res.status(200).json('post liked')
        } else {
          await post.updateOne({ $pull: { likes: req.body.userId } })
          res.status(200).json('post unliked')
        }
      } catch (err) {
        res.status(500).json(err)
      }
  }

}

