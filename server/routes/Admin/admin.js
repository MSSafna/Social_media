const router = require('express').Router()
const adminController = require ('../../controllers/adminController')




router.post('/',adminController.adminLogin )

router.get('/allusers',adminController.getAllUsers)

router.put('/status',adminController.updateUserStatus)

module.exports =  router