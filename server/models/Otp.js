const mongoose = require("mongoose");

const otpSchema = new mongoose.Schema({
    email : {
        type : String,
        required : true
    },
    otp : {
        type : Number,
        required : true
    },
    createdAt : {
        type : Date,
        required : true,
        default : Date.now(),
        expires : 35*60
    }
})

module.exports = mongoose.model("Otp",otpSchema);