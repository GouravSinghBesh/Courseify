import React from 'react'
import ContactDetails from '../components/Contact Page/ContactDetails'
import ContactForm from '../components/Contact Page/ContactForm'
import Footer from "../components/common/Footer"

const ContactUs = () => {
    return (
        <div>
            <div className='flex flex-col mt-20 mx-autojustify-between gap-10 text-white w-11/12 max-w-maxContent lg:flex-row'>
                {/* left section */}
                <div className='lg:w-[40%]'>
                    <ContactDetails />
                </div>

                {/* right section */}
                <div className='lg:w-[60%]'>
                    <ContactForm />
                </div>
            </div>
            <div>
                Review from other learners
            </div>
            <Footer/>
        </div>

    )
}

export default ContactUs