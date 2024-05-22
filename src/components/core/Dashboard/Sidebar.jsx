import React, { useState } from 'react'
import {sidebarLinks} from "../../../data/dashboard-links"
import { useDispatch, useSelector } from 'react-redux'
import SidebarLinks from './SidebarLinks'
import { VscSignOut } from "react-icons/vsc";
import { useNavigate } from 'react-router-dom';
import {logout} from "../../../services/operations/authAPI"
import ConfirmationModal from '../../common/ConfirmationModal';

const Sidebar = () => {
    const {user} = useSelector((state)=>state.profile)
    const[confirmationModal,setConfirmationModal] = useState(null);
    const dispatch = useDispatch();
    const navigate = useNavigate();

  return (
    <div className='text-white'>
        <div className='min-w-[222px] flex flex-col border-r-[1px] border-richblack-700 h-[calc(100vh-3.5rem)] py-10 bg-richblack-800'>
            <div className='flex flex-col'>
                {sidebarLinks.map((link)=>{
                    if(link.type && user?.accountType !== link.type) return null;
                    return <SidebarLinks key={link.id} link={link} iconName={link.icon}/>
                })}
            </div>

            <div className='w-10/12 h-[1px] mx-auto bg-richblack-600 mt-6 mb-6'></div>

            <div className='flex flex-col text-richblack-300'>
                <SidebarLinks link={{name : "Setting",path : "dashboard/settings",}} iconName="VscSettingsGear"/>

                <button 
                className='text-richblack-300 text-sm font-medium px-8 py-2'
                onClick={()=>setConfirmationModal({
                    text1 : "Are You Sure ?",
                    text2 : "You will be logged out of your Account",
                    btn1Text : "Logout",
                    btn2Text : "Cancel",
                    btn1Handler : ()=>dispatch(logout(navigate)),
                    btn2Handler : ()=>setConfirmationModal(null)
                })}
                >

                    <div className='flex items-center gap-x-2'>
                        <VscSignOut className='text-lg'/>
                        <span>Logout</span>
                    </div>

                </button>
            </div>

        </div>

        {confirmationModal && <ConfirmationModal modalData={confirmationModal}/>}
    </div>
  )
}

export default Sidebar