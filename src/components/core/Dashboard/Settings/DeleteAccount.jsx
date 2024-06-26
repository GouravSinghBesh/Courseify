import React from 'react'
import { FiTrash2 } from "react-icons/fi";
import { deleteProfile } from '../../../../services/operations/settingsAPI';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const DeleteAccount = () => {
  const {token} = useSelector((state)=>state.auth)
  const dispatch = useDispatch()
  const navigate = useNavigate();
  const handleDeleteAccount = async()=>{
    try {
      dispatch(deleteProfile(token,navigate))
    } catch (error) {
        console.log("Error message : ",error)
    }
  }
  return (
    <div className='flex gap-x-5 rounded-md border-[1px] border-pink-700 bg-pink-900 p-8 px-12 my-10'>
      <div className='flex aspect-square h-14 w-14 justify-center items-center rounded-full bg-pink-700'>
        <FiTrash2/>
      </div>
      <div className='flex flex-col space-y-2'>
          <h2 className='text-lg font-semibold text-richblack-5'>Delete Account</h2>
          <div className='text-pink-25 w-3/5'>
            <p>Would you like to delete account?</p>
            <p> This account may contain Paid Courses. Deleting your account is
              permanent and will remove all the contain associated with it.</p>
          </div>
          <button 
          type='button'
          className='w-fit italic cursor-pointer text-pink-300'
          onClick={handleDeleteAccount}
          >I want to delete my account</button>
      </div>
    </div>
  )
}

export default DeleteAccount