
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

});
 

//......................................getPosts...........................................................

router.get('/timeline/:userId',JWTVerify.JWTVerify,userController.getPosts)
// ........................................postposts..........................................

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

//................................................deleteCommet..............................
router.delete('/deletecomment',userController.deleteComment)


//................................................editPost...............................
router.put('/editpost',upload.single('file'),userController.editPost)

// ..........................................like and unlike.....................................
router.put('/:id/like', userController.likeAndUnlike)


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






module.exports = router
