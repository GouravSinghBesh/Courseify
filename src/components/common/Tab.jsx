import React from 'react'

const Tab = ({tabData,field,setField}) => {
  return (
    <div 
    className='bg-richblack-800 rounded-full max-w-max flex gap-x-1 p-1 my-6'
    style={{
        boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
      }}>
        {
            tabData.map((tab,index)=>(
                <button
                 className={`${tab.type === field ? "bg-richblack-900 text-richblack-5" : "bg-transparent text-richblack-200"} py-2 px-5 rounded-full transition-all duration-200`}
                 key={index}
                 onClick={()=>setField(tab.type)}>
                    {tab?.tabName}
                </button>
            ))
        }
    </div>
  )
}

export default Tab