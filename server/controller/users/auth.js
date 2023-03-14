const express = require('express');
const router = require('express').Router()
const User = require('../../models/userside/User')
const bcrypt = require('bcrypt')
const { json } = require('express')
const jwt =require("jsonwebtoken")
const maxAge=3*24*60*60;
const createToken=(id)=>{
  return jwt.sign({id},"Safna",{
    expiresIn:maxAge,
  })
}
//.........................................................user register..................
const userRegigster=(async(req,res)=>{
        try {
          const user=await User.findOne({$or:[{username:req.body.name},{ email:req.body.email }]}) 
          console.log("user");
          console.log(user);
          if(user){
            if(user.username==req.body.name){
              return res.json({name:true})
            }else if(user.email==req.body.email){
              return res.json({email:true})
            }
          }else {
            // generate new Password
            const hashedPassword = await bcrypt.hash(req.body.password, 10)
            // create new user
            const newUser = new User({
              username: req.body.name,
              password: hashedPassword,
              email: req.body.email,
              number: req.body.number,
              field: req.body.number
            })
           const user= await newUser.save()
           console.log(user);
           console.log("user");
            const token=createToken(user._id);
            res.cookie("jwt",token),{
              withCredentials:true,
              httpOnly:false,
              maxAge:maxAge * 1000
            }
            return res.json({user:true})
           // return res.json({user:user._id,created:true})
          }   
        }catch (err) {
          console.log("errr");
          console.log(err);
          res.status(500).json(err)
        }            
      }
)
//.......................................................userLogin....................................
const userLogin=(async(req,res,next)=>{
    try {
      const user = await User.findOne({email: req.body.email })
      if(!user){
        return res.json({email:true})
      }
      // validate password
      const validPassword = await bcrypt.compare(req.body.password, user.password)
      if(!validPassword){
          return res.json({password:true})  
      }
      const token=createToken(user);
            res.cookie("jwt",token),{
              withCredentials:true,
              httpOnly:false,
              maxAge:maxAge * 1000
              
            }
      return res.json({token})
    } catch (err) {
      res.status(500).json(err)
    } 
})

module.exports={userRegigster,userLogin}