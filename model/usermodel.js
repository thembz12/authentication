const mongoose = require ("mongoose")

const userSchema = new mongoose.Schema({
    fullname:{type:String},
    email:{type:String},
    password:{type:String},
    token:{type:String}
},{timestamps:true})

const myModel = mongoose.model("user", userSchema) 
module.exports = myModel