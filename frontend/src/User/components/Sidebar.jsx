
import React, { useState } from 'react';
import {
    FaTh,
    FaShoppingCart,
    FaInbox,
    FaHeart,
    FaRegChartBar,
    FaRegEnvelope,
    FaUserAlt
}from "react-icons/fa";
import { NavLink } from 'react-router-dom';


const Sidebar = ({children}) => {
    const[isOpen ,setIsOpen] = useState(false);
    const toggle = () => setIsOpen (true);
    const closeToggle = () =>setIsOpen(false);
    const menuItem=[
        {
            path:"/user/dashboard",
            name:"Dashboard",
            class:" text-primary",
            icon:<FaTh/>
        },
        {
            path:"/user/courses",
            name:"Cources",
            class:" text-success",
            icon:<FaInbox/>
        },
        {
            path:"/user/cart",
            name:"Cart",
            class:" text-warning",
            icon:<FaShoppingCart/>
        },
        // {
        //     path:"/user/favourite",
        //     name:"Favourite",
        //     class:" text-danger",
        //     icon:<FaHeart/>
        // },
        {
            path:"/user/messages",
            name:"Messages",
            class:" text-primary",
            icon:<FaRegEnvelope/>
        },
        {
            path:"/user/account",
            name:"Account",
            class:" text-info",
            icon:<FaUserAlt/>
        }
    ]
    return (
        <div className="d-flex sidebar-height">
           <div style={{width: isOpen ? "250px" : "50px"}} onMouseEnter={toggle} onMouseLeave={closeToggle}  className="sidebar-sidebar shadow bg-light">
               <div className='mt-3'>
                {
                    menuItem.map((item, index)=>(
                        <NavLink to={item.path} key={index} className="sidebar-link text-decoration-none text-dark">
                            <div className={"sidebar-icon px-2 py-1 rounded-pill shadow-lg"+item.class}>{item.icon}</div>
                            <div style={{display: isOpen ? "block" : "none"}} className="family-normal fw-600 pt-2">{item.name}</div>
                        </NavLink>
                    ))
                }
                </div>
           </div>
           <main>{children}</main>
        </div>
    );
};

export default Sidebar;