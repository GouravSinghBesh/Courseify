import React from 'react'
import { NavLink, matchPath,useLocation } from 'react-router-dom'
import * as Icons from "react-icons/vsc"

const SidebarLinks = ({link,iconName}) => {
    const Icon = Icons[iconName];
    const location = useLocation();

    const matchRoute = (route)=>{
        return matchPath({path:route},location.pathname)
    }

  return (
    <NavLink to={link.path} className={`${matchRoute(link.path) ? "bg-yellow-800" : "bg-opacity-0"} px-8 py-2 text-sm font-medium relative`}>

        <span className={`${matchRoute(link.path) ? "opacity-100" : "opacity-0"} absolute top-0 left-0 h-full w-[0.2rem] bg-yellow-50 `}></span>

        <div className='flex items-center gap-x-2'>
            <Icon className="text-lg"/>
            <span>{link.name}</span>
        </div>
    </NavLink>
  )
}

export default SidebarLinks