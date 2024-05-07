import React from 'react'
import HighlightText from '../Homepage/HighlightText';
import CtaButton from "../Homepage/Button"


const LearningGridArray = [
  {
    order: -1,
    heading: "World-Class Learning for",
    highlightText: "Anyone, Anywhere",
    description:
      "Studynotion partners with more than 275+ leading universities and companies to bring flexible, affordable, job-relevant online learning to individuals and organizations worldwide.",
    BtnText: "Learn More",
    BtnLink: "/",
  },
  {
    order: 1,
    heading: "Curriculum Based on Industry Needs",
    description:
      "Save time and money! The Belajar curriculum is made to be easier to understand and in line with industry needs.",
  },
  {
    order: 2,
    heading: "Our Learning Methods",
    description:
      "Studynotion partners with more than 275+ leading universities and companies to bring",
  },
  {
    order: 3,
    heading: "Certification",
    description:
      "Studynotion partners with more than 275+ leading universities and companies to bring",
  },
  {
    order: 4,
    heading: `Rating "Auto-grading"`,
    description:
      "Studynotion partners with more than 275+ leading universities and companies to bring",
  },
  {
    order: 5,
    heading: "Ready to Work",
    description:
      "Studynotion partners with more than 275+ leading universities and companies to bring",
  },
];


const LearningGrid = () => {
  return (
    <div className='grid grid-cols-1 lg:grid-cols-4 lg:w-full p-5 mb-10 text-richblack-200'>
      {LearningGridArray.map((card) => (
        <div key={card.order} className={`
            ${card.order < 0 && "col-span-2 bg-transparent h-[280px] p-5"} 
            ${card.order % 2 === 1 ? ("bg-richblack-700 h-[280px] p-5") : ("bg-richblack-800 h-[280px] p-5")}
            ${card.order === 3 && "col-start-2"}`}>
          {card.order < 0 ?
            (<div className='flex flex-col gap-4'>
              <h2 className='text-[35px] font-bold text-white '>World-Class Learning for<HighlightText text={"Anyone, Anywhere"} /> </h2>
              <p>Studynotion partners with more than 275+ leading universities and companies to bring flexible, affordable, job-relevant online learning to individuals and organizations worldwide.</p>
              <div className="w-fit ">
                <CtaButton linkto={card.BtnLink} active={true} >{card.BtnText} </CtaButton>
              </div>

            </div>) :
            (<div className='flex flex-col gap-4 p-7'>
              <h2 className='text-white font-bold text-[20px]'>{card.heading}</h2>
              <p>{card.description}</p>
            </div>)}
        </div>
      ))}
    </div>
  )
}

export default LearningGrid