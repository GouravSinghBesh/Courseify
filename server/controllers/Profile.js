// const { useSelector } = require("react-redux");
const { useSelector } = require("react-redux");
const { findById } = require("../models/Courses");
const Profile = require("../models/Profile");
const User = require("../models/User");
const {uploadImageToCloudinary} = require("../utils/imageUploader");

exports.updateProfile = async(req,res)=>{
    try {
        console.log("inside updateProfile")
        const{dateOfBirth = "",about = "",contactNumber,gender} = req.body;

        if(!contactNumber || !gender ){
            return res.status(400).json({
                success : false,
                message : "all fields are required"
            })
        } 
        // const {user} = useSelector((state)=>state.profile)
        // const ProfileId = await User.findById(user.additionDetails);
        const id = req.user.id;
        console.log("id : ",id);
        const userDetails = await findById(id);
        console.log("userDetails : ",userDetails);
        const ProfileId = await findById(userDetails.additionDetails) ;
        console.log(" :profileid ",ProfileId);
        const ProfileDetails = await findById(ProfileId);
        console.log("profileDetails : ",ProfileDetails);

        ProfileDetails.dateOfBirth = dateOfBirth;
        ProfileDetails.about = about;
        ProfileDetails.contactNumber = contactNumber;
        ProfileDetails.gender = gender;

        await ProfileDetails.save();

        return res.status(200).json({
            success:true,
            message:'Profile Updated Successfully',
            profileDetails,
        });

    } catch (error) {
        return res.status(500).json({
            success:false,
            message : "Profile is not updated",
            error:error.message,
        });
    }
}

exports.deleteAccount = async (req,res)=>{
    try {
        const id = req.user.id;
        const user = await User.findById(id);
        if(!user){
            return res.status(404).json({
                success : false,
                message : "user not found"
            })
        }

        await Profile.findByIdAndDelete(id.additionDetails);
        await User.findByIdAndDelete(id);

        return res.status(200).json({
            success:true,
            message:'User Deleted Successfully',
        })

    } catch (error) {
        return res.status(500).json({
            success:false,
            error:error.message,
        });
    }
}

exports.getUserAllDetails = async(req,res)=>{
    try {
        const userId = req.user.id;
        console.log(userId)

        const userDetails = await User.findById(userId).populate("additionalDetails").exec();

        console.log(userDetails);
        return res.status(200).json({
            success : true,
            message : "user Data Fetched successfully",
            data : userDetails
        })
    } catch (error) {
        return res.status(500).json({
			success: false,
			message: error.message,
		});
    }
}

exports.updateDisplayPicture = async(req,res)=>{
    try {
        // const userId = req.user.id;
        console.log("inside server")
        const {user} = useSelector((state)=>state.profile)
        const displayPicture = req.files.displayPicture;

        const image = await uploadImageToCloudinary(
            displayPicture,
            process.env.FOLDER_NAME,
            1000,1000
        );
        console.log("find user and updating profile picture")
        const updatedProfile = await User.findByIdAndUpdate(
            {_id : user._id},
            {image: image.secure_url},
            {new : true}
        );

        return res.status(200).json({
            success : true,
            message : "profile picture updated successfully",
            data : updatedProfile,
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
          })
    }
}

exports.getEnrolledCourses = async(req,res)=>{
    try {
        const userId = req.user.id;
         
        const userDetails = await User.findById({_id : userId}).populate("courses").exec();

        if(!userDetails){
            return res.status(400).json({
                success : false,
                message : `could not find user with id : ${userId}`
            })
        }

        return res.status(200).json({
            success : true,
            message : "fetched enrolled courses successfully",
            data : userDetails.courses,
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
          })
    }
}