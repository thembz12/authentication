require("dotenv").config()
//import user model
const userModel = require ("../model/usermodel.js")
const {validateSignUp, validateSignIn}= require ("../middleware/uservalidation.js")
const bcrypt = require ("bcrypt")
const jwt = require ("jsonwebtoken") 

//create user 
const registerUser = async (req,res)=>{
    try {
        // extract the error object from the validator 
        const {error} = validateSignUp(req.body)
        if (error){
            res.status(400).json({
                message: error.details[0].message
            })
        }else {
            const {fullname, email, password, token}= req.body
            const userExist = await userModel.findOne({email})
            if(userExist){
                res.status(400).json({
                    message: "user with email already exist", email
                })
            }else{
                //perform an encryption using salt
                const saltedpassword = await bcrypt.genSalt(10)
                // perform an encryption of the salted password 
                const hashedPassword = await bcrypt.hash(password,saltedpassword)
                //create object of the body
                const data = {fullname,email, password: hashedPassword,token}
                const user = await userModel.create(data)
                res.status(201).json({
                    message: "user created successfully",data: user
                })
            }
        }
        
    } catch (error) {
        res.status(500).json(error.message)}}

    

const allUsers = async (req,res)=>{
    try {
        const users = await userModel.find()
        if(users.length <=0){
            return res.status(400).json({
                message:"no available registered users"
            })
        }else{
            res.status(200).json({
                message:"all resgistered users",
                totalUsersRegistered: users.length,
                data: users
            })
        }
        
    } catch (error) {
        res.status(500).json(error.message)
    }
}


const loginUser = async (req, res) =>{
    try{
        const {email, password} = req.body
        const {error} = validateSignIn(req.body);
        if(error){
            res.status(400).json({
                message: error.details[0].message
            })
        }else{
            // check for existing email
            const checkEmail = await userModel.findOne({email})
            if(!checkEmail){
                res.status(404).json({
                    message: "User not registered."
                })
            }else{
                // compare password
                const checkPassword = await bcrypt.compare(password, checkEmail.password)
                if(!checkPassword){
                    res.status(400).json({
                        message: "Wrong password"
                    })
                }else{
                    const token = await jwt.sign({
                        fullname: checkEmail.fullname,
                        email: email
                    }, process.env.JWT_SECRET, {expiresIn: "1h"})

                    checkEmail.token = token
                    const checkSignedUser ={
                        fullname: checkEmail.fullname,
                        email: checkEmail.email,
                        token
                    }

                    res.status(200).json({
                        message: "logged successfully",
                        data:checkSignedUser
                    })
                }
            }
        }
    }catch(error){
        res.status(500).json({
            message: error.message
        })
    }
}


const SignOutUser = async (req,res)=>{
    try {
      const token =  req.headers.authorizaton
      const userWithToken = await userModel.find({token})
      if(!userWithToken){
          res.status(400).json({
              message:"this user is not signed in"
          })
      }else{
          userWithToken.token = " "
          res.status(200).json({
              message:"user signout successfully"
          })
      }
      
    } catch (error) {
      res.status(500).json(error.message)
      
    }
  }
  



module.exports = {allUsers,loginUser, registerUser,SignOutUser} 