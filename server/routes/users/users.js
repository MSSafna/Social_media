const router = require('express').Router()
const bcrypt = require('bcrypt')
const JwtVerify=require('../../middleware/JWTVerify')
const userController = require('../../controllers/userController')
const authController=require('../../controllers/authController')
const JWTVerify=require('../../middleware/JWTVerify')



//................................signup.................................
router.post('/register',authController.userRegigster)

//.....................................login.............................
router.post('/login',authController.userLogin) // loginUser

//...................................searchUser........................
router.get('/searchuser',userController.getSearchUser)

//....................................getUserPost....................
router.get('/:id',JWTVerify.JWTVerify,userController.userPosts)




 




// ............................................Update userAccount......................................
router.put('/:id', async (req, res) => {
  if (req.body.userId === req.params.id || req.user.isAdmin) {
    if (req.body.password) {
      try {
        req.body.password = await bcrypt.hash(req.body.password, 10)
      } catch (err) {
        return res.status(500).json(err)
      }
    }
    try {
      console.log(req.body)
      res.status(200).json('Account has been updated')
    } catch (err) {
      res.status(500).json(err)
    }
  } else {
    return res.status(403).json('invalid id')
  }
})

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

// ................................................followers and followings............................
router.put('/:id/follow', async (req, res) => {
  if (req.body.userId !== req.params.id) {
    try {
      const user = await User.findById(req.params.id)
      const currentUser = await User.findById(req.body.userId)
      if (!user.followers.includes(req.body.userId)) {
        await user.updateOne({ $push: { followers: req.body.userId } })
        await currentUser.updateOne({ $push: { followings: req.params.id } })
        return res.status(200).json('user has been followed')
      } else {
        res.status(403).json('you already follow this user')
      }
    } catch (err) {
      return res.status(403)
    }
  } else {
    return res.status(403).json('you cant follow yourself')
  }
})

// .......................................................unfollowUser...............................//

router.put('/:id/unfollow', async (req, res) => {
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
})


module.exports = router
