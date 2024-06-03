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
    },
    courseContent : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Section"
    },
    ratingAndReview : [{
        type : mongoose.Schema.Types.ObjectId,
        ref  : "RatingAndReview"
    }],
    thumbnail : {
        type : String, 
    },
    price : {
        type : String,
    },
    tag :{
        type : [String],
        required : true
    },
    category : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Category"
    },
    studentsEnrolled : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : "User",
        required : true
    }],
    status : {
        type : String,
        enum : ["Draft" , "Published"],
    },
    instructions: {
		type: [String],
	},
})

module.exports = mongoose.model("Courses",Courses)