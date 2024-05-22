import toast from "react-hot-toast";
import {setUser} from "../../slices/profileSlice"
import { setLoading ,setToken} from "../../slices/authSlice";
import { apiconnector } from "../apiconnector";
import axios from "axios";
import { endpoints } from "../apis";

const {SENDOTP_API, LOGIN_API, SIGNUP_API , RESETPASSTOKEN_API , RESETPASSWORD_API} = endpoints;


export function sendOtp(email,navigate){
    return async(dispatch)=>{
     const toastId = toast.loading("...Loading");
     dispatch(setLoading(true))
     try {
        console.log("url : ",SENDOTP_API);
        console.log(typeof("POST"));
        const response = await apiconnector("POST",SENDOTP_API,{
            email, 
        })

        console.log("sending otp response",response);
        // console.log("token",)
        console.log(response.data.success);

        if(!response.data.success){
            throw new Error(response.data.message)
        }

        toast.success("OTP send successfully")
        navigate("/verify-email")

     } catch (error) {
        console.log("sending otp error : ",error);
        toast.error("Could not send otp")
     }
     dispatch(setLoading(false))
     toast.dismiss(toastId);
    }
}

export function login(email,password,navigate){
    return async (dispatch)=>{
        dispatch(setLoading(true));
       const toastId = toast.loading("...Loading");
        try {
            const response = await apiconnector("POST",LOGIN_API,{
                 email,
                 password
            })

            console.log("Login API response",response);

            if(!response.data.success){
                throw Error(response.data.message);
            }

            toast.success("Login Successfull");
            dispatch(setToken(response.data.token))

            const userImage = response.data?.user?.image ? 
            response.data.user.image :
             `https://api.dicebear.com/5.x/initials/svg?seed=${response.data.user.firstName}${response.data.user.lastName}`
             console.log(userImage);
            dispatch(setUser({...response.data.user, image : userImage}))

            localStorage.setItem("token",JSON.stringify(response.data.token))
            localStorage.setItem("user",JSON.stringify(response.data.user))

            navigate("/dashboard/my-profile")
        } catch (error) {
            console.log("Login API error ....",error);
            toast.error("Login Failed")
        }
        dispatch(setLoading(false));
        toast.dismiss(toastId)
    }
}

export function signup(firstName,lastName,email,password,confirmPassword,otp,accountType,navigate){
    return async(dispatch)=>{
        const toastId = toast.loading("...loading");
        dispatch(setLoading(true));
        try {
            const response = await apiconnector("POST",SIGNUP_API,
            {
                firstName,
                lastName,
                email,
                password,
                confirmPassword,
                otp,
                accountType,
            }
            )
            console.log("response of signup api",response)

            if(!response.data.success){
                throw new Error(response.data.message)
            }

            toast.success("signup successfully");
            navigate("/login");
        } catch (error) {
            toast.error("error while signup")
            console.log("error while signUp",error);
            navigate("/signup")
        }
        dispatch(setLoading(false));
        toast.dismiss(toastId);
    }
}

export function logout(navigate){
    return async(dispatch)=>{
        dispatch(setToken(null));
        dispatch(setUser(null));
        // dispatch(resetCart());
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        toast.success("Logged Out")
        navigate("/");
    }
}

export function getPasswordResetToken(email,setEmailSent){
    return async(dispatch)=>{
        dispatch(setLoading(true));
        try {
            const response = await apiconnector("POST",RESETPASSTOKEN_API,{email})

            console.log("password token response...",response)

            if(!response.data.success){
                throw new Error(response.data.message)
            }

            toast.success("Password reset token")
            setEmailSent(true);
        } catch (error) {
            console.log("reset password token error",error)
            toast.error("Failed to send email for password reset")
        }
        dispatch(setLoading(false));
    }
}

export function resetPassword(password,confirmPassword,token){
    return async(dispatch)=>{
        dispatch(setLoading(true));
        try {
            const response = await apiconnector("POST",RESETPASSWORD_API,{password,confirmPassword,token})

            if(!response.data.success){
                throw new Error(response.data.message)
            }

            console.log("reset password response",response);

            toast.success("reset password successfully");
        } catch (error) {
            console.log("RESET PASSWORD TOKEN Error", error);
      toast.error("Unable to reset password");
        }
        dispatch(setLoading(false))
    }
}