import React, { useState } from 'react'
import HighlightText from "./HighlightText"
import { HomePageExplore } from '../../../data/homepage-explore'
import CourseCard from './CourseCard';

const ExploreMore = () => {
    const [courses,setCourses] = useState(HomePageExplore[0].courses);
    const [currentTab,setCurrentTab] = useState(HomePageExplore[0].tag);
    const [currentCard,setCurrentCard] = useState(HomePageExplore[0].courses[0].heading)

    const setMyTab = (element)=>{
        setCurrentTab(element.tag);
        setCourses(element.courses);
        setCurrentCard(element.courses[0].heading);
    }

  return (
    <div className='flex flex-col gap-8 '>
        {/* heading */}
        <div >
            <p className='text-4xl font-bold my-10 text-center'>Unlock the <HighlightText text={"Power Of Code"}/></p>
            <p className='text-richblack-300 mt-1 text-lg font-semibold text-center'>Learn to Build Anything You Can Imagine</p>
        </div>

        {/* tabs */}
        <div className='lg:flex gap-5 p-1 -mt-5 items-center bg-richblack-800 text-richblack-200 mx-auto w-max rounded-full font-medium drop-shadow-[0_1.5px_rgba(255,255,255,0.25)] '>
            {HomePageExplore.map((element,index)=>(
                <div key={index} className={`text-[16px] flex gap-2 items-center ${currentTab === element.tag ? "bg-richblack-900 text-richblack-5 font-medium" : "text-richblack-200"} px-7 py-[7px] rounded-full cursor-pointer transition-all duration-200 hover:bg-richblack-900 hover:text-richblack-5`} onClick={()=>setMyTab(element)}>{element.tag}</div>
            ))}
        </div>

        <div className="hidden lg:block lg:h-[200px]"></div>
        {/* cards */}
        <div className='flex gap-10 flex-wrap w-full mb-7 justify-center lg:absolute lg:translate-x-[-50%] lg:translate-y-[40%] lg:justify-between lg:gap-0 lg:left-[50%] lg:bottom-[0] lg:mb-0 lg:px-0'>
            {
                courses.map((course,index)=>(
                    <CourseCard 
                    key={index} 
                    courseData={course} 
                    currentCard={currentCard}
                    setCurrentCard={setCurrentCard} 
                    />
                ))
            }
        </div>
    </div>
  )
}

export default ExploreMore