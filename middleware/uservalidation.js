const Joi = require("@hapi/joi")
//validate signUp 
const validateSignUp = (data)=>{
    const signUp = Joi.object({
        fullname: Joi.string().required().max(20),
        email:Joi.string().required().email(),
        password:Joi.string().required()
    })
    //validate signUp varriable 
    return signUp.validate(data)
}
module.exports.validateSignUp = validateSignUp 

//validate signIn 
const validateSignIn = (data)=>{
    const signIn = Joi.object({
        email:Joi.string().required().email(),
        password:Joi.string().required()
    })
    // validate signIn
    return signIn.validate(data)
}
module.exports.validateSignIn = validateSignIn 

