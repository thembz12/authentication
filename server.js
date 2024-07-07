const express = require ("express")
require ("dotenv").config()

const router = require("./router/userRouter.js")
require ("./config/db.js")
const port = process.env.port  
const app = express() 
app.use(express.json())
app.use(router)
 
app.listen(port,()=>{
    console.log("server is listening to port", port);   
}) 