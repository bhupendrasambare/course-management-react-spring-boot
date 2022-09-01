
import React, { useState } from 'react';
import {
    FaTh,
    FaBars,
    FaUserAlt,
    FaRegChartBar,
    FaBookOpen,
    FaTimes,
    FaUsers,
    FaCommentAlt
}from "react-icons/fa";
import { NavLink } from 'react-router-dom';
import { Navbar } from './Navbar';


const Sidebar = ({children}) => {
    const[isOpen ,setIsOpen] = useState(false);
    const toggle = () => setIsOpen (true);
    const closeToggle = () =>setIsOpen(false);
    const menuItem=[
        {
            path:"/mentor/dashboard",
            name:"Dashboard",
            icon:<FaTh/>
        },
        {
            path:"/mentor/analytics",
            name:"Analytics",
            icon:<FaRegChartBar/>
        },
        {
            path:"/mentor/courses",
            name:"Courses",
            icon:<FaBookOpen/>
        },
        {
            path:"/mentor/feedbacks",
            name:"Feedback",
            icon:<FaCommentAlt/>
        }
    ]
    return (
        <div className="d-flex sidebar-height">
           <div style={{width: isOpen ? "250px" : "70px"}} onMouseEnter={toggle} onMouseLeave={closeToggle} className="sidebar-sidebar shadow">
               <div className="sidebar-top_section">
                   <h4 style={{display: isOpen ? "block" : "none"}} className="text-light ms-2">Mentor</h4>
                   <div style={{marginLeft: isOpen ? "70px" : "10px"}} className="sidebar-bars">
                       { !isOpen ? <FaBars className='text-light '/> : <FaTimes className='text-light ' onClick={closeToggle}/>}
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