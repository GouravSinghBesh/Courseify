import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import IconBtn from '../../common/IconBtn';
import { RiEditBoxLine } from "react-icons/ri";

const MyProfile = () => {
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.profile)

  return (
    <div className='text-white'>
      <h1 className='text-richblack-5 font-medium text-3xl mb-14'>My Profile</h1>

      {/* section-1 */}
      <div className='flex justify-between items-center bg-richblack-800 border-[1px] border-richblack-700 rounded-md p-8 px-12 gap-x-16'>
        <div className='flex items-center gap-x-4'>
          <img src={user?.image} alt="profile-picture"
            className='aspect-square rounded-full w-[78px] object-cover' />

          <div className='flex flex-col gap-4'>
            <p className='text-lg font-semibold text-richblack-5'>{user?.firstName + " " + user?.lastName}</p>
            <p className='text-sm text-richblack-300'>{user?.email}</p>
          </div>

        </div>
        <IconBtn type="text" onclick={() => {
          navigate("/dashboard/settings")
        }}
          text="Edit"
        >
          <RiEditBoxLine />
        </IconBtn>
      </div>

      {/* section-2 */}
      <div className='flex flex-col gap-y-10 rounded-md bg-richblack-800 border-[1px] border-richblack-700 my-10 p-8 px-12'>
        <div className='flex justify-between items-center w-full'>
          <p className='font-semibold text-lg text-richblack-5'>About</p>
          <IconBtn type="text" onclick={() => { navigate("/dashboard/settings") }} text="Edit">
            <RiEditBoxLine />
          </IconBtn>
        </div>
        <p className={`text-sm ${user?.additionalDetails?.about ? "text-richblack-5" : "text-richblack-400"} font-semibold`}>{user?.additionalDetails?.about ?? "Write Something about Yourself"}</p>
      </div>

      {/* section-3 */}
      <div className='flex flex-col gap-y-10 rounded-md bg-richblack-800 border-[1px] border-richblack-700 my-10 p-8 px-12'>
        <div className='flex items-center justify-between w-full'>
          <p className='text-lg text-richblack-5 font-semibold'>Personal Details</p>
          <IconBtn type="text" onclick={() => { navigate("/dashboard/settings") }} text="Edit">
            <RiEditBoxLine />
          </IconBtn>
        </div>

        <div className='flex justify-between max-w-[500px]'>
          <div className='flex flex-col gap-y-5'>
            <div>
              <p className="mb-2 text-sm text-richblack-600">FirstName</p>
              <p className="text-sm font-medium text-richblack-5">{user?.firstName}</p>
            </div>

            <div>
              <p className="mb-2 text-sm text-richblack-600">Email</p>
              <p className="text-sm font-medium text-richblack-5">{user?.email}</p>
            </div>

            <div>
              <p className="mb-2 text-sm text-richblack-600">Gender</p>
              <p className="text-sm font-medium text-richblack-5">{user?.gender}</p>
            </div>

          </div>

          <div className='flex flex-col gap-y-5'>
            <div>
              <p className="mb-2 text-sm text-richblack-600">LastName</p>
              <p className="text-sm font-medium text-richblack-5">{user?.lastName}</p>
            </div>

            <div>
              <p className="mb-2 text-sm text-richblack-600">Phone Number</p>
              <p className="text-sm font-medium text-richblack-5">{user?.additionalDetails?.contactNumber ?? "Add Contact Number"}</p>
            </div>

            <div>
              <p className="mb-2 text-sm text-richblack-600">Date of Birth</p>
              <p className="text-sm font-medium text-richblack-5">{user?.additionalDetails?.dateOfBirth ?? "Add Date of Birth"}</p>
            </div>
          </div>


        </div>
      </div>
    </div>

  )
}

export default MyProfile