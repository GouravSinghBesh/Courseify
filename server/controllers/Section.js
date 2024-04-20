const Course = require("../models/Courses");
const Section = require("../models/Section");


exports.createSection = async (req, res) => {
    try {
        const { courseId, sectionName } = req.body;

        //validation
        if (!courseId || !sectionName) {
            return res.status(400).json({
                success: false,
                message: "missing properties"
            })
        }

        //create a db entry
        const newSection = await Section.create({ sectionName });

        //add section Id to its course
        const updatedCourseDetails = await Course.findByIdAndUpdate(courseId, {
            $push: {
                courseContent: newSection._id,
            }
        }, { new: true });

        return res.status(200).json({
            success : true,
            message : "Section created successfully",
            updatedCourseDetails
        })
    } catch (error) {
        console.log(error);
        return res.status(400).json({
            success: false,
            message: "Unable to create Section, please try again"
        })
    }
}

exports.updateSection = async(req,res)=>{
    try {
        //fetch data
        const{sectionName,sectionId} = req.body;

        //validate
        if (!sectionId || !sectionName) {
            return res.status(400).json({
                success: false,
                message: "missing properties"
            })
        }

        //section find in db and update
        const updatedSection = await Section.findByIdAndUpdate(sectionId,{
            $push : {
                sectionName : sectionName,
            }
        },{new : true});

        //return res
        return res.status(200).json({
            success : true,
            message : "Section updated successfully",
        })

    } catch (error) {
        console.log(error);
        return res.status(400).json({
            success: false,
            message: "Unable to create Section, please try again"
        })
    }
}

exports.deleteSection = async(req,res)=>{
    try {
        //fetch data from parameter
        const{sectionId} = req.params;

        //find in db and delete
        await Section.findByIdAndDelete(sectionId);

        //return res
        return res.status(200).json({
            success : true,
            message : "Section deleted successfully",
        })

    } catch (error) {
        console.log(error);
        return res.status(400).json({
            success: false,
            message: "Unable to delete Section, please try again"
        })
    }
}