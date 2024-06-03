import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { HiOutlineCurrencyRupee } from "react-icons/hi";
import { addCourseDetails, editCourseDetails, fetchCourseCategories } from '../../../../../services/operations/courseDetailsAPI';
import RequirementField from './RequirementField';
import { setStep, setCourse } from "../../../../../slices/courseSlice"
import { useDispatch, useSelector } from 'react-redux';
import IconBtn from "../../../../common/IconBtn"
import { COURSE_STATUS } from "../../../../../utils/constants"
import toast from 'react-hot-toast';
import { MdNavigateNext } from "react-icons/md";
import Upload from '../Upload';
import ChipInput from './ChipInput';

const CourseInformationForm = () => {
    const [courseCategories, setCourseCategories] = useState([])
    const [loading, setLoading] = useState(false)
    const { editCourse, course } = useSelector((state) => state.course)
    const { token } = useSelector((state) => state.auth)
    const dispatch = useDispatch()

    const { register,
        setValue,
        getValues,
        handleSubmit,
        formState: { errors }
    } = useForm()

    useEffect(() => {
        const getCategories = async () => {
            setLoading(true);
            const categories = await fetchCourseCategories();
            if (categories.length > 0) {
                setCourseCategories(categories)
            }
            setLoading(false);
        }

        if (editCourse) {
            setValue("courseTitle", course.courseName)
            setValue("courseShortDesc", course.courseDescription)
            setValue("coursePrice", course.price)
            setValue("courseCategories", course.category)
            setValue("courseTags", course.tag)
            setValue("courseBenefits", course.whatYouWillLearn)
            setValue("courseRequirement", course.instructions)
            setValue("courseImage", course.thumbnail)

        }
        getCategories();
    }, [])

    const isFormUpdated = () => {
        const currentValue = getValues();
        if (currentValue.courseTitle !== course.courseName ||
            currentValue.courseShortDesc !== course.courseDescription ||
            currentValue.coursePrice !== course.price ||
            currentValue.courseCategories._id !== course.category._id ||
            currentValue.courseBenifits !== course.whatYouWillLearn ||
            // currentValue.courseTags.toString() !== course.tag.toString() ||
            // currentValue.courseImage !== course.thumbnail ||
            currentValue.courseRequirements.toString() !== course.instructions.toString()
        )
            return true
        else
            return false
    }

    const onSubmit = async (data) => {
        console.log("printing form data ",data);
        if (editCourse) {
            if (isFormUpdated()) {
                const currentValue = getValues();
                const formData = new FormData();
                formData.append("courseId", course._id)
                if (currentValue.courseTitle !== course.courseName) {
                    formData.append("courseName", data.courseTitle)
                }
                if (currentValue.courseShortDesc !== course.courseDescription) {
                    formData.append("courseDescription", data.courseShortDesc)
                }
                if (currentValue.coursePrice !== course.price) {
                    formData.append("price", data.coursePrice)
                }
                if (currentValue.courseCategories._id !== course.category._id) {
                    formData.append("category", data.courseCategories)
                }
                if (currentValue.courseRequirements.toString() !== course.instructions.toString()) {
                    formData.append("instructions", JSON.stringify(data.courseRequirements))
                }

                setLoading(true)
                const result = await editCourseDetails(formData, token)
                setLoading(false);
                if (result) {
                    setStep(2);
                    dispatch(setCourse(result))
                }
            }
            else {
                toast.error("No Changes Made So Far")
            }
            // console.log("printing result", result);
            return;
        }

        //create a new course
        const formData = new FormData();
        formData.append("courseName", data.courseTitle);
        formData.append("courseDescription", data.courseShortDesc);
        formData.append("price", data.coursePrice);
        formData.append("category", data.courseCategories);
        formData.append("instructions", JSON.stringify(data.courseRequirements));
        formData.append("whatYouWillLearn", data.courseBenefits);
        formData.append("status", COURSE_STATUS.DRAFT);
        // for (const pair of formData.entries()) {  
            //     console.log(`${pair[0]}, ${pair[1]}`);  
            //   }  
            
            setLoading(true);
            const result = await addCourseDetails(formData, token);
            if (result) {
                setStep(2);
                dispatch(setCourse(formData));
            }
            setLoading(false);
            console.log("Printing formdata", formData);
        // console.log("printing formData", formData)
        // console.log("printing result", result);

    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className='text-richblack-5 space-y-8 border-[1px] border-richblack-700 bg-richblack-800 p-6 rounded-md'>
            <div className='flex flex-col space-y-2'>
                <label htmlFor="courseTitle" className='text-sm'>Course Title
                    <sup className='text-pink-200'>*</sup></label>
                <input
                    type="text"
                    id='courseTitle'
                    placeholder='Enter Course Title'
                    {...register("courseTitle", { required: true })}
                    className='form-style w-full'
                />
                {
                    errors.courseTitle && (
                        <span className='text-sm text-pink-200 tracking-wide ml-2'>
                            Course Title is required
                        </span>
                    )
                }
            </div>

            <div className='flex flex-col space-y-2'>
                <label htmlFor="courseShortDesc" className='text-sm'>Course Short Description<sup className='text-pink-200'>*</sup></label>
                <textarea
                    id='courseShortDesc'
                    placeholder='Enter Description'
                    {...register("courseShortDesc", { required: true })}
                    className='min-h-[130px] w-full form-style resize-x-none'
                >
                </textarea>
                {
                    errors.courseShortDesc && (
                        <span className='text-sm text-pink-200 tracking-wide ml-2'>course description is required**</span>
                    )
                }
            </div>

            <div className='flex flex-col space-y-2 '>
                <label htmlFor="coursePrice" className='text-sm'>Price<sup className='text-pink-200'>*</sup></label>
                <div className='relative'>
                    <input
                        type="number"
                        id="coursePrice"
                        placeholder='Enter Course Price'
                        {...register("coursePrice", { required: true, valueAsNumber: true })}
                        className='w-full form-style !pl-12'
                    />
                    <HiOutlineCurrencyRupee className='absolute left-3 top-1/2 inline-block -translate-y-1/2 text-2xl text-richblack-400' />
                </div>

                {
                    errors.coursePrice && (
                        <span className='text-sm text-pink-200 tracking-wide ml-2'>Course Price is required**</span>
                    )
                }
            </div>

            <div className='flex flex-col space-y-2'>
                <label htmlFor="courseCategories" className='text-sm'>Category<sup className='text-pink-200'>*</sup></label>
                <select
                    id="courseCategories"
                    defaultValue=""
                    {...register("courseCategories", { required: true })}
                    className='w-full form-style'
                >
                    <option value="" disabled>Choose a category</option>
                    {courseCategories.map((category, index) => (
                        <option
                            key={index}
                            value={category?.id}>{category?.name}
                        </option>
                    ))}
                </select>
                {errors.courseCategories && (<span className='text-sm text-pink-200 tracking-wide ml-2'>Course category is required**</span>)}
            </div>

            {/* create a custom component for handling tags input */}
            <ChipInput 
            label="Tags"
            name="CourseTags"
            placeholder="Enter Tags and Press Enter"
            register={register}
            errors={errors}
            setValue={setValue}
            getValues={getValues}
            />
            {/* create a component for uploading and showing preview of media */}
            <Upload 
                name="courseImage"
                label="Course Thumbnail"
                register={register}
                setValue={setValue}
                errors={errors}
                editData={editCourse ? course?.thumbnail : null}
            />

            <div className='flex flex-col space-y-2'>
                <label htmlFor="courseBenefits" className='text-sm'>Benefits of the course<sup className='text-pink-200'>*</sup></label>
                <textarea
                    id="courseBenefits"
                    placeholder='Enter benefits of the course'
                    {...register("courseBenefits", { required: true })}
                    className='min-h-[130px] w-full form-style resize-x-none'
                ></textarea>
                {
                    errors.courseBenefits && (
                        <span className='text-sm text-pink-200 tracking-wide ml-2'>Benefits of the course is required</span>
                    )
                }
            </div>

            <RequirementField
                name="courseRequirements"
                label="Requirements/Instructions"
                register={register}
                errors={errors}
                setValue={setValue}
            />

            <div className='flex justify-end gap-x-2'>
                {
                    editCourse && (
                        <button
                            onClick={dispatch(setStep(2))}
                            className='flex items-center gap-x-2 bg-richblack-300 cursor-pointer rounded-md px-[20px] py-[8px] text-richblack-900'
                        >Continue without saving
                        </button>
                    )
                }

                <IconBtn text={`${!editCourse ? "Next" : "Save Changes"}`} type={"submit"} >
                    <MdNavigateNext/>
                </IconBtn>
            </div>
        </form>
    )
}

export default CourseInformationForm