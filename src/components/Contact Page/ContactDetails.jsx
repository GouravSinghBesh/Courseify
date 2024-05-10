import React from 'react'
import * as Icon1 from "react-icons/hi2"
import * as Icon2 from "react-icons/bi"
import * as Icon3 from "react-icons/io5"

const contactDetails = [
    {
        icon: "HiChatBubbleLeftRight",
        heading: "Chat on us",
        description: "Our friendly team is here to help.",
        details: "info@studynotion.com",
    },
    {
        icon: "BiWorld",
        heading: "Visit us",
        description: "Come and say hello at our office HQ.",
        details:
            "Akshya Nagar 1st Block 1st Cross, Rammurthy nagar, Bangalore-560016",
    },
    {
        icon: "IoCall",
        heading: "Call us",
        description: "Mon - Fri From 8am to 5pm",
        details: "+123 456 7869",
    },
]

const ContactDetails = () => {
    return (
        <div>
            <div className='flex flex-col gap-6 bg-richblack-800 lg:p-6 p-4 rounded-xl m-7 '>
                {
                    contactDetails.map((ele, index) => {
                        let Icon = Icon1[ele.icon] || Icon2[ele.icon] || Icon3[ele.icon]
                        return  <div className='flex  gap-4' key={index}>
                                    <div>
                                        <Icon size={25}/>
                                    </div>
                                    <div className='flex flex-col gap-3'>
                                        <h2 className='font-bold text-white text-lg'>{ele.heading}</h2>
                                        <div className='text-richblack-200 text-sm'>
                                            <p className='font-medium'>{ele.description}</p>
                                            <p className='font-semibold'>{ele.details}</p>
                                        </div>
                                    </div>
                                </div>
                    })
                }
            </div>
        </div>
    )
}

export default ContactDetails