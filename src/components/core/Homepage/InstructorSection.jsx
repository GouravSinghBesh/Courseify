import React from 'react'
import Instructor from "../../../assets/Images/Instructor.png"
import HighlightText from './HighlightText'
import CtaButton from "../Homepage/Button"
import { FaArrowRight } from 'react-icons/fa'

const InstructorSection = () => {
  return (
    <div className='mt-16'>
        <div className='flex gap-20 items-center'>
            <div className='w-[50%]'>
                <img src={Instructor} alt="Instructor" className='shadow-white' />
            </div>

            <div className='flex flex-col gap-10  w-[50%]'>
                <div className='text-4xl font-semibold w-[50%]'>
                    Become an <HighlightText text={"Intructor"}/>
                </div>
                <p className='text-[16px] font-medium text-richblack-300 w-[80%]'>
                Instructors from around the world teach millions of students on StudyNotion. We provide the tools and skills to teach what you love.
                </p>
                <div className='w-fit' >
                    <CtaButton active={true} linkto={"/signup"}>
                        <div className='flex gap-2 items-center'>
                            Start Teaching Today 
                            <FaArrowRight />
                        </div>
                    </CtaButton>
                   
                </div>
            </div>
        </div>
    </div>
  )
}

export default InstructorSection