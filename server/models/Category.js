const Course = require("../models/Courses");
const mongoose = require("mongoose");

const categoryModel = new mongoose.Schema({
    name : {
        type : String,
        required  :true
    },
    description  :{
        type : String,
        required : true
    },
    courses : [{
        type : String,
        required : true
    }]
})

module.exports = mongoose.model("Category",categoryModel);