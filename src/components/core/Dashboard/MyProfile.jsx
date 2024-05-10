import React from 'react'
import { useDispatch } from 'react-redux'
import {logout} from "../../../services/operations/authAPI"
import { useNavigate } from 'react-router-dom';

const MyProfile = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
  return (
    <div className='text-white flex justify-center items-center border-[1px] border-richblue-500'>
        <button onClick={()=>dispatch(logout(navigate))}>logout</button>
    </div>
  )
}

export default MyProfile