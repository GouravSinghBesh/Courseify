const express = require("express");
const router = express.Router();

const {createCourse,getAllCourses,getCourseDetails} = require("../controllers/Course");
const {createCategory,showAllCategory,categoryPageDetails} = require("../controllers/Category");
const {createSection,updateSection,deleteSection} = require("../controllers/Section")
const {createSubSection,updateSubSection,deleteSubSection} = require("../controllers/SubSection");
const {createRating,getAverageRating,getAllRating} = require("../controllers/RatingAndReview");

const {auth,isAdmin,isInstructor,isStudent} = require("../middlewares/auth")

//                              course route

//courses can be only created by instructor
router.post("/createCourse",auth,isInstructor,createCourse);
router.get("/getAllCourses",getAllCourses);
router.get("/getCourseDetails",getCourseDetails);

router.post("/createSection",auth,isInstructor,createSection);
router.get("/updateSection",auth,isInstructor,updateSection);
router.get("/deleteSection",auth,isInstructor,deleteSection);

router.post("/createSubSection",auth,isInstructor,createSubSection);
router.put("/updateSubSection",auth,isInstructor,updateSubSection);
router.delete("/deleteSubSection",auth,isInstructor,deleteSubSection);

//                  rating and review                   
router.post("/createRating",auth ,isStudent,createRating);
router.get("/getAverageRating",getAverageRating);
router.get("/getAllRating",getAllRating);

//                      category route (only for admin)
router.post("/createCategory",auth,isAdmin,createCategory);
router.get("/showAllCategory",showAllCategory);
router.get("/categoryPageDetail",categoryPageDetails);

module.exports = router;