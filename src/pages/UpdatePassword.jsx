import React from 'react'
import { useState } from 'react'
import { useSelector ,useDispatch} from 'react-redux';
import { AiOutlineEye } from "react-icons/ai";
import { AiOutlineEyeInvisible } from "react-icons/ai";
import { Link, useLocation } from 'react-router-dom';
import { BiArrowBack } from "react-icons/bi";
import { resetPassword } from '../services/operations/authAPI';


const UpdatePassword = () => {
    const [showPassword, setShowPassword] = useState("");
    const [showConfirmPassword, setShowConfirmPassword] = useState("");
    const [formData, setFormData] = useState({
        password: "",
        confirmPassword: ""
    })

    const { password, confirmPassword } = formData
    const { loading } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const location = useLocation();

    const handleOnChange =(e)=>{
        e.preventDefault();
        setFormData((prev)=>({
            ...prev,
            [e.target.name] : e.target.value
        })) 
    }

    const handleSubmit = (e)=>{
        e.preventDefault();
        const token = location.pathname.split("/").at(-1)
        dispatch(resetPassword(password,confirmPassword,token))
    }
    return (
        <div className='min-h-[calc(100vh - 3.5rem)] grid place-items-center'>
            {loading ? (<div className='spinner'></div>) :
                (
                    <div className='max-w-[500px] p-4 lg:p-8 '>
                        <h1 className="text-[1.875rem] font-semibold leading-[2.375rem] text-richblack-5">Choose new Password</h1>
                        <p className="my-4 text-[1.125rem] leading-[1.625rem] text-richblack-100">Almost done.Enter your new password and youre all set.</p>

                        <form onSubmit={handleSubmit}>
                            <label className="relative">
                                <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
                                    New Password <sup className="text-pink-200">*</sup>
                                </p>
                                <input
                                    type={showPassword ? "text" : "password"}
                                    name='password'
                                    value={password}
                                    placeholder='Enter Password'
                                    onChange={handleOnChange}
                                    className="form-style w-full !pr-10" />
                            </label>
                            <span onClick={(prev) => setShowPassword(!prev)}
                                className="absolute right-3 top-[38px] z-[10] cursor-pointer">
                                {showPassword ? <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF"/> : <AiOutlineEye fontSize={24} fill="#AFB2BF"/>}
                            </span>

                            <label className="relative">
                                <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
                                    Confirm New Password <sup className="text-pink-200">*</sup>
                                </p>
                                <input
                                    type={showConfirmPassword ? "text" : "password"}
                                    name='confirmPassword'
                                    value={confirmPassword}
                                    placeholder='Enter confirm password'
                                    onChange={handleOnChange}
                                    className="form-style w-full !pr-10"
                                />
                                <span onClick={(prev) => setShowConfirmPassword(!prev)} className="absolute right-3 top-[38px] z-[10] cursor-pointer">
                                    {showConfirmPassword ? <AiOutlineEye fontSize={24} fill="#AFB2BF"/> : <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />}
                                </span>

                            </label>

                            <button type='submit'
                                className="mt-6 w-full rounded-[8px] bg-yellow-50 py-[12px] px-[12px] font-medium text-richblack-900">
                                Reset Password
                            </button>
                        </form>

                        <div className="mt-6 flex items-center justify-between">
                            <Link to="/login">
                                <p className="flex items-center gap-x-2 text-richblack-5"><BiArrowBack /> Back to login
                                </p>
                            </Link>
                        </div>
                    </div>
                )}
        </div>
    )
}

export default UpdatePassword