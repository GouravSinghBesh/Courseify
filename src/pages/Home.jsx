import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { FaArrowRight } from "react-icons/fa";
import HighlightText from "../components/core/Homepage/HighlightText"
import CtaButton from "../components/core/Homepage/Button"
import Banner from "../assets/Images/banner.mp4"
import CodeBlock from "../components/core/Homepage/Codeblock"
import TimelineSection from '../components/core/Homepage/TimelineSection';
import LearningLanguageSection from "../components/core/Homepage/LearningLanguageSection"
import InstructorSection from '../components/core/Homepage/InstructorSection';
import Footer from '../components/common/Footer';
import ExploreMore from '../components/core/Homepage/ExploreMore';


const Home = () => {
    
    return (
        <div>
            {/* section -1 */}
            <div className='w-11/12 max-w-maxContent mx-auto relative flex flex-col justify-between items-center text-white bg-richblack-900'>
                <Link to={"/signup"}>
                    <div className='group p-1 mt-16 rounded-full  mx-auto bg-richblack-800 font-bold text-richblack-200 transition-all duration-200 hover:scale-95'>
                        <div className='flex gap-2 items-center rounded-full px-10 py-[5px] transition-all duration-200 group-hover:bg-richblack-900'>
                            <p> Become An Instructor</p>
                            <FaArrowRight />
                        </div>
                    </div>
                </Link>

                <div className='text-[36px]   text-center mt-7'>
                    Empower Your Future with
                    <HighlightText text={"Coding Skills"} />
                </div>

                <div className='text-[16px] text-center font-bold text-richblack-300 w-[70%] mt-4'>
                    With our online coding courses, you can learn at your own pace, from anywhere in the world, and get access to a wealth of resources, including hands-on projects, quizzes, and personalized feedback from instructors.
                </div>

                <div className='flex gap-7 mt-8'>
                    <CtaButton active={true} linkto={"/signup"}>
                        Learn More
                    </CtaButton>
                    <CtaButton active={false} linkto={"/login"}>
                        Book a Demo
                    </CtaButton>
                </div>

                <div className='mx-3 my-12 h-[515px] w-[1035px]'>
                    <video src={Banner} muted autoPlay loop>
                    </video>
                </div>

                <div>
                    <CodeBlock position={"lg:flex-row"}
                        heading={
                            <div className='font-bold text-[36px] '>
                                Unlock Your <HighlightText text={"coding potential"} />
                                with our online courses.
                            </div>
                        }
                        subHeading={
                            <div>
                                <p>Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you.</p>
                            </div>
                        }
                        ctabtn1={
                            {
                                active: true,
                                btntext: "Try it Yourself",
                                linkto: "/signup"
                            }
                        }
                        ctabtn2={
                            {
                                btntext: "Learn More",
                                active: false,
                                linkto: "/login"
                            }
                        }
                        codeblock={`<<!DOCTYPE html>\n<html>\nhead><title>Example</title><linkrel="stylesheet"href="styles.css">\n/head>\nbody>\nh1><ahref="/">Header</a>\n/h1>\nnav><ahref="one/">One</a><ahref="two/">Two</a><ahref="three/">Three</a>\n/nav>\n`}

                        codeColor={"text-yellow-25"}
                    >

                    </CodeBlock>

                    <CodeBlock position={"lg:flex-row-reverse"}
                        heading={
                            <div className='font-bold text-[36px] '>
                                Unlock Your <HighlightText text={"coding potential"} />
                                with our online courses.
                            </div>
                        }
                        subHeading={
                            <div>
                                <p>Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you.</p>
                            </div>
                        }
                        ctabtn1={
                            {
                                active: true,
                                btntext: "Try it Yourself",
                                linkto: "/signup"
                            }
                        }
                        ctabtn2={
                            {
                                btntext: "Learn More",
                                active: false,
                                linkto: "/login"
                            }
                        }
                        codeblock={`<<!DOCTYPE html>\n<html>\nhead><title>Example</title><linkrel="stylesheet"href="styles.css">\n/head>\nbody>\nh1><ahref="/">Header</a>\n/h1>\nnav><ahref="one/">One</a><ahref="two/">Two</a><ahref="three/">Three</a>\n/nav>\n`}

                        codeColor={"text-yellow-25"}
                    >

                    </CodeBlock>
                </div>
                <ExploreMore/>
            </div>

            {/* section-2 */}
            <div className='bg-pure-greys-5 text-richblack-700'>
                <div className='homepage_bg h-[310px]'>
                    <div className='w-11/12 max-w-maxContent flex flex-col gap-5 justify-between items-center mx-auto'>
                        <div className='h-[150px]'></div>
                        <div className='flex gap-3 items-center text-white '>
                            <CtaButton active={true} linkto={"/signup"}>
                                <div className='flex gap-2 items-center'>
                                    <p>Explore Full Catelog</p>
                                    <FaArrowRight />
                                </div>

                            </CtaButton>
                            <CtaButton active={false} linkto={"/login"}>
                                <p>Learn More</p>
                            </CtaButton>
                        </div>
                    </div>
                </div>

                <div className='w-11/12 max-w-maxContent flex flex-col gap-7 items-center justify-between mx-auto'>
                    <div className='flex gap-5 items-center mt-[95px]'>
                        <div className='text-4xl font-semibold w-[45%]'>
                            <p>Get the skills you need for a <HighlightText text={"job that is in demand"} /></p>
                        </div>
                        <div className='w-[40%] flex flex-col gap-10 items-start'>
                            <p className='text-[16px]'>The modern StudyNotion is the dictates its own terms. Today, to be a competitive specialist requires more than professional skills.</p>
                            <CtaButton active={true} linkto={"/signup"}>
                                <p>Learn More</p>
                            </CtaButton>
                        </div>
                    </div>


                    <TimelineSection />
                    <LearningLanguageSection />

                </div>





            </div>

            {/* section-3 */}
            <div className=' bg-richblack-900 pt-10 text-white'>
                <div className='w-11/12 max-w-maxContent mx-auto '>
                    <InstructorSection />
                </div>
            </div>

            <Footer/>

        </div>
    )
}

export default Home