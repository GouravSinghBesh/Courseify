import React from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import IconBtn from "../../../common/IconBtn"
import { useNavigate } from 'react-router-dom'
import { updateProfile } from '../../../../services/operations/settingsAPI'


const EditProfile = () => {
    const {user} = useSelector((state)=>state.profile)
    const {token} = useSelector((state)=>state.auth)
    const {register,handleSubmit,formState : {errors}} = useForm()
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const gender = ["Male", "Female", "Non-Binary", "Prefer not to say", "Other"]

    const submitProfileForm = async(data)=>{
        try {
           dispatch(updateProfile(token,data)) 
        } catch (error) {
           console.log(error.message) ;
        }
        
    }
  return (
    <>
        <form className=' text-white' onSubmit={handleSubmit(submitProfileForm)}>
            <div className='my-10 flex flex-col gap-y-6 rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-8 px-12'>
                <h2 className='text-lg text-richblack-5 font-semibold'>Profile Information</h2>
                <div className='flex flex-col gap-5 lg:flex-row'>
                    {/* firstName */}
                    <div className='flex flex-col gap-2 lg:w-[48%]'>
                        <label htmlFor="firstName" className='label-style'>FirstName</label>
                        <input 
                        type="text" 
                        name='firstName'
                        id='firstName'
                        placeholder='Enter First Name'
                        className='form-style'
                        {...register("firstName",{required : true})}
                        defaultValue={user?.firstName}
                        />
                        {
                            errors.firstName && (
                                <span className="-mt-1 text-[12px] text-yellow-100">
                                    Please enter your firstName
                                </span>
                            )
                        }
                    </div>
                    {/* lastName */}
                    <div className='flex flex-col gap-2 lg:w-[48%]'>
                        <label htmlFor="lastName" className='label-style'>LastName</label>
                        <input 
                        type="text"
                        name='lastName'
                        id='lastName'
                        placeholder='Enter last name'
                        className='form-style'
                        {...register("lastName",{required : true})}
                        defaultValue={user?.lastName}
                        />
                        {
                            errors.lastName && (
                                <span className="-mt-1 text-[12px] text-yellow-100">
                                    Please enter your last name
                                </span>
                            )
                        }
                    </div>
                </div>

                <div className='flex flex-col gap-5 lg:flex-row'>
                    {/* dateOfBirth */}
                    <div className='flex flex-col gap-2 lg:w-[48%]'>
                        <label htmlFor="dateOfBirth">Date Of Birth</label>
                        <input 
                        type="date"
                        id='dateOfBirth'
                        name='dateOfBirth'
                        className='form-style'
                        {...register("dateOfBirth",{required : "Please Enter Your Date Of Birth",max : {
                            value :  new Date().toISOString().split("T")[0],
                            message : "Date Of Birth cannot be in the future",
                        }})}
                        defaultValue={user?.additionalDetials?.dateOfBirth}
                        />
                        {
                            errors.dateOfBirth && (
                                <span>
                                    {errors.dateOfBirth.message}
                                </span>
                            )
                        }
                    </div>
                    {/* gender */}
                    <div className='flex flex-col gap-2 lg:w-[48%]'>
                        <label htmlFor="gender">Gender</label>
                        <select 
                        type="text" 
                        id='gender'
                        name='gender'
                        className='form-style'
                        {...register("gender",{required : "Please enter your date of birth"})}
                        >
                            {/* return statement */}
                            {gender.map((ele,index)=>{
                               return <option value={ele} key={index}>{ele}</option>
                            })}
                        </select>
                    </div>
                </div>

                <div className='flex flex-col gap-5 lg:flex-row'>
                    {/* contact Number */}
                    <div className='flex flex-col gap-2 lg:w-[48%]'>
                            <label htmlFor="contactNumber">Contact Number</label>
                            <input 
                            type="tel"
                            id='contactNumber'
                            name='contactNumber'
                            className='form-style'
                            {...register("contactNumber",{
                                required : "Please enter your Contact Number",
                                maxLength : {value : 12,message : "Invalid Contact Number"},
                                minLength : {value : 10,message : "Invalid Contact Number"}
                            })}
                            defaultValue={user?.accountDetails?.contactNumber}
                            />
                    </div>
                    {/* about */}
                    <div className='flex flex-col gap-2 lg:w-[48%]'>
                            <label htmlFor="about">About</label>
                            <input 
                            type="text"
                            id='about'
                            name='about'
                            placeholder='Enter Bio Details'
                            className='form-style'
                            {...register("about")}
                            defaultValue={user?.additionalDetials?.about}
                            />
                            {
                                errors.about && (<span className="-mt-1 text-[12px] text-yellow-100">Please Enter your bio details</span>)
                            }
                    </div>
                </div>

                <div className='flex justify-end gap-2 mt-10'>
                    <button onClick={()=>navigate("/dashboard/my-profile")} className="cursor-pointer rounded-md bg-richblack-700 py-2 px-5 font-semibold text-richblack-50">Cancel</button>
                    <IconBtn type="submit" text="Save" />
                </div>
            </div>
        </form>
    </>
  )
}

export default EditProfile