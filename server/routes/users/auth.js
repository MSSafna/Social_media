const router = require('express').Router()
const User = require('../../models/userside/User')
const bcrypt = require('bcrypt')
const { json } = require('express')
const {userRegigster,userLogin} =require('../../controller/users/auth')
const {checkUser}=require('../../middleware/Authmiddleware')


router.post('/',checkUser) 
// ..............................REGISTER..............................................
router.post('/register',userRegigster)
// ..........................................LOGIN.............................................
router.post('/login',userLogin)



module.exports = router
