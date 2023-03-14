const express = require('express');
const router = require('express').Router()
const User = require('../../models/userside/User')
const bcrypt = require('bcrypt')
const { json } = require('express')
const jwt =require("jsonwebtoken")

//..............................................adminloggin..............................//
 const adminLoggin=(async(req,res)=>{
    const credientials={
        email:'admin@gmail.com',
        password:"123"
    }   
    try{
     if(req.body.password==credientials.password && req.body.email==credientials.email){
       return res.json({admin:true});
     }
     if(req.body.password!= credientials.password){
        return res.json({password:true})
     }
     else{
        return res.json({})
     }
    }catch(error){
        console.log(error);
    }
})

//..........................................................getallusers.....................................//
const getallusers=(async(req,res)=>{
    console.log("reached");
    try{
     const allUsers=await User.find()
    return res.status(200).json(allUsers)
    }catch(error){
    res.status(500).json(error)
    }
})

module.exports={adminLoggin,getallusers}