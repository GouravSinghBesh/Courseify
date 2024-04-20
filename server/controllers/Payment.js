const User = require("../models/User");
const Course = require("../models/Courses");
const { default: mongoose } = require("mongoose");
const { ObjectId } = require('mongodb');
// const { instannce } = require("../config/razorpay");
const { mailSender } = require("../utils/mailSender");

exports.capturePayment = async (req, res) => {
    const { courseId } = req.body;
    const userId = req.user.id;

    if (!courseId) {
        return res.json({
            success: false,
            message: 'Please provide valid course ID',
        })
    }

    let course;
    try {
        course = await Course.findById(courseId);

        if (!course) {
            return res.json({
                success: false,
                message: 'Could not find the course',
            });
        }

        //check if user already paid to this course or not
        const uid = ObjectId(userId);
        if (Course.studentsEnrolled.includes(uid)) {
            return res.status(400).json({
                success: false,
                message: "student already enrolled"
            })
        }


    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }

    //create order
    const options = {
        amount: course.price,
        currency: "INR",
        receipt: Math.random(Date.now()).toString(),
        notes: {
            courseId: courseId,
            userId
        }
    }

    try {
        // const paymentResponse = await instannce.orders.create(options);
        console.log(paymentResponse);

        return res.status(200).json({
            success: true,
            courseName: course.courseName,
            courseDescription: course.courseDescription,
            thumbnail: course.thumbnail,
            orderId: paymentResponse.id,
            amount: paymentResponse.amount,
            currency: paymentResponse.currency

        })
    } catch (error) {
        console.log(error);
        res.json({
            success: false,
            message: "Could not initiate order",
        });
    }

}

exports.verifySignature = async (req, res) => {

    const secret_key = 123456;
    const signature = req.headers["x-razorpay-signature"];

    const shasum = crypto.createHmac('sha256', secret_key)

    shasum.update(JSON.stringify(req.body))

    const digest = shasum.digest('hex')

    if (signature == digest) {
        console.log("payment is authorized")
        try {
            const { courseId, userId } = req.body.payload.payment.entity.notes;

            const enrolledCourse = await Course.findByIdAndUpdate({ _id: courseId }, {
                $push: {
                    studentsEnrolled: userId,
                }
            }, { new: true })

            if (!enrolledCourse) {
                return res.status(500).json({
                    success: false,
                    message: 'Course not Found',
                });
            }

            console.log(enrolledCourse);

            const enrolledStudent = await User.findByIdAndUpdate({ _id: userId }, {
                $push: {
                    courses: courseId
                }
            }, { new: true })

            console.log(enrolledStudent);

            //mail send krna h

            const emailResponse = await mailSender(enrolledCourse.email,
                "Congratulations from CodeHelp",
                "Congratulations, you are onboarded into new CodeHelp Course",)

            console.log(emailResponse);
            return res.status(200).json({
                success: true,
                message: "Signature Verified and Course Added",
            });
        } catch (error) {
            console.log(error);
            return res.status(500).json({
                success: false,
                message: error.message,
            });
        }
    }
    else {
        return res.status(400).json({
            success: false,
            message: 'Invalid request',
        });
    }

}