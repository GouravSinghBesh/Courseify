const mongoose = require("mongoose");

const section = new mongoose.Schema({
    sectionName : {
        type : String,
        required : true
    },
    subSection : {
        type : mongoose.Schema.Types.ObjectId,
        required : true,
        ref : "SubSection"
    }
})

module.exports = mongoose.model("Section",section);