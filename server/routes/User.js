const express = require("express");
const router = express.Router();

//import controllers
const {login,signUp,sendOTP,changePassword} = require("../controllers/Auth");
const {auth} = require("../middlewares/auth")

const {resetPassword,resetPasswordToken} = require("../controllers/ResetPassword");


//                                  Authentication routes
router.post("/login",login);
router.post("/signup",signUp);
router.post("/sendOtp",sendOTP);
router.post("/changePassword",auth,changePassword);

//                                     Reset Password

// Route for generating a reset password token
router.post("/reset-password-token",resetPasswordToken);

// Route for resetting user's password after verification
router.post("/reset-password",resetPassword);

module.exports = router;

