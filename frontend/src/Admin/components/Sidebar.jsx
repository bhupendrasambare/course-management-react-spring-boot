
import React, { useState } from 'react';
import {
    FaTh,
    FaBars,
    FaUserAlt,
    FaRegChartBar,
    FaBookOpen,
    FaTimes,
    FaThList,
    FaUsers
}from "react-icons/fa";
import { NavLink } from 'react-router-dom';
import { Navbar } from './Navbar';


const Sidebar = ({children}) => {
    const[isOpen ,setIsOpen] = useState(false);
    const toggle = () => setIsOpen (!isOpen);
    const menuItem=[
        {
            path:"/admin/dashboard",
            name:"Dashboard",
            icon:<FaTh/>
        },
        {
            path:"/admin/analytics",
            name:"Analytics",
            icon:<FaRegChartBar/>
        },
        {
            path:"/admin/mentors",
            name:"Mentors",
            icon:<FaUserAlt/>
        },
        {
            path:"/admin/users",
            name:"Users",
            icon:<FaUsers/>
        },
        {
            path:"/admin/course",
            name:"Courses",
            icon:<FaBookOpen/>
        }
    ]
    return (
        <div className="d-flex">
           <div style={{width: isOpen ? "250px" : "70px"}} className="sidebar-sidebar shadow">
               <div className="sidebar-top_section">
                   <h4 style={{display: isOpen ? "block" : "none"}} className="text-light ms-2">Admin</h4>
                   <div style={{marginLeft: isOpen ? "70px" : "10px"}} className="sidebar-bars">
                       { !isOpen ? <FaBars className='text-light ' onClick={toggle}/> : <FaTimes className='text-light ' onClick={toggle}/>}
                   </div>
               </div>
               {
                   menuItem.map((item, index)=>(
                       <NavLink to={item.path} key={index} className="sidebar-link text-decoration-none">
                           <div className="sidebar-icon px-2 py-1 rounded-pill shadow-lg fs-4">{item.icon}</div>
                           <div style={{display: isOpen ? "block" : "none"}} className="sidebar-link_text pt-2">{item.name}</div>
                       </NavLink>
                   ))
               }
           </div>
           <main><Navbar/>{children}</main>
        </div>
    );
};

export default Sidebar;