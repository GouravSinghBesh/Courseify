import React from 'react'
import { Link } from 'react-router-dom'

const Button = ({active,linkto,children}) => {
  return (
    <div>
        <Link to={linkto}>
            <div className={`${active ? "bg-yellow-50 text-black":"bg-richblack-800" } text-center px-6 py-3 font-bold rounded-sm text-[13px] hover:scale-95 transition-all duration-200`}>
                {children}
            </div>
        </Link>
    </div>
  )
}

export default Button