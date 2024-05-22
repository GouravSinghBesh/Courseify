import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useNavigate } from 'react-router-dom';
import IconBtn from '../../../common/IconBtn';
import { changePassword } from '../../../../services/operations/settingsAPI';
import { useSelector } from 'react-redux';

const UpdatePassword = () => {
    const [showOldPassword, setShowOldPassword] = useState(false)
    const [showNewPassword, setShowNewPassword] = useState(false)
    const { token } = useSelector((state) => state.auth)
    const navigate = useNavigate()
    const { register, handleSubmit, formState: { errors } } = useForm();

    const submitPasswordForm = (formData) => {
        console.log("form password data", formData);
        try {
            changePassword(token, formData)
        } catch (error) {
            console.log("error message", error);
        }
    }
    return (
        <>
            <form onSubmit={handleSubmit(submitPasswordForm)}>
                <div className='flex flex-col gap-y-6 rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-8 px-12 my-10'>
                    <h2 className='text-lg font-semibold text-richblack-5'>Password</h2>
                    <div className='flex flex-col lg:flex-row gap-5'>
                        {/* oldPAssword */}
                        <div className='flex relative flex-col gap-2 lg:w-[48%]'>
                            <label htmlFor="oldPasssword" className='lable-style'>Old Password</label>
                            <input
                                type={`${showOldPassword ? "text" : "password"}`}
                                id='oldPassword'
                                placeholder='Enter Current Password'
                                name='oldPassword'
                                className='form-style'
                                {...register("oldPassword", { required: true })}
                            />
                            <span onClick={() => { setShowOldPassword((prev) => !prev) }}
                                className='absolute right-3 top-[38px] z-[10] cursor-pointer '>
                                {showOldPassword ?
                                    (<AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />) :
                                    (<AiOutlineEye fontSize={24} fill="#AFB2BF" />)}
                            </span>
                            {
                                errors.oldPassword &&
                                (
                                    <span className='-mt-1 text-[12px] text-yellow-100'>
                                        Please enter your current password
                                    </span>
                                )
                            }
                        </div>
                        {/* new password */}
                        <div className='relative flex flex-col gap-2 lg:w-[48%]'>
                            <label htmlFor="newPassword" className='lable-style'>New Password</label>
                            <input
                                type={showNewPassword ? "text" : "password"}
                                id='newPassword'
                                name='newPassword'
                                className='form-style'
                                placeholder='Enter New Password'
                                {...register("newPassword", { required: "Please enter new Password" })}
                            />
                            <span onClick={() => setShowNewPassword((prev) => !prev)}
                                className="absolute right-3 top-[38px] z-[10] cursor-pointer">
                                {showNewPassword ?
                                    (<AiOutlineEyeInvisible fontSize={24} fill='#AFB2BF' />) :
                                    (<AiOutlineEye fontSize={24} fill='#AFB2BF' />)}
                            </span>
                            {
                                errors.newPassword && 
                                (
                                    <span className='-mt-1 text-yellow-100 text-[12px]'>
                                        Please enter your new password
                                    </span>
                                )
                            }
                        </div>

                    </div>
                </div>

                {/* buttons */}
                <div className='flex justify-end gap-2'>
                    <button
                        onClick={() => {
                            navigate("/dashboard/my-profile")
                        }}
                        className="cursor-pointer rounded-md bg-richblack-700 py-2 px-5 font-semibold text-richblack-50"
                    >Cancel</button>
                    <IconBtn text="Update" type="submit" />
                </div>
            </form>
        </>

    )
}

export default UpdatePassword