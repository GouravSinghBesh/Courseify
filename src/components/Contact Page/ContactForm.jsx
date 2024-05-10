import React from 'react'
import ContactUsForm from './ContactUsForm'

const ContactForm = () => {
  return (
    <div>
      <div className='flex flex-col gap-4 border border-richblack-600 p-7 lg:p-14 rounded-xl'>
          <h2 className='text-4xl text-richblack-5 font-semibold'>Got a Idea? We’ve got the skills. Let’s team up</h2>
          <p className='text-richblack-200'>Tall us more about yourself and what you’re got in mind.</p>
          <ContactUsForm/>
      </div>
    </div>
  )
}

export default ContactForm