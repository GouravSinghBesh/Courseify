const express = require("express");
const router = express.Router();

const {updateProfile,
    deleteAccount,
    getEnrolledCourses,
    getUserAllDetails,
    updateDisplayPicture} = require("../controllers/Profile")

const {auth} = require("../middlewares/auth");


router.put("/updateProfile",updateProfile);
router.delete("/deleteProfile",deleteAccount);
router.get("/getEnrolledCourses",getEnrolledCourses);
router.get("/getUserDetails",getUserAllDetails);
router.put("/updateDisplayPicture",updateDisplayPicture);


module.exports = router