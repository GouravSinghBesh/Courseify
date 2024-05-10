import React from 'react'
import ContactUsForm from '../../Contact Page/ContactUsForm'

const ContactFormSection = () => {
  return (
    <div >
      <h2 className='text-[40px] font-bold text-center text-white'>Get In Touch</h2>
      <p className='text-richblack-200 text-center'>We’d love to here for you, Please fill out this form.</p>
      <div className='flex justify-center ml-24 '>
        <ContactUsForm />
      </div>
    </div>
  )
}

export default ContactFormSection