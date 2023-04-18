const User = require("../models/User")

let credential ={
    email :"admin@gmail.com",
    password:123
  }

  //......adminLogin
  module.exports={
      adminLogin:(req,res) => {
        const{email, password} = req.body
      
        try{
          if(email == credential.email && password == credential.password){
            res.status(200).json ('adminLogged')
            
          }else{
            res.status(400).json("Invalid login details")
          }
        }catch(err){
          console.log(err);
        }
        },

        //......................................getAllusers
        getAllUsers:async(req,res) => {
            try{
                const allUsers =await  User.find()
                res.status(200).json(allUsers)
            }catch (err){
                res.status(400).json(err)
            }

        },
        //................................................updateUserStatus
        updateUserStatus:async(req,res) => {
            console.log('reachedddd');
            console.log(req.query);
    
         try{
             const updateStatus = await User.updateOne({_id:req.query.userId},{$set:{status:req.query.status}})
             res.status(200).json(updateStatus)
         }catch(err){
            console.log(err);
            res.status(400).json(err)
         }

        },
        //...............................................getAllReports
        
        
  }