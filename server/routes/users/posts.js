
const Posts = require('../../models/userside/Posts')
const Comments = require('../../models/userside/Comment')
const User = require('../../models/userside/User')
const router = require('express').Router()
const multer = require('multer')
const storage = multer.memoryStorage()
const sharp = require('sharp')
const crypto = require('crypto')
const upload = multer({ storage: storage })
const { S3Client, PutObjectCommand, GetObjectCommand } = require("@aws-sdk/client-s3");
require('dotenv').config()
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");
const { log } = require('console')
const jwt = require('jsonwebtoken');
const { resolveSoa } = require('dns')
const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: 'do4my2sxk',
  api_key: '737763838648535',
  api_secret: '9eVoUyJjMQ05m0XGtsUYH99691Y',
  colors: true,
});

const bucketName = process.env.BUCKET_NAME;
const bucketRegion = process.env.BUCKET_REGION;
const accessKeyId = process.env.ACCESS_KEY;
const secretAccessKey = process.env.SCERET_ACCESS_KEY;

const generateFileName = (bytes = 32) => crypto.randomBytes(bytes).toString('hex')
const s3Client = new S3Client({
  credentials: {
    accessKeyId,
    secretAccessKey
  },
  region: bucketRegion,
})


// ................................createposts..........................................
// router.post('/',upload.single("image"), async (req, res) => {
//   console.log("enter");
//   const fileBuffer = await sharp(req.file.buffer).resize({ height: 1920, width: 1080, fit: "contain" }).toBuffer()
//  const imageName=generateFileName()

//   const uploadParams = {
//     Bucket: bucketName,
//     Body:fileBuffer,
//     Key:imageName,
//     ContentType: req.file.mimetype
//   } 
//   const command=new PutObjectCommand(uploadParams)

//   // await s3Client.send(new PutObjectCommand(uploadParams));
//   await s3Client.send(command)
//   const data={
//     userId:req.body.userId,
//     imageName:imageName
//   }
//   const newPost = new Posts(data)
//   console.log(newPost,"newPost");
//   try { 
//     const savedPost = await newPost.save()
//     res.status(200).json(savedPost)
//   } catch (err) {
//     console.log(err);
//     res.status(500).json(err)
//   }
// })

router.post('/', async (req, res) => {
  const { pic, message, userDetails } = req.body
  const token = userDetails;
  const decodedToken = jwt.verify(token, process.env.JWT_SECREAT_KEY);
  if (message && pic) {
    var data = {
      userId: decodedToken.id._id,
      caption: message,
      imageName: pic
    }
  } else if (message) {
    data = {
      userId: decodedToken.id._id,
      caption: message,
    }
  } else {
    data = {
      userId: decodedToken.id._id,
      imageName: pic,
    }
  }

  const newPost = new Posts(data)
  console.log(newPost, "newPost");
  try {
    const savedPost = await newPost.save()
    // res.redirect(`/api/posts/timeline/${savedPost.userId}`)
    res.status(200).json(savedPost)
  } catch (err) {
    console.log(err);
    res.status(500).json(err)
  }

})

// .......................................updatepost.....................................
router.put('/:id', async (req, res) => {
  try {
    const post = await Posts.findById(req.params.id)
    if (post.userId === req.body.userId) {
      await post.updateOne({ $set: req.body })
      res.status(200).json('post updated')
    } else {
      res.status(200).json('you can update only userpost')
    }
  } catch (err) {
    res.status(500).json(err)
  }
})
// ........................................deletePost.........................................
router.delete('/:id', async (req, res) => {
  try {
    const post = await Posts.findById(req.params.id)
    if (post.userId === req.body.userId) {
      await post.deleteOne()
      res.status(200).json('post deleted')
    } else {
      res.status(200).json('you can delete only userpost')
    }
  } catch (err) {
    res.status(500).json(err)
  }
})

// ..........................................like and unlike.....................................
router.put('/:id/like', async (req, res) => {
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
})

// ...............................................get a post......................................
router.get('/:id', async (req, res) => {
  try {
    const post = await Posts.findById(req.params.id)

    console.log(post, 'post');
    // res.status(200).json(post)
  } catch (err) {
    res.status(500).json(err)
  }
})

//..........................................................get  timeline.........................
router.get('/timeline/:userId', async (req, res) => {
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
})

//....................................................................commentPost......................................//
router.post('/:id/comment', async (req, res) => {
  const data = {
    userId: req.body.userId,
    postId: req.params.id,
    comment: req.body.comment
  }
  const newComment = new Comments(data);
  try {
    const savedComment = await newComment.save()
    console.log(savedComment, 'saveddd');
    const Post = await Posts.findById(req.params.id).updateOne({ $push: { comments: savedComment._id } })
    res.status(200).json(savedComment)
  } catch (error) {
    console.log(error);
  }

})

//...............................................................................getcomment........................................//
router.get('/:id/getComment', async (req, res) => {

  try {
    const comment = await Comments.find ({postId : req.params.id} ).populate('userId')
     res.status(200).json(comment)
  } catch (error) {
    console.log(error,'error');
  }
})

module.exports = router
