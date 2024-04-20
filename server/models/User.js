const mongoose = require("mongoose");

const User = new mongoose.Schema({
    firstName : {
        type : String,
        required : true
    },
    lastName : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true
    },
    password : {
        type : String,
        required : true
    },
    additionalDetails : {
        type : mongoose.Schema.Types.ObjectId,
        required : true,
        ref : "Profile"
    },
    accountType : {
        type : String,
        enum : ["student","admin","instructor"],
        required : true
    },
    courses : [{
        type: mongoose.Schema.Types.ObjectId,
        ref : "Courses"
    }],
    image : {
        type : String,
        required : true
    },
    token: {
        type: String,
    },
    resetPasswordExpires: {
        type: Date,
    }

})

module.exports = mongoose.model("User",User);