import React from 'react'
import OtpInput from 'react-otp-input';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { BiArrowBack } from "react-icons/bi";
import { RxCountdownTimer } from "react-icons/rx";
import { sendOtp,signup} from "../services/operations/authAPI"

const VerifyEmail = () => {
    const [otp, setotp] = useState('');
    const { loading, signupData } = useSelector((state) => state.auth);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleVerifyAndSubmit = (e)=>{
        e.preventDefault();
        const {firstName,lastName,email,password,confirmPassword,accountType} = signupData;
        console.log(signupData);
        dispatch(signup(firstName,lastName,email,password,confirmPassword,otp,accountType,navigate))
        
    }

    
    return (
        <div className='min-h-[calc(100vh-3.5rem)] grid place-items-center'>
            {loading ?
                (<div>
                    <div className='spinner'></div>
                </div>) :
                (
                    <div className='max-w-[500px] p-4 lg:p-8'>
                        <h1 className=' text-richblack-5 font-semibold text-[1.875rem] leading-[2.375rem]'>Verify Email</h1>
                        <p className='text-richblack-100 text-[1.125rem] leading-[1.625rem] my-4'>A verification code has been sent to you. Enter the code below</p>
                        <form onSubmit={handleVerifyAndSubmit}>
                            <OtpInput
                                value={otp}
                                onChange={setotp}
                                numInputs={6}
                                renderSeparator={<span>-</span>}
                                containerStyle={{
                                    justifyContent: "space-between",
                                    gap: "0 6px",
                                  }}
                                renderInput={(props) =>( 
                                <input 
                                    {...props} 
                                    style={{
                                        boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                                      }}
                                    className="w-[48px] lg:w-[60px] border-0 bg-richblack-800 rounded-[0.5rem] text-richblack-5 aspect-square text-center focus:border-0 focus:outline-1 focus:outline-yellow-50"
                                     />)}
                            />
                            <button type='submit' className="w-full bg-yellow-50 py-[12px] px-[12px] rounded-[8px] mt-6 font-medium text-richblack-900">Verify And Register</button>
                        </form>
                        <div className='flex justify-between items-center mt-6'>
                            <Link to={"/signup"}>
                                
                                <p className='flex items-center text-richblack-5 gap-x-2'><BiArrowBack />Back to signup</p>
                            </Link>
                            <button 
                            onClick={()=>dispatch(sendOtp(signupData.email,navigate))} 
                            className='flex items-center text-blue-100 gap-x-2'>
                                <RxCountdownTimer/>
                                Resend it
                            </button>
                        </div>
                    </div>
                )}
        </div>
    )
}

export default VerifyEmail