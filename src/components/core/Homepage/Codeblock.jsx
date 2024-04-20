import React from 'react'
import { FaArrowRight } from "react-icons/fa";
import CtaButton from "../Homepage/Button"
import { TypeAnimation } from 'react-type-animation';

const Codeblock = ({ position, heading, subHeading, ctabtn1, ctabtn2, codeblock, codeColor }) => {
    return (
        <div className={`flex ${position} gap-10 my-20 `}>
            {/* section-1 */}
            <div className='flex flex-col gap-8 w-[50%]'>
                {heading}
                <div className='text-richblack-300 font-bold '>
                    {subHeading}
                </div>
                <div className='flex gap-7 mt-7'>
                    <CtaButton active={ctabtn1.active} linkto={ctabtn1.linkto}>
                        <div className='flex gap-2 items-center'>
                        {ctabtn1.btntext}
                        <FaArrowRight />
                        </div>
                    </CtaButton>
                    <CtaButton active={ctabtn2.active} linkto={ctabtn2.linkto}>    
                        {ctabtn2.btntext}
                    </CtaButton>

                </div>

            </div>

            {/* section-2 */}
            <div className='flex h-fit lg:w-[500px]'>
                <div className='flex flex-col text-center font-bold text-richblack-400 w-[10%] font-inter'>
                    <p>1</p>
                    <p>2</p>
                    <p>3</p>
                    <p>4</p>
                    <p>5</p>
                    <p>6</p>
                    <p>7</p>
                    <p>8</p>
                    <p>9</p>
                    <p>10</p>
                    <p>11</p>
                </div>
                <div className= {`w-[90%] flex flex-col gap-2 pr-2  font-bold font-mono ${codeColor}`}>
                    <TypeAnimation 
                    sequence={[codeblock,2000,""]}
                    repeat={Infinity}
                    cursor={true}
                    style={{
                        whiteSpace : "pre-line",
                        display : "block"
                    }}
                    omitDeletionAnimation={true}
                    >

                    </TypeAnimation>
                </div>
            </div>
        </div>
    )
}

export default Codeblock