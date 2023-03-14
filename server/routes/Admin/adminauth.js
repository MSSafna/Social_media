const router = require('express').Router()
const bcrypt = require('bcrypt')
const { json } = require('express')
const {adminLoggin,getallusers}=require('../../controller/admin/adminauth')

//........................................adminlogin.......................//
router.post("/login",adminLoggin)

//..........................................getallusers..................//
router.get('/users',getallusers)

module.exports=router