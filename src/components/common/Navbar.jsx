import React from 'react'
import { Link, matchPath } from 'react-router-dom'
import logo from "../../assets/Logo/Logo-Full-Light.png"
import { NavbarLinks } from '../../data/navbar-links'
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { IoCart } from "react-icons/io5";
import { apiconnector } from '../../services/apiconnector';
import { categories } from '../../services/apis';
import { useState,useEffect } from 'react';
import ProfileDropDown from '../core/auth/ProfileDropDown';
const subLinks = [
    {
        title: "python",
        link: "/catalog/python"
    },
    {
        title: "web dev",
        link: "/catalog/web-development"
    },
];



const Navbar = () => {
    const { token } = useSelector((state)=>state.auth);
    const { user } = useSelector((state)=>state.profile);
    const { totalItems } = useSelector((state)=>state.cart);
    const [subLinks,setSublinks] = useState([]);
    const location = useLocation();

    // const fetchSublinks = async()=>{
    //     try {
    //         const result = await apiconnector("GET",categories.CATEGORIES_API);
    //         console.log("display all categories"+result)
    //         setSublinks(result.data.data);
    //     } catch (error) {
    //         console.log("could not fetch categories data")
    //     }
       
    // }

    // useEffect(() => {
    //     fetchSublinks();
    // }, [])
    

    const matchRoute = (path) => {
        return (matchPath(path, location.pathname))
    }

    return (
        <div className='border-b-[1px] border-b-richblack-700 h-14 flex items-center '>
            <div className='relative w-11/12 max-w-maxContent flex justify-between items-center text-richblack-5'>
                {/* logo */}
                <Link to="/">
                    <img src={logo} alt="Logo" height={42} width={160} />
                </Link>

                {/* navbarLinks */}
                <nav>
                    <ul className='flex gap-x-6'>
                        {
                            NavbarLinks.map((navlinks, index) => (
                                <li key={index} >
                                    {navlinks.title === "Catalog" ?
                                        (<div className='flex gap-2 items-center  group'>
                                            <p>{navlinks.title}</p>
                                            <MdOutlineKeyboardArrowDown />
                                            {/* TODO:hover effect */}
                                            <div className='invisible absolute bg-richblack-5 flex flex-col text-richblack-900  lg:w-[300px] group-hover:visible'>
                                                <div></div>
                                                {
                                                    subLinks.length ?
                                                        (subLinks.map((links, index) => (
                                                            <Link to={links.link} key={index}>
                                                                <p>{links.title}</p>
                                                            </Link>
                                                        ))) :
                                                        (<div></div>)
                                                }
                                            </div>
                                        </div>) :
                                        (<div>
                                            <Link to={navlinks.path} className={`${matchRoute(navlinks.path) ? "text-yellow-25" : "text-richblack-25"}`}>
                                                {navlinks.title}
                                            </Link>
                                        </div>)}

                                </li>
                            ))
                        }
                    </ul>
                </nav>

                <div>
                    {/* login signup dashboard */}
                    {
                        user && user.account_type === "student" && (
                            <Link to="/dashboard/cart">
                                <IoCart />
                                {totalItems > 0 && (
                                    <span>{totalItems}</span>
                                )}
                            </Link>
                        )
                    }
                    {
                        token === null && (
                            <Link to="/login">
                                <button className='border border-richblack-700 text-richblack-100 rounded-md px-[12px] py-[8px] mx-2'>Login</button>
                            </Link>
                        )
                    }
                    {
                        token === null && (
                            <Link to="/signup">
                                <button className='border border-richblack-700 text-richblack-100 rounded-md px-[12px] py-[8px]'>Sign Up</button>
                            </Link>
                        )
                    }
                    {
                        token !== null && (
                            <ProfileDropDown/>
                        )
                    }
                </div>
            </div>
        </div>
    )
}

export default Navbar