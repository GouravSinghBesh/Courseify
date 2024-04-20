const mongoose = require("mongoose");

const Courses = new mongoose.Schema({
    courseName : {
        type : String,
        required : true
    },
    courseDescription : {
        type : String,
        required : true
    },
    instructor : {
        type : mongoose.Schema.Types.ObjectId,
        required : true,
        ref : "User"
    },
    whatYouWillLearn : {
        type : String,
        required : true
    },
    courseContent : {
        type : mongoose.Schema.Types.ObjectId,
        required : true,
        ref : "Section"
    },
    ratingAbdReview : {
        type : mongoose.Schema.Types.ObjectId,
        required : true,
        ref  : "RatingAndReview"
    },
    thumbnail : {
        type : String,
        required : true
    },
    price : {
        type : String,
        required : true
    },
    tag :{
        type : String,
        required : true
    },
    category : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Category"
    },
    studentsEnrolled : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User",
        required : true
    },
    status : {
        type : String,
        enum : ["Draft" , "Published"],
    }
})

module.exports = mongoose.model("Courses",Courses)