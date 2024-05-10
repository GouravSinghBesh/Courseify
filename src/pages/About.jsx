import React from 'react'
import BannerImage1 from "../assets/Images/aboutus1.webp"
import BannerImage2 from "../assets/Images/aboutus2.webp"
import BannerImage3 from "../assets/Images/aboutus3.webp"
import FundingStory from "../assets/Images/FoundingStory.png"
import Quote from '../components/core/About us/Quote'
import StatsComponent from '../components/core/About us/StatsComponent'
import LearningGrid from '../components/core/About us/LearningGrid'
import ContactFormSection from '../components/core/About us/ContactFormSection'
import HighlightText from "../components/core/Homepage/HighlightText"
import Footer from '../components/common/Footer'

const About = () => {
    return (
        <div className='mx-auto mt-[100px] text-white '>
            {/* section 1 */}
            <section className='w-11/12 mx-auto'>
                <div>
                    <header className='mx-auto w-[80%]'>
                        <p className='text-white font-bold text-[40px] text-center'>Driving Innovation in Online Education for a </p>
                        <p className="text-[40px] text-center font-bold"><HighlightText text={"Brigther Future"} ></HighlightText></p>
                        <p className='text-richblack-200 w-[90%] text-center mx-auto mt-10'>Studynotion is at the forefront of driving innovation in online education. We're passionate about creating a brighter future by offering cutting-edge courses, leveraging emerging technologies, and nurturing a vibrant learning community.</p>
                    </header>
                    <div className='flex gap-2 justify-evenly mt-10'>
                        <img src={BannerImage1} alt='BannerImage1'></img>
                        <img src={BannerImage2} alt='BannerImage2'></img>
                        <img src={BannerImage3} alt='BannerImage3'></img>
                    </div>
                </div>
            </section>

            {/* section-2 */}
            <section className='my-32 w-11/12 mx-auto'>
                    <Quote />
            </section>

            {/* section-3 */}
            <section className='w-11/12 mx-auto'>
                <div>
                    {/* funding story wala div */}
                    <div className='flex gap-4 justify-evenly text-richblack-200'>
                        <div className='flex flex-col gap-3 w-[486px] h-[372px] '>
                            <h1 className='text-[35px] text-pink-400 font-bold'>Our Funding Story</h1>
                            <p>Our e-learning platform was born out of a shared vision and passion for transforming education. It all began with a group of educators, technologists, and lifelong learners who recognized the need for accessible, flexible, and high-quality learning opportunities in a rapidly evolving digital world.</p>
                            <p>As experienced educators ourselves, we witnessed firsthand the limitations and challenges of traditional education systems. We believed that education should not be confined to the walls of a classroom or restricted by geographical boundaries. We envisioned a platform that could bridge these gaps and empower individuals from all walks of life to unlock their full potential.</p>
                        </div>
                        <div>
                            <img src={FundingStory} alt='fundingStory' height={"342px"} width={"534px"}></img>
                        </div>
                    </div>

                    {/* {our mission our vision wala parent div} */}
                    <div className='flex justify-evenly mt-[200px] text-richblack-200'>
                        <div className=' h-[212px] w-[486px]'>
                            <h2 className='text-[35px] text-brown-500 font-bold mb-6'>Our Mission</h2>
                            <p>With this vision in mind, we set out on a journey to create an e-learning platform that would revolutionize the way people learn. Our team of dedicated experts worked tirelessly to develop a robust and intuitive platform that combines cutting-edge technology with engaging content, fostering a dynamic and interactive learning experience.</p>
                        </div>
                        <div className=' h-[236px] w-[486px]'>
                            <h2 className='text-[35px] text-blue-200 font-bold mb-6'>Our Vision</h2>
                            <p>our mission goes beyond just delivering courses online. We wanted to create a vibrant community of learners, where individuals can connect, collaborate, and learn from one another. We believe that knowledge thrives in an environment of sharing and dialogue, and we foster this spirit of collaboration through forums, live sessions, and networking opportunities.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* section-4 */}
            <section className='bg-richblack-800 my-20'>
                <StatsComponent/>
            </section>

            {/* section-5 */}
            <section className='w-11/12 mx-auto'>
                <LearningGrid/>
                <ContactFormSection/>
            </section>

            {/* section-6 */}
            <section>
                <div className='mt-[250px]'>
                    Review from other learners
                </div>
                <Footer/>
            </section>

        </div>
    )
}

export default About