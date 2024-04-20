import React from 'react'
import HighlightText from "./HighlightText"
import knowYourProgress from "../../../assets/Images/Know_your_progress.png"
import PlanYourLessons from "../../../assets/Images/Plan_your_lessons.png"
import CompareWithOthers from "../../../assets/Images/Compare_with_others.png"
import CtaButton from "../Homepage/Button"

const LearningLanguageSection = () => {
  return (
    <div className='mt-[130px] mb-32'>
      <div className='flex flex-col gap-5 items-center'>
          <div className='text-4xl font-semibold text-center'>
            Your swiss knife for
            <HighlightText text={"learning any language"}/>
          </div>

          <div className='text-richblack-600 font-medium mx-auto w-[70%] text-center text-base'>
          Using spin making learning multiple languages easy. with 20+ languages realistic voice-over, progress tracking, custom schedule and more.
          </div>

          <div className='flex gap-4 items-center justify-center mt-5'>
            <img src={knowYourProgress} alt="knowYourProgress" className='object-contain -mr-32'/>
            <img src={CompareWithOthers} alt="CompareWithOthers" className='object-contain'/>
            <img src={PlanYourLessons} alt="PlanYourLessons" className='object-contain -ml-36' />
          </div>

          <div>
            <CtaButton active={true} linkto={"/signup"}>Learn More</CtaButton>
          </div>
      </div>
    </div>
  )
}

export default LearningLanguageSection