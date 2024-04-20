const mongoose = require("mongoose");

const Profile = new mongoose.Schema({
    gender : {
        type : String,
    },
    contactNumber : {
        type : Number,
        trim : true
    },
    dateOfBirth : {
        type : String,
        
    },
    about : {
        type : String,
        
    }
})

module.exports = mongoose.model("Profile",Profile);