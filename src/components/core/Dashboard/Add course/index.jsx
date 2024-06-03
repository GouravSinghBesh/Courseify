import React from 'react'
import RenderSteps from './RenderSteps'

const AddCourse = () => {
    return (
        <>
            <div className='text-richblack-5 flex items-center justify-between w-full gap-x-6'>
                <div className='flex flex-col'>
                    <h1 className='text-3xl font-medium mb-14 flex-1'>Add Course</h1>
                    <div className='flex-1 w-[500px]'>
                        <RenderSteps />
                    </div>
                </div>
                <div className='sticky top-10 hidden xl:block max-w-[400px] flex-1 rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-6'>
                    <p className='mb-8 text-lg'>⚡ Code Uploads tips</p>
                    <ul className='ml-5 space-y-4 text-sm list-disc list-item '>
                        <li>Set the Course Price option or make it free.</li>
                        <li>Standard size for the course thumbnail is 1024x576.</li>
                        <li>Video section controls the course overview video.</li>
                        <li>Set the Course Price option or make it free.</li>
                        <li>Standard size for the course thumbnail is 1024x576.</li>
                        <li>Video section controls the course overview video.</li>
                        <li>Set the Course Price option or make it free.</li>
                        <li>Standard size for the course thumbnail is 1024x576.</li>
                    </ul>
                </div>
            </div>
        </>
    )
}

export default AddCourse