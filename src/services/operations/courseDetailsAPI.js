import toast from "react-hot-toast";
import {apiconnector} from "../apiconnector"
import { courseEndpoints } from "../apis";
import axios from "axios";

const {COURSE_CATEGORIES_API,EDIT_COURSE_API,CREATE_COURSE_API} = courseEndpoints

export const fetchCourseCategories = async()=>{
    let result = [];
    try {
        const response = await apiconnector("GET",COURSE_CATEGORIES_API)
        console.log("course categories api response",response);

        if(!response.data.success){
            throw new Error("could not fetch course category")
        }
        result = response?.data?.data
    } catch (error) {
        console.log("course category api error",error)
        toast.error(error.message)
    }
    return result
}

export const editCourseDetails = async(data,token)=>{
    let result = null;
    const toastId = toast.loading("...Loading");
    try {
        const response = await apiconnector("POST",EDIT_COURSE_API,data,{
            "Content-Type": "multipart/form-data",
            Authorisation : `Bearer ${token}`
        })

        if(!response.data.success){
            throw new Error(response.data.message)
        }

        toast.success("Course Details Updated successfully")
        result = response.data.data;
    } catch (error) {
        console.log("Edit Course Details API error",error);
        toast.error("Could Not Update Course Details")
    }
    toast.dismiss(toastId);
    return result
    
}

export const addCourseDetails = async (data,token)=>{
    let result = null;
    console.log("add course inside token"+token)
    const toastId = toast.loading("...Loading");
    try {
        const response = await apiconnector("POST", CREATE_COURSE_API, data, {
            "Content-Type": "multipart/form-data",
            Authorisation : `Bearer ${token}`
        })
        // const response  = await axios.post(CREATE_COURSE_API,data,{
        //     Authorisation : `Bearer ${token}`,
        //     "Content-Type": "multipart/form-data"
        // })
         if(!response.data.success){
            throw new Error(response.data.message)
         }

         toast.success("Course Details Added Successfully")
         result = response.data.data;
    } catch (error) {
        console.log("CREATE COURSE API ERROR............", error)
    toast.error(error.message)
    }
    toast.dismiss(toastId);
    return result;
}