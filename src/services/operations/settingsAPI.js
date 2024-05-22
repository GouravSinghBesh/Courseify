import toast from "react-hot-toast"
import { apiconnector } from "../apiconnector"
import {settingsEndpoints} from "../apis"
import {logout} from "./authAPI"
const {UPDATE_PROFILE_API,CHANGE_PASSWORD_API,DELETE_PROFILE_API} = settingsEndpoints;

export function updateProfile(token,formData){
    return async(dispatch)=>{
        const toastId = toast.loading("...Loading")
        try {
            console.log(token);
            const response = await apiconnector("PUT",UPDATE_PROFILE_API,formData,{Authorisation : `Bearer ${token}`})
            console.log("Updating Profile API Response...",response)

            if(!response.data.success){
                throw new Error(response.data.message)
            }


        } catch (error) {
            console.log("error while sending api request",error);
        }
        toast.dismiss(toastId)
    }
}

export async function changePassword(token,formData){
    const toastId = toast.loading("...Loading");
    try {
        const response = await apiconnector("POST",CHANGE_PASSWORD_API,formData,{
            Authorisation : `Bearer ${token}`
        })

        console.log("change password api response",response);


        if(!response.data.success){
            throw new Error(response.data.message)
        }

        toast.success("Password Updated Successfully")
    } catch (error) {
        console.log("change password api error",error)
        toast.error(error.response.data.message)
    }
    toast.dismiss(toastId)
}

export function deleteProfile(token,navigate){
    return async(dispatch)=>{
        const toastId = toast.loading("...Loading");
        try {
            const response = await apiconnector("DELETE",DELETE_PROFILE_API,null,{
                Authorisation : `Bearer ${token}`
            })

            if(!response.data.success){
                throw new Error(response.data.message)
            }

            toast.success("Profile deleted Successfully")
            dispatch(logout(navigate))
        } catch (error) {
            console.log("Delete profile api errror : ",error);
            toast.error("Could not delete your profile")
        }
        toast.dismiss(toastId)
    }
}