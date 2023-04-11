const router = require('express').Router()
const userController = require('../../controllers/userController')
const authController=require('../../controllers/authController')
const JWTVerify=require('../../middleware/JWTVerify')
const User=require('../../models/User')
const multer =  require('multer')
const upload = multer({
  storage: multer.diskStorage({}),

});
 

//................................signup.................................
router.post('/register',authController.userRegigster)

//.....................................login.............................
router.post('/login',authController.userLogin) // loginUser

//...................................searchUser........................
router.get('/searchuser',userController.getSearchUser)

//....................................getUserPost....................
router.get('/:id',JWTVerify.JWTVerify,userController.userPosts)

//...................................updateUserProfile..............
router.put('/updateprofile',userController.updateProfile)

//.....................................deleteProfile....................
router.delete('/deleteprofile/:id',userController.deleteProfile)
 
//.........................................updateprofileimage..................
router.put('/updateprofileimage',upload.single('file'),userController.updateprofileimage)

//.............................................bannerUpdate...................
router.put('/banner',upload.single('file'),userController.bannerUpdate)

//..................................................removeBanner...........
router.delete('/removebanner/:id',userController.removeBanner)

//....................................................getUserDetails......
router.get('/getuserdetails/:id',userController.getUserDetails)


//..................................................userSuggestion...........
router.get('/getsuggestions/:id',userController.getSUggestions)


//.......................................................followUSer........
router.put('/:id/follow',userController.followUser)

//..............................................................unfollowUser...
router.put('/:id/unfollow',userController.unfollowUser)











// .....................................................delete useraccount........................
router.delete('/:id', async (req, res) => {
  if (req.body.userId === req.params.id) {
    try {
      res.status(200).json('Account has been deleted')
    } catch (err) {
      res.status(500).json(err)
    }
  } else {
    return res.status(403).json('invalid id')
  }
})

// ..............................................get user.......................................//
router.get('/:id', async (req, res) => {
  console.log(req.params.id)
  try {
    const user = await User.findById(req.params.id)
    const { password, createdat, ...others } = user._doc
    res.status(200).json(others)
  } catch (err) {
    return res.status(500).json(err)
  }
})




module.exports = router
