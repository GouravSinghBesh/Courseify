const Course = require("../models/Courses");
const User = require("../models/User");
const Category = require("../models/Category");
const {uploadImageToCloudinary} = require("../utils/imageUploader");

//createCourse handler function
exports.createCourse = async (req, res) => {
    try {

        //fetch data 
        console.log("create course started");
        const {courseName, courseDescription, whatYoutWillLearn, price, tag,category,status} = req.body;

        //get thumbnail
        const thumbnail = req.files.thumbnailImage;

        //validation
        if(!courseName || !courseDescription || !whatYoutWillLearn || !price || !tag || !thumbnail || !category || !status) {
            return res.status(400).json({
                success:false,
                message:'All fields are required',
            });
        }

        //check for instructor
        const userId = req.user.id;
        const instructorDetails = await User.findById(userId);
        console.log("Instructor Details: " , instructorDetails);
        //TODO: Verify that userId and instructorDetails._id  are same or different ?

        if(!instructorDetails) {
            return res.status(404).json({
                success:false,
                message:'Instructor Details not found',
            });
        }

        //check given category is valid or not
        const categoryDetails = await Category.findById(category);
        if(!categoryDetails) {
            return res.status(404).json({
                success:false,
                message:'Category Details not found',
            });
        }

        //Upload Image top Cloudinary
        const thumbnailImage = await uploadImageToCloudinary(thumbnail, process.env.FOLDER_NAME);

        //create an entry for new Course
        const newCourse = await Course.create({
            courseName,
            courseDescription,
            instructor: instructorDetails._id,
            whatYouWillLearn: whatYoutWillLearn,
            price,
            tag:tag,
            category : categoryDetails._id,
            thumbnail:thumbnailImage.secure_url,
            status : status
        })

        //add the new course to the user schema of Instructor
        await User.findByIdAndUpdate(
            {_id: instructorDetails._id},
            {
                $push: {
                    courses: newCourse._id,
                }
            },
            {new:true},
        );

        //update the category ka schema 
        await Category.findByIdAndUpdate({_id : category},{
            $push : {
                courses : newCourse._id,
            }
        },{new : true})
        

        //return response
        return res.status(200).json({
            success:true,
            message:"Course Created Successfully",
            data:newCourse,
        });

    }
    catch(error) {
        console.error(error);
        return res.status(500).json({
            success:false,
            message:'Failed to create Course',
            error: error.message,
        })
    }
};

//getAllCourses handler function

exports.getAllCourses = async (req, res) => {
    try {
            //TODO: change the below statement incrementally
            const allCourses = await Course.find({});

            return res.status(200).json({
                success:true,
                message:'Data for all courses fetched successfully',
                data:allCourses,
            })

    }
    catch(error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:'Cannot Fetch course data',
            error:error.message,
        })
    }
}

exports.getCourseDetails = async(req,res)=>{
    try {
        const {courseId} = req.body;

        const courseDetails = await Course.findById({
            _id : courseId
        }).populate({
            path : "instructor",
            populate : {
                path : "additionalDetails"
            }
        }).populate({
            path : "courseContent",
            populate  :{
                path : "SubSection"
            }
        }).populate("category").exec();

        console.log(courseDetails);

        if(!courseDetails){
            return res.status(400).json({
                success : false,
                message : `could not find the course with course id:${courseId}`
            })
        }
        return res.status(200).json({
            success : true,
            message : "course details fetched successfully",
            data  : courseDetails
        })
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:error.message,
        });
    }
}