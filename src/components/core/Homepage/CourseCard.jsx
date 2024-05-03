import React from 'react'
import { HiUsers } from "react-icons/hi";
import { ImTree } from "react-icons/im";

const CourseCard = ({courseData,currentCard,setCurrentCard}) => {
  return (
    <div className={`w-[360px] lg:w-[30%] text-richblack-25 p-6 h-[300px] box-border cursor-pointer ${courseData?.heading === currentCard ? "bg-white shadow-[12px_12px_0_0] shadow-yellow-50" : "bg-richblack-800"}`} onClick={()=> setCurrentCard(courseData?.heading)}>
        {/* heading and description */}
        <div className='flex flex-col gap-3 h-[80%] border-b-[2px] border-richblack-400 border-dashed '>
           <p className={`${courseData?.heading === currentCard && "text-richblack-800 " } font-semibold text-[20px]`}>{courseData?.heading}</p> 
           <p className='text-richblack-400'>{courseData?.description}</p>
        </div>

        {/* lessons */}
        <div className={`flex justify-between  font-medium py-5 ${courseData?.heading === currentCard && "text-blue-300"} text-richblack-300`}>
            <div className='flex items-center gap-2 text-[16px]'>
                <HiUsers/>
                {courseData?.level}
            </div>
            <div className='flex items-center gap-2 text-[16px]'>
                <ImTree/>
                <p> {courseData?.lessionNumber} Lessons</p>
            </div>
        </div>
    </div>
  )
}

export default CourseCard