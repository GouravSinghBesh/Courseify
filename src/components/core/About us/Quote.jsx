import React from 'react'
import HighlightText from '../Homepage/HighlightText'
import icon1 from "../../../data/icons/“.png"

const Quote = () => {
  return (
    <div className='text-[30px] relative font-bold text-center w-11/12'>
      <img src={icon1} alt="icon1" className='absolute left-3' />We are passionate about revolutionizing the way we learn. Our innovative platform
      <HighlightText text={"combines technology"}/>
      <span className='text-brown-500'>
        {" "}
        expertise
      </span>
      , and community to create an 
      <span  className='text-brown-500'>
      {" "}
        unparalleled educational experience.<img src={icon1} alt="icon1" className='absolute left-[58%] top-[65%] rotate-180' />
      </span>
    </div>
  )
}

export default Quote
