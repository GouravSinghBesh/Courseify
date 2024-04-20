import React from 'react'
import Logo1 from "../../../assets/TimeLineLogo/Logo1.svg"
import Logo2 from "../../../assets/TimeLineLogo/Logo2.svg"
import Logo3 from "../../../assets/TimeLineLogo/Logo3.svg"
import Logo4 from "../../../assets/TimeLineLogo/Logo4.svg"
import TimelineImage from '../../../assets/Images/TimelineImage.png'

const Timeline = [
    {
        Logo : Logo1,
        heading : "Leadership",
        description : "Fully committed to the success company"
    },
    {
        Logo: Logo2,
        heading: "Leadership",
        Description:"Fully committed to the success company",
    },
    {
        Logo: Logo3,
        heading: "Leadership",
        Description:"Fully committed to the success company",
    },
    {
        Logo: Logo4,
        heading: "Leadership",
        Description:"Fully committed to the success company",
    },
]

const TimelineSection = () => {
  return (
    <div className='w-11/12 max-w-maxContent flex items-center justify-between gap-7  '>
        <div className='w-[45%] flex flex-col gap-5'>
            {
                Timeline.map((element,index)=>{
                    return (
                        <div className='flex gap-6 items-center' key={index}>
                            <div className='h-[50px] w-[50px] flex items-center '>
                                <img src={element.Logo} alt="Logo1 Image" />
                            </div>
                            <div>
                                <h2 className='font-semibold text-[18px]'>{element.heading}</h2>
                                <p className='text-base'>{element.Description}</p>
                            </div>
                        </div>
                    ) 
                })
            }
        </div>
        <div className='relative shadow-blue-200'>
            <img src={TimelineImage} alt="timelineImage" className='object-cover h-fit shadow-white'/>

            <div className='absolute flex bg-caribbeangreen-700 text-white uppercase py-7 left-[50%] translate-x-[-50%] translate-y-[-50%]'>
                <div className='flex gap-5 items-center px-7  border-r border-caribbeangreen-300'>
                    <p className='text-3xl font-bold'>10</p>
                    <p className='text-caribbeangreen-300 text-sm'>Years of experience</p>
                </div>
                <div className='flex gap-5 items-center px-7'>
                    <p className='text-3xl font-bold'>250</p>
                    <p className='text-caribbeangreen-300 text-sm'>Type of courses</p>
                </div>
            </div>
        </div>
    </div>
  )
}

export default TimelineSection