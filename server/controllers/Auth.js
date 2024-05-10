const User = require("../models/User");
const Otp = require("../models/Otp");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const otpGenerator = require("otp-generator");
const mailSender = require("../utils/mailSender");
const {passwordUpdate} = require("../mail/templates/passwordUpdate");
const { response } = require("express");
const Profile = require("../models/Profile");

exports.sendOTP = async (req,res)=>{
    try{
    const {email} = req.body;

    //check if user is already signup or not
    const user = await User.findOne({email});
    if(user){
        return res.status(400).json({
            success : false,
            message : "user already signup"
        })
    }

    var otp = otpGenerator.generate(6,{
        upperCaseAlphabets : false,
        lowerCaseAlphabets : false,
        specialChars : false
    })

    //check this otp is unique or not
    let result = await Otp.findOne({otp : otp});
     while(result){
        otp = otpGenerator.generate(6,{
            upperCaseAlphabets : false,
            lowerCaseAlphabets : false,
            specialChars : false
        })
        result = await Otp.findOne({otp: otp});
     }

     const otpBody = await Otp.create({email,otp});
     res.status(200).json({
        success : true,
        message : "Otp sent successfully",
        otp
     })
}
catch(error){
    console.log(error);
    res.status(400).json({
        success : false,
        message : "error occured while sending otp"
    })
}
}

exports.signUp = async(req,res)=>{
    try{
    const {firstName,
    lastName,
    email,
    password,
    confirmPassword,
    contactNumber,
    otp,
    accountType
    } = req.body;

    if(!firstName || !lastName || !email || !password || !confirmPassword ){
        return res.status(403).json({
            success : false,
            message  : "all fields are mandatory,Please fill all the details"
        })
    }

    if(password != confirmPassword){
        return res.status(400).json({
            success : false,
            message : "password does not match with confirm password"
        })
    }

    const existingUser = await User.findOne({email});
    console.log(existingUser);
    if(existingUser){
        return res.status(400).json({
            success : false,
            message : "user already sign up"
        })
    }

    const recentotp = await Otp.find({email}).sort({createdAt:-1}).limit(1);
    console.log(recentotp);
    //Problem-1
    // if(recentotp.length === 0){
    //     return res.status(404).json({
    //         success : false,
    //         message : "otp not found"
    //     })
    // }else if(otp === recentotp[0].otp){
    //     //invalid otp
    //     console.log(otp);
    //     console.log(recentotp[0].otp);
    //     return res.status(400).json({
    //         success : false,
    //         message : "Invalid OTP"
    //     })
    // }
   
    console.log("password Hashing started");
    let hashedPassword =await bcrypt.hash(password,10);
    console.log(hashedPassword);

    //create the additional profile for user
    const profileDetails = await Profile.create({
        gender : null,
        contactNumber : contactNumber,
        dateOfBirth : null,
        about : null
    })
    console.log(profileDetails);

    const newUser = await User.create({
        firstName,
        lastName,
        email,
        additionalDetails : profileDetails._id,
        accountType : accountType,
        contactNumber,
        password:hashedPassword,
        image : `https://api.dicebear.com/8.x/initials/svg?seed=${firstName} ${lastName}`,
        })
    console.log(newUser)
    

    res.status(200).json({
        success : true,
        message : "User signup successfully",
        newUser,
    })

    }
    catch(error){
        res.status(400).json({
            success : false,
            message : "user cannot be registered .Please signup again"
        })
    }

}

exports.login = async (req,res)=>{
    try{
    const{email,password} = req.body;
    if(!email || !password){
        return res.status(400).json({
            success : false,
            message : "Please fill all the feilds"
        })
    }

    const user = await User.findOne({email : email});
    if(user.length == 0){
        return res.status(404).json({
            success : false,
            message : "User not registered .Please signup first"
        })
    }

    if(await bcrypt.compare(password,user.password)){
        //if password matched generate JWT token and cookies
        const payload = {
            email : email,
            id : user._id,
            accountType : user.accountType
        }
        const token = jwt.sign(payload,process.env.JWT_SECRET,{expiresIn : "2h"});
        user.token = token;
        user.password = undefined;//why?

        const options = {
            expiresIn : 3 *24*60*60*1000,
            httpOnly :  true 
        }
         
        res.cookie("token",token,options).json({
            success : true,
            message : "user login successfully",
            token,
            user
        })

    }
    else{
        return res.status(400).json({
            success : false,
            message : "password is incorrect"
        });
    }
}
catch(error){
    res.status(400).json({
        success : false,
        message : "error while login.Please try again"
    })
}
}

exports.changePassword = async (req,res)=>{
    try {
        const userId = req.user.id;
        const {oldPassword,newPassword,confirmPassword} = req.body;

        //validation
        if(newPassword != confirmPassword){
            return res.status(400).json({
                success : false,
                message : "newPassword and confirm password does not match"
            })
        }

        //fetch user
        const userDetails = await User.findById(userId);

        const isPasswordMatched = bcrypt.compare(userDetails.password,oldPassword);

        if(!isPasswordMatched){
            return res.status(400).json({
                success : false,
                message : "the password is incorrect"
            })
        }

        const encryptedPassword = await bcrypt.hash(newPassword,10);

        //update in db
        const updatedUserDetails = await User.findByIdAndUpdate({userId},{$push: {
                                                                password : encryptedPassword
        }},{new: true});

        //mail send krna h
        try {
            const emailResponse = await mailSender(updatedUserDetails.email,"password updated successfully",passwordUpdate(userDetails.email,`Password updated successfully for ${userDetails.firstName} ${userDetails.lastName}`));

            console.log("email sent successfully",emailResponse)

        } catch (error) {
            // If there's an error sending the email, log the error and return a 500 (Internal Server Error) error
			console.error("Error occurred while sending email:", error);
			return res.status(500).json({
				success: false,
				message: "Error occurred while sending email",
				error: error.message,
			});
        }

       // return response
       return res.status(200).json({
        success : true,
        message : "password changed successfully"
       })
    } catch (error) {
        // If there's an error updating the password, log the error and return a 500 (Internal Server Error) error
		console.error("Error occurred while updating password:", error);
		return res.status(500).json({
			success: false,
			message: "Error occurred while updating password",
			error: error.message,
		});
    }
}