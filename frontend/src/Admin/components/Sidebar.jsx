
import React, { useState } from 'react';
import {
    FaTh,
    FaBars,
    FaUserAlt,
    FaRegChartBar,
    FaCommentAlt,
    FaShoppingBag,
    FaThList
}from "react-icons/fa";
import { NavLink } from 'react-router-dom';
import { Navbar } from './Navbar';


const Sidebar = ({children}) => {
    const[isOpen ,setIsOpen] = useState(false);
    const toggle = () => setIsOpen (!isOpen);
    const menuItem=[
        {
            path:"/",
            name:"Dashboard",
            icon:<FaTh/>
        },
        {
            path:"/about",
            name:"About",
            icon:<FaUserAlt/>
        },
        {
            path:"/analytics",
            name:"Analytics",
            icon:<FaRegChartBar/>
        },
        {
            path:"/comment",
            name:"Comment",
            icon:<FaCommentAlt/>
        },
        {
            path:"/product",
            name:"Product",
            icon:<FaShoppingBag/>
        },
        {
            path:"/productList",
            name:"Product List",
            icon:<FaThList/>
        }
    ]
    return (
        <div className="d-flex">
           <div style={{width: isOpen ? "200px" : "50px"}} className="sidebar-sidebar shadow">
               <div className="sidebar-top_section">
                   <h1 style={{display: isOpen ? "block" : "none"}} className="sidebar-logo">Admin</h1>
                   <div style={{marginLeft: isOpen ? "50px" : "0px"}} className="sidebar-bars">
                       <FaBars onClick={toggle}/>
                   </div>
               </div>
               {
                   menuItem.map((item, index)=>(
                       <NavLink to={item.path} key={index} className="sidebar-link text-decoration-none">
                           <div className="sidebar-icon px-2 py-1 rounded-pill shadow-lg">{item.icon}</div>
                           <div style={{display: isOpen ? "block" : "none"}} className="sidebar-link_text">{item.name}</div>
                       </NavLink>
                   ))
               }
           </div>
           <main><Navbar/>{children}</main>
        </div>
    );
};

export default Sidebar;