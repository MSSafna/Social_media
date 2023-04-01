const User = require('../models/User')
const Posts=require('../models/Posts')
const Comment=require('../models/Comment')
const jwt = require("jsonwebtoken");
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
    getPosts:async(req,res)=>{
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
    
      const file = req.file.path;
    
      try {
        const imageUrl = await new Promise((resolve, reject) => {
          cloudinary.uploader.upload(file, (err, result) => {
            if (err) {
              reject(err);
            } else {
              resolve(result.url);
            }
          });
        });
    
        const data = {
          userId: userId,
          caption: message,
          imageName: imageUrl,
        };
    
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
    getSearchUser:async (req,res)=>{
      const{value}=req.query
      console.log(value);
        const regex = new RegExp(value, 'i');
        if(regex.test('')){
           res.json([])
        }else{
        const users = await User.find({ username: regex });
        if(users.length==0){
            res.json({userNotFound:true})
        }else{
          res.json(users)
        }
              
        }
        
    },

    //....................................................postComment....................................
    postComment:async(req,res)=>{
      const data = {
        userId: req.body.userId,
        postId: req.params.id,
        comment: req.body.comment
      }
      const newComment = new Comment(data);
      try {
        const savedComment = await newComment.save()
        const Post = await Posts.findById(req.params.id).updateOne({ $push: { comments: savedComment._id } })
        const comment=await Comment.findOne({_id:savedComment._id}).populate('userId').sort('-createdAt')
        res.status(200).json(comment)
      } catch (error) {
        console.log(error);
      }
    },
  
    //.............................................................getComment....................................
  getComment:async(req,res)=>{
   try {
    const comment = await Comment.find({postId : req.params.id, parentcomment:{$exists:false}} ).populate('userId').sort('-createdAt') 
    res.status(200).json(comment)
  } catch (error) {
    console.log(error,'error');
  }
    },

//...................................................getReplycomment...........................

    getReply:async(req,res)=>{
      try{
       const replayComment= await Comment.find({parentcomment:req.params.id}).populate('userId').sort('-createdAt')
       res.json(replayComment)
      }catch(error){
        console.log(error);
      }
    },
    //...................................................................postReplyComment........................
    replayComment:async(req,res)=>{
      try{
        const data={
          userId:req.body.userId,
          postId:req.body.postId,
          parentcomment:req.params.id,
          comment:req.body.comment
          
        }
        const replayComment=new Comment(data);
         const savedReplyComment=await replayComment.save()
         console.log(savedReplyComment,'savedReplyComment');
         const  newComment= await Comment.findOne({_id:savedReplyComment._id}).populate('userId').sort('-createdAt')
         res.json(newComment)
      }catch(error){
        res.status(500).json(error)
      }
      
    },
  
    //...........................................................deletePost...................................
    deletePost:async (req, res) => {
      console.log('reached');
      // try {
      //   const post = await Posts.findById(req.params.id)
      //   if (post.userId === req.body.userId) {
      //     await post.deleteOne()
      //     res.status(200).json('post deleted')
      //   } else {
      //     res.status(200).json('you can delete only userpost')
      //   }
      // } catch (err) {
      //   res.status(500).json(err)
      // }
      const deleteComment=await Comment.deleteMany({postId:req.params.id})
      const deletePost=await Posts.deleteOne({_id:req.params.id})
      res.json('succcessfully deleted')
    },

    //.................................................................getUserPosts..............................
    userPosts:async(req,res)=>{
     const userPost=await Posts.find({userId:req.params.id}).sort({ _id: - 1 }).populate('userId')
     res.json(userPost)

  
    }

}
