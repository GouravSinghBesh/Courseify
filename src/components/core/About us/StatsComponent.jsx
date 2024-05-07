import React from 'react'


const Stats = [
    {count: "5K", label: "Active Students"},
    {count: "10+", label: "Mentors"},
    {count: "200+", label: "Courses"},
    {count: "50+", label: "Awards"},
];

const StatsComponent = () => {
  return (
    <section className='w-11/12 mx-auto'>
        <div>
            <div className='flex gap-x-5 justify-center items-center h-[254px]'>
                {
                    Stats.map( (data, index) => {
                        return (
                            <div key={index} className='h-[74px] w-[292px] flex flex-col gap-4 justify-center items-center'>
                                <h1 className='text-[25px] font-bold'>
                                    {data.count}
                                </h1>
                                <h2 className='text-richblack-200'>
                                    {data.label}
                                </h2>
                            </div>
                        )
                    } )
                }
            </div>
        </div>
    </section>
  )
}

export default StatsComponent
