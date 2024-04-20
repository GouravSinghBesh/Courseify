const User = require("../models/User");
const jwt = require("jsonwebtoken");
require("dotenv").config();


exports.auth = (req, res, next) => {
    try {
        const token = req.body.token || req.cookies.token || req.header("Authorisation").replace("Bearer", "");

        if (!token) {
            return res.status(400).json({
                success: false,
                message: "token is missing"
            })
        }
        try {
           const decode = jwt.verify(token,process.env.JWT_SECRET) ;
           console.log(decode);
           req.user = decode;
        } catch (error) {
            return res.status(401).json({
                success : false,
                message : "token is invalid"
            })
        }
        next();

    }
    catch(error){
        console.log(error);
        return res.status(400).json({
            success : false,
            message : "something went wrong while validating the token"
        })
    }
    
    
}

exports.isStudent = (req,res,next)=>{
        try {
            if(req.user.accountType != "student"){
                return res.status(400).json({
                    success : false,
                    message : "this is a proteted route for students only"
                })
            }
            next();
        } catch (error) {
            console.log(error);
            return res.status(400).json({
                success : false,
                message: "User role cannot be verified, please try again"
            })
        }
}

exports.isAdmin = (req,res,next)=>{
    try {
        if(req.user.accountType !=  "admin"){
            return res.status(400).json({
                success : false,
                message : "this is a protected route for admin only"
            })
        }
        next();
    } catch (error) {
        console.log(error);
            return res.status(400).json({
                success : false,
                message: "User role cannot be verified, please try again"
            })
    }
    
}

exports.isInstructor = (req,res,next)=>{
    try {
        if(req.user.accountType !=  "instructor"){
            return res.status(400).json({
                success : false,
                message : "this is a protected route for instructor only"
            })
        }
        next();
    } catch (error) {
        console.log(error);
            return res.status(400).json({
                success : false,
                message: "User role cannot be verified, please try again"
            })
    }
    
}