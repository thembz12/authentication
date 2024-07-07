const mongoose = require ("mongoose")
require ("dotenv").config()
const URL = process.env.database

mongoose.connect(URL).then(()=>{
    console.log(`database is established successfully`);
}).catch((error)=>{
    console.log(`unable to connect to database because`, error);
})