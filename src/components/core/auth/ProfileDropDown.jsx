import React, { useState, useRef } from 'react'
import { useSelector,useDispatch } from 'react-redux';
import { AiOutlineCaretDown } from "react-icons/ai";
import { VscDashboard, VscSignOut } from "react-icons/vsc";
import { Link, useNavigate } from 'react-router-dom';
import {logout} from "../../../services/operations/authAPI"
import useOnClickOutside from "../../../hook/useOnClickOutside"

const ProfileDropDown = () => {
  const [open, setOpen] = useState(false);
  const { user } = useSelector((state) => state.profile);
  const ref = useRef(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useOnClickOutside(ref,()=>setOpen(false))

  if (!user) return null

  return (
    <button className='relative' onClick={()=>setOpen(true)}>
      <div className='flex gap-x-1 items-center'>
        <img src={user?.image} alt="userImage"
          className="aspect-square w-[30px] rounded-full object-cover" />
        <AiOutlineCaretDown className="text-sm text-richblack-100" />
      </div>

      {open && (
        <div onClick={(e)=>e.stopPropagation()} ref={ref}
         className="absolute top-[158%] right-[-50px] z-[1000] divide-y-[1px] divide-richblack-700 overflow-hidden rounded-md border-[1px] border-richblack-700 bg-richblack-800">
          <Link to="/dashboard/my-profile" onClick={()=>setOpen(false)}>
            <div className="flex w-full items-center gap-x-1 py-[10px] px-[12px] text-sm text-richblack-100 hover:bg-richblack-700 hover:text-richblack-25">
              <VscDashboard className='text-lg' />
              Dashboard
            </div>
          </Link>
          <div onClick={()=>{
            dispatch(logout(navigate))
            setOpen(false)
          }}
          className="flex w-full items-center gap-x-1 py-[10px] px-[12px] text-sm text-richblack-100 hover:bg-richblack-700 hover:text-richblack-25">
            <VscSignOut className='text-lg' />
            Logout
          </div>
        </div>
      )}

    </button>
  )
}

export default ProfileDropDown