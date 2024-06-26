import toast from "react-hot-toast"
import { apiconnector } from "../apiconnector";
import { profileEndpoints } from "../apis"


export default async function getUserEnrolledCourses(token) {
    const toastId = toast.loading("...Loading");
    let result = [];
    try {
        const response = await apiconnector("GET", profileEndpoints.GET_USER_ENROLLED_COURSES_API, null,
            {
                Authorisation: `Bearer ${token}`
            })

        if (!response.data.success) {
            throw new Error(response.data.message)
        }

        result = response.data.data;
    } catch (error) {
        console.log("GET_USER_ENROLLED_COURSES_API API ERROR............", error)
        toast.error("Could Not Get Enrolled Courses")
    }
    toast.dismiss(toastId)
    return result
}