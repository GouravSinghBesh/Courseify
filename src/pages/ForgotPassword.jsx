import React from 'react'
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {getPasswordResetToken} from "../services/operations/authAPI"

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [emailSent, setEmailSent] = useState(false);
    const { loading } = useSelector((state) => state.auth);
    const dispatch = useDispatch()

    const handleSubmit = (e)=>{
        e.preventDefault();
        dispatch(getPasswordResetToken(email,setEmailSent))
    }
    return (
        <div className='min-h-[calc(100vh-3.5rem)] grid place-items-center text-white'>
            {loading ? (<div className='spinner'></div>) :
                (<div className='max-w-[500px] p-4 lg:p-8'>
                    <h1 className="text-[1.875rem] font-semibold leading-[2.375rem] text-richblack-5">
                        {emailSent ? "Check Email" : "Reset your password"}
                    </h1>
                    <p className="my-4 text-[1.125rem] leading-[1.625rem] text-richblack-100">
                        {emailSent ? `We have sent the reset email to ${email}` :
                         "Have no fear. We’ll email you instructions to reset your password. If you dont have access to your email we can try account recovery"}
                    </p>
                    <form onSubmit={handleSubmit}>
                        {!emailSent && (
                            <label className='w-full'>
                                <p className='mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5'>Email Address <sup className='text-pink-200'>*</sup></p>
                                <input
                                 type="email"
                                 value={email}
                                 name='email'
                                 placeholder='Enter email address'
                                 onChange={(e)=>setEmail(e.target.value)} 
                                 className="form-style w-full"/>
                                 
                            </label>
                        )}
                        <button type='submit'  className="mt-6 w-full rounded-[8px] bg-yellow-50 py-[12px] px-[12px] font-medium text-richblack-900">
                            {emailSent ? "Resend Email" : "Reset Password"}
                        </button>
                    </form>
                </div>)
            }

        </div>
    )
}

export default ForgotPassword