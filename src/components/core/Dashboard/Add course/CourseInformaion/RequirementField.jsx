import React, { useState } from 'react'
import { useEffect } from 'react';

const RequirementField = ({name,label,errors,register,setValue}) => {
  const [requirement, setRequirement] = useState("");
  const [requirementList, setRequirementList] = useState([]);

  const handleAddRequirement = ()=>{
    if(requirement){
      setRequirementList([...requirementList,requirement])
      setRequirement('');
    }
  }

  const handleRemoveRequirement = (index)=>{
    const updatedRequirementList = [...requirementList];
    updatedRequirementList.splice(index,1);
    setRequirementList(updatedRequirementList);
  }

  useEffect(() => {
    register(name,
      {required : true,
        // validate : (value) => value.length > 0
      })
  }, [])

  useEffect(() => {
   setValue(name ,requirementList)
  }, [requirementList])
  
  


  return (
    <div className='flex flex-col space-y-2'>
      <label htmlFor={name} className='text-sm text-richblack-5'>{label}<sup className='text-pink-200'>*</sup></label>
      <div className='flex flex-col space-y-2 items-start'>
        <input
          type="text"
          id={name}
          value={requirement}
          onChange={(e) => setRequirement(e.target.value)}
          className='w-full form-style'
        />
        <button
          onClick={handleAddRequirement}
          className='font-semibold text-yellow-50'
          type='button'
        >Add</button>
      </div>
      {
        requirementList.length > 0 && 
        (
          <ul className='list-disc mt-2 list-inside'>
            {
              requirementList.map((requirement,index)=>(
                <li className='flex items-center text-richblack-5' key={index}>
                  <span>{requirement}</span>
                  <button type='button'
                   onClick={()=>handleRemoveRequirement(index)}
                   className='text-xs text-pure-greys-300 ml-2'
                   >clear</button>
                </li>
              ))
            }
          </ul>
        )
      }
      {errors[name] && (
        <span className='ml-2 text-xs tracking-wide text-pink-200'>
          {label} is required
        </span>
      )}
    </div>
  )
}

export default RequirementField