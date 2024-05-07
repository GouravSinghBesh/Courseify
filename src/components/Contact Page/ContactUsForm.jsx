import React from 'react'
import { useForm } from 'react-hook-form'
import { useEffect, useState } from 'react';
import countryCode from "../../data/countrycode.json"
import { apiconnector } from '../../services/apiconnector';
import { contactusEndpoint } from '../../services/apis';


const ContactUsForm = () => {
  const [loading, setLoading] = useState(false);
  const { register,
    handleSubmit,
    reset,
    formState: { isSubmitSuccessful, errors }
  } = useForm();

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset({
        firstName: "",
        lastName: "",
        email: "",
        message: "",
        phoneNo: ""
      })

    }

  }, [reset, isSubmitSuccessful])

  const submitContactForm = async (data) => {
    console.log(data);
    setLoading(true);
    try {
      const response = await apiconnector("POST", contactusEndpoint.CONTACT_US_API, data);
      console.log(response);

    } catch (error) {
      console.log(error.message);
    }
    setLoading(false);

  }
  return (
    <form onSubmit={handleSubmit(submitContactForm)}>
      <div className='flex flex-col gap-6 text-white ml-30'>
        <div className='flex gap-3'>
          {/* firstName */}
          <div className='flex flex-col gap-2'>
            <label htmlFor="firstName">FirstName</label>
            <input
              type="text"
              name='firstName'
              id='firstName'
              placeholder='Enter your firstname'
              size={30}
              className='bg-richblack-800 p-2 rounded-md  border-b-[1px]  border-b-richblack-200'
              {...register("firstName", { required: true })}
            />
          </div>

          {/* lastName */}
          <div className='flex flex-col gap-2'>
            <label htmlFor="lastName">LastName</label>
            <input
              type="text"
              name='lastName'
              id='lastName'
              size={30}
              className='bg-richblack-800 p-2 rounded-md  border-b-[1px]  border-b-richblack-200'
              placeholder='Enter your lastname'
              {...register("lastName", { required: true })}
            />
          </div>
        </div>

        {/* email */}
        <div className='flex flex-col gap-2'>
          <label htmlFor="email">Email</label>
          <input type="email"
            name='email'
            id='email'
            size={66}
            className='bg-richblack-800 p-2 rounded-md  border-b-[1px]  border-b-richblack-200'
            placeholder='Enter your email id'
            {...register("email", { required: "please enter your email address" })}
          />
        </div>

        {/* phone No */}
        <div className='flex flex-col gap-2'>
          <label htmlFor="phoneNo">Phone Number</label>
          <div className=''>
            <select
              name="dropdown"
              id="dropdown"
              className='text-white bg-richblack-800 w-[65px] p-2 py-2 rounded-md  border-b-[1px] border-b-richblack-200'
              {...register("countryCode", { required: true })}
            >
              {countryCode.map((element, index) => (
                <option value={element.code} key={index}
                  className='bg-richblack-800 p-2 rounded-md  border-b-[1px]  border-b-richblack-200 text-white'>
                  {element.code} - {element.country}
                </option>
              ))}
            </select>

            <input
              type="text"
              name="phoneNo"
              id="phoneNo"
              placeholder='12345 67890'
              size={58}
              className='bg-richblack-800 p-2 rounded-md  border-b-[1px]  border-b-richblack-200 ml-4'
              {...register("phoneNo",
                {
                  required: "please enter Phone number",
                  minLength: { value: 8, message: "Invalid Phone Number" },
                  maxLength: { value: 10, message: "Invalid Phone Number" }
                })} />
          </div>

        </div>

        {/* message */}
        <div className='flex flex-col gap-2'>
          <label htmlFor="message">Messsage</label>
          <textarea
            name="message"
            id="message"
            rows="7"
            cols="30"
            placeholder='Enter Your Message Here'
            size={30}
            className='bg-richblack-800 p-2 rounded-md  border-b-[1px]  border-b-richblack-200'
            {...register("message", { required: true })}
          ></textarea>
          {
            errors.message && <span>Please enter your message </span>
          }
        </div>

        {/* button */}
        <button type='submit'
          className='rounded-md bg-yellow-50 text-center px-6  mt-4 py-2 text-[16px] font-bold text-black '
        >Send Message</button>
      </div>
    </form>
  )
}

export default ContactUsForm