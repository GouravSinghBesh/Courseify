import React from 'react'
import { useSelector } from 'react-redux'
import { FaCheck } from "react-icons/fa";
import CourseInformationForm from './CourseInformaion/CourseInformationForm';

const RenderSteps = () => {

    // const {step} = useSelector((state)=>state.course)
    const {step} = useSelector((state)=> state.course)

    const steps = [
        {
            id : 1,
            title : "Course Information"
        },
        {
            id : 2,
            title : "Course Builder"
        },
        {
            id : 3,
            title : "Publish"
        }
    ]


  return (
    <>
    <div className="mb-2 flex w-full justify-center relative">
        {
            steps.map((item,index)=>(  
                <div className="flex flex-col items-center" key={index}>
                    <button key={item.id} className={`${step === item.id ? 
                        "bg-yellow-900 text-yellow-50 border-yellow-50" :
                        "text-richblack-300 border-richblack-700 bg-richblack-800"}
                        cursor-default aspect-square w-[34px] border-[1px] rounded-full grid place-items-center `} >
                        {step > item.id ? 
                        (<FaCheck className='font-bold text-richblack-900'/>) :
                         (item.id)}
                    </button>  
                    {/* add code for dashes between the step */}
                    {
                        item.id !== steps.length && (
                        <>
                            <div className={`h-[calc(34px/2)] w-[33%] border-dashed border-b-2 ${step > item.id ? "border-yellow-50" : "border-richblack-500"}`}>
                            </div>
                        </>
                    )
                    }
                </div>     
            ))
        }
    </div>
    <div className='relative mb-16 flex justify-between w-full select-none'>
        {steps.map((item)=>(
            <div key={item.id} className='flex flex-col items-center gap-y-2 min-w-[130px]'>
                <p className={`${step > item.id ? "text-richblack-5" : "text-richblack-500"} text-sm`}>{item.title}</p>
            </div>  
        ))}
    </div>

    {step === 1 && <CourseInformationForm/>}
    {/* {step === 2 && <CourseBuilderForm/>} */}
    {/* {step === 3 && <PublishCourse/>} */}
    </>
  )
}

export default RenderSteps