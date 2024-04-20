const mongoose = require("mongoose");
require("dotenv").config();

const dbconnect = ()=>{
    mongoose.connect(process.env.DB_URL)
    .then(()=>{console.log("database connected successfully")})
    .catch((error)=>{
        console.log("error while connecting to database");
        console.log(error);
    })
}

module.exports = dbconnect;