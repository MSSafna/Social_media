
const Posts = require('../../models/Posts')
const router = require('express').Router()
require('dotenv').config()
const multer =  require('multer')
const JWTVerify=require('../../middleware/JWTVerify')
const userController = require('../../controllers/userController')
// const storage=multer.memoryStorage();
// const upload=multer({storage:storage})
const upload = multer({
  storage: multer.diskStorage({}),
  limits: { fileSize: 1000000 },
});
 

//......................................getPosts...........................................................

router.get('/timeline/:userId',JWTVerify.JWTVerify,userController.getPosts)
// ........................................createposts..........................................

router.post('/',upload.single('file'), userController.postPost)

//..........................................postComment........................................
router.post('/:id/comment',userController.postComment)


//..........................................getcomment........................................
router.get('/:id/getcomment', userController.getComment)

//...........................................replayCOmment...................................
router.post('/:id/replaycomment',userController.replayComment)

//.............................................getReply.....................................
router.get('/:id/replaycomment',userController.getReply)


// ........................................deletePost.........................................
router.delete('/:id/deletepost', userController.deletePost)


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




module.exports = router
