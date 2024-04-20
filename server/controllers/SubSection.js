const SubSection = require("../models/SubSection");
const Section = require("../models/Section");
const { uploadImageToCloudinary } = require("../utils/imageUploader");
require("dotenv").config();

exports.createSubSection = async (req, res) => {
    try {
        //data fetch
        const { title, description, timeDuration, sectionId } = req.body;
        const video = req.files.videoFile;

        //validate
        if (!title || !description || !timeDuration || !sectionId) {
            return res.status(400).json({
                success: false,
                message: "property missing"
            })
        }

        //upload video to cloudinary
        const uploadDetails = await uploadImageToCloudinary(video, process.env.FOLDER_NAME);

        //create subsection
        const newSubSection = await subSection.create({ title, description, timeDuration, videoUrl: uploadDetails.secure_url }, { new: true });

        //update its id in section
        const updatedSubSection = await Section.findByIdAndUpdate(sectionId, {
            $push: { subSection: newSubSection._id }
        }, { new: true });

        //return response
        return res.status(200).json({
            success: true,
            message: "subsection created successfully",
            updatedSubSection
        })
    } catch (error) {
        console.log(error);
        return res.status(400).json({
            success: false,
            message: "Unable to delete Section, please try again"
        })
    }
}

exports.updateSubSection = async (req, res) => {
    try {
        const { title, description, subSectionId } = req.body;
        const subSection = await SubSection.findById(subSectionId);

        if (!subSection) {
            return res.status(400).json({
                success: false,
                message: "subsection not found"
            })
        }

        if (title !== undefined) {
            subSection.title = title;
        }

        if (description !== undefined) {
            subSection.description = description;
        }

        if (req.files && req.files.video !== undefined) {
            const video = req.files.video
            const updateDetails = await uploadImageToCloudinary(video, process.env.FOLDER_NAME);

            subSection.videoUrl = updateDetails.secure_url;
            subSection.timeDuration = `${updateDetails.duration}`;
        }

        await subSection.save();

        return res.status(200).json({
            success: true,
            message: "subSection updated successfully"
        })

    } catch (error) {
        console.error(error)
        return res.status(500).json({
            success: false,
            message: "An error occurred while updating the section",
        })
    }
}

exports.deleteSubSection = async (req, res) => {
    try {
        const { subSectionId, sectionId } = req.body;

        await Section.findByIdAndUpdate({ _id: sectionId }, {
            $pull: {
                subSection: subSectionId
            }
        })


        const subSection = await SubSection.findByIdAndDelete({ _id: subSectionId });

        if (!subSection) {
            return res.status(400).json({
                success: false,
                message: "subSection not found"
            })
        }

        return res.status(200).json({
            success: true,
            message: "subSection deleted successfully"
        })
    } catch (error) {
        console.error(error)
        return res.status(500).json({
            success: false,
            message: "An error occurred while deleting the SubSection",
        })
    }
}