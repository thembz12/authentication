
// const { validateSignUp } = require("./middleware/uservalidation")
const { loginUser, SignOutUser } = require("./controller/controller")
const { validateSignUp, validateSignIn } = require("./middleware/uservalidation")
const userModel = require ("./model/usermodel.js")

const registerUser = async (req,res)=>{
    try {
        const {error} = validateSignUp(req.body)
        if(error){
            res.status(400).json({message:error.details[0].message})
        }else{
            const {fullname, email, password, token}= req.body
            const userExist = await userModel.findOne({email})
            if(userExist){
                res.status(400).json({message:"exsiting user already exixt with this email",email})
            }else{
                const saltedpassword = await bcrypt.genSalt(10)
                const hashedPassword = await bcrypt.hash(password, saltedpassword)
                const data = {fullname, email, password:hashedPassword, token}
                const user = await userModel.create(data)
                res.status(201).json({message:"successfully created", user})}}
    } catch (error) {
        res.status(500).json(error.message)}}

const loginUser = async (req,res)=>{
    try {
        const {email, password}=req.body
        const {error} = validateSignIn (req.body)
        if(error){
            res.status(400).json({messagge:error.details[0].message})
        }else{
            const checkEmail = await userModel.findOne({email})
            if(!checkEmail){
                res.status(400).json({message:"invalid email",email})
            }else{
                const checkPassword = await bcrypt.compare(password, checkEmail.password)
                if(!checkPassword){
                    res.status(400).json({message:"wrong password"})
                }else{
                    const token = await jwt.sign({
                        fullname: checkEmail.fullname,
                        email:email
                    }, process.env.JWT_SECRET,{expiresIn: "1h"})
                    res.status(200).json({message:"logged in successfully", token})}}}
    } catch(error){
        res.status(500).json(error.message)
    }
}

const allUsers = async (req,res)=>{
    try{
        const users = await userModel.find()
        if(users.length <=0){
            res.status(400).json({message:"no registered user on database"})}
            else{
                res.status(200).json({message:"all registered user", users: users.length,user})
                
            }
        

    }catch(error){
        res.status(500).json(error.message)
    }
} 

const SignOutUser = async (req,res)=>{
    try{
        const token = req.headers.authorization
        const usersWithToken = await userModel.find()
        if(!usersWithToken){
            res.status(400).json({message:"user is not login In"})
        }else{
            usersWithToken.token = " "
            res.status(200).json({message:"user logged out successfully", token})
        }

    }catch(error){
        res.status(500).json(error.message)
    }
} 


module.exports = {registerUser, loginUser, SignOutUser, allUsers}





































// const registerUser = async (req,res)=>{
// try{
//     const {error} = validateSignUp (req.body)
//     if(error){
//         res.status(400).json({message:error.details[0].message})
//     } else{
//     const {fullname, email , password}=req.body
//     const existUser = await userModel.findOne({email})
//     if(existUser){
//        res.status(404).json({message: 'user with the email already exixt', email})
//     }else{
//         const saltedpassword = await bcrypt.genSalt(10)
//         const hashedPassword= await bcrypt.hash(password , saltedpassword)
//         const data = {fullname, email, password; hashedPassword }
//         const user = await userModel.create(data)
//         res.status(201).json({message:"created successfully", user})
//     }
// }
//     } catch(error){
//         res.status(500).json(error.message)
    
//     }}
//     module.exports = registerUser


//     const loginUser = async (req,res)=>{
//         try{
//            const {email, password} =req.body
//            const {error} = validateSignUp (req.body)
//         if(error){
//             res.status(400).json({message:error.details[0].message})
//         }else{
//             const checkEmail = await userModel.findOne({email})
//             }if(!checkEmail){
//                 res.status(400).json({message:"invalid email"})
//             }else{
//                 const checkPassword = await bcrypt.compare(password, password.checkEmail)    
//             }if(!checkPassword){
//                 res.status(400).json({message:"wrong password", checkPassword})
//             }else 
//             const token = await jwt.sign({
//                 fullname: checkEmail.fullname,
//                 email:email
//             }, process.env.JWT_SECRECT,{expiresIn: "1h"})
//             res.status(200).json({message:"logged in successfully", token}) 
//             }catch(error){
//              }}
// module.exports = loginUser



    