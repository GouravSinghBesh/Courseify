const Course = require("../models/Courses");
const RatingAndReview = require("../models/RatingAndReview")

exports.createRating = async (req, res) => {
    try {
        const { rating, review, courseId } = req.body;
        const userId = req.user.id;

        //check user id already enrolled or not
        const courseDetails = await Course.findOne({
            _id: courseId
        },
            {
                studentsEnrolled: { $elemMatch: { $eq: userId } }
            });

        if (!courseDetails) {
            return res.status(400).json({
                success: false,
                message: "student is not  enrolled in this course"
            })
        }

        //check if user already commented on the course or not
        const alreadyReviewed = await RatingAndReview.findOne({ course: courseId, user: userId });

        if (alreadyReviewed) {
            return res.status(400).json({
                success: false,
                message: "student is already commented on this course"
            })
        }

        //create rating and review
        const ratingReview = await RatingAndReview.create({rating ,review,courseId,userId});

        //update in the course 
        const updatedCourseDetails = await Course.findByIdAndUpdate({courseId},{$push : {ratingAndReview : ratingReview._id}},{new : true});
        console.log(updatedCourseDetails);

        //return response
        return res.status(200).json({
            success : true,
            message : "rating created successfully"
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:error.message,
        })
    }
}

//getAverageRating
exports.getAverageRating = async (req, res) => {
    try {
            //get course ID
            const courseId = req.body.courseId;
            //calculate avg rating

            const result = await RatingAndReview.aggregate([
                {
                    $match:{
                        course: new mongoose.Types.ObjectId(courseId),
                    },
                },
                {
                    $group:{
                        _id:null,
                        averageRating: { $avg: "$rating"},
                    }
                }
            ])

            //return rating
            if(result.length > 0) {

                return res.status(200).json({
                    success:true,
                    averageRating: result[0].averageRating,
                })

            }
            
            //if no rating/Review exist
            return res.status(200).json({
                success:true,
                message:'Average Rating is 0, no ratings given till now',
                averageRating:0,
            })
    }
    catch(error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:error.message,
        })
    }
}


//getAllRatingAndReviews

exports.getAllRating = async (req, res) => {
    try{
            const allReviews = await RatingAndReview.find({})
                                    .sort({rating: "desc"})
                                    .populate({
                                        path:"user",
                                        select:"firstName lastName email image",
                                    })
                                    .populate({
                                        path:"course",
                                        select: "courseName",
                                    })
                                    .exec();
            return res.status(200).json({
                success:true,
                message:"All reviews fetched successfully",
                data:allReviews,
            });
    }   
    catch(error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:error.message,
        })
    } 
}