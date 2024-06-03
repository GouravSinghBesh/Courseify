import React from 'react'
import { useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { MdClose } from "react-icons/md";

const ChipInput = ({
  name,
  label,
  placeholder,
  setValue,
  getValues,
  register,
  errors
}) => {
  const { editCourse, course } = useSelector((state) => state.course)
  const [chips, setChips] = useState([])

  useEffect(() => {
    if (editCourse) {
      setChips(course?.tag)
    }
    register(name, { required: true, validate: (value) => value.length > 0 })
  }, [])

  useEffect(() => {
    setValue(name,chips)
  }, [chips])
  

  const handleDeleteChip = (chipIndex)=>{
    const newChips = chips.filter((_,index)=> index !== chipIndex)
    setChips(newChips)
  }

  const handleKeyDown = (event)=>{
    if(event.key === "Enter" || event.key === ","){
      event.preventDefault();
      const chipValue = event.target.value.trim();
      if(chipValue && !chips.includes(chipValue)){
        const newChip = [...chips,chipValue];
        setChips(newChip)
        event.target.value = ""
      }
    }
  }

  return (
    <div className='flex flex-col space-y-2'>
      <label htmlFor={name} className='text-sm text-richblack-5'>{label}<sup className='text-pink-200'>*</sup></label>
      <div className='flex flex-wrap gap-y-2 w-full'>
        {
          chips.map((chip, index) => (
            <div className='m-1 flex items-center rounded-full bg-yellow-400 text-sm text-richblack-5 px-2 py-1' key={index}>
              {chip}
              <button 
              type='button'
              className='ml-2 focus:outline-none'
              onClick={()=>handleDeleteChip(index)}
              >
                <MdClose className='text-sm'/>
              </button>
            </div>
          ))
        }
        <input 
        type="text"
        id={name}
        name={name}
        placeholder={placeholder}
        className='form-style w-full'
        onKeyDown={handleKeyDown}
        />
      </div>
      {errors[name] && (
        <span className='text-xs text-pink-200 tracking-wide ml-2'>{label} is required</span>
      )}
    </div>
  )
}

export default ChipInput