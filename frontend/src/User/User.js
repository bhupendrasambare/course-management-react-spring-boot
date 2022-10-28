import React from 'react'
import {  Route, Routes } from "react-router-dom";
import PageNotFound from '../OffPage/PageNotFound';
import Navbar from "../Local/components/Navbar"
import Footer from "../Local/components/Footer"
import Sidebar from "./components/Sidebar"
import Login from './pages/Login';
import Register from './pages/Register';
import Account from './pages/Account';
import Cart from './pages/Cart';
import Courses from './pages/Courses';
import Dashboard from './pages/Dashboard';
import Favourite from './pages/Favourite';
import Massages from './pages/Massages';
import { Auth } from './util/UserAuth';
import EditAccount from './pages/EditAccount';
import ManageCourse from './LearningPage/ManageCourse';


function User() {
return (
    <>
        <Navbar/>
            <Routes>
                <Route path="/login" element={<Login/>}/>
                
                <Route path="/register" element={<Register/>}/>
                
                <Route path="/dashboard" element={<Auth><Sidebar><Dashboard/></Sidebar></Auth>}/>
                
                <Route path="/courses" element={<Auth><Sidebar><Courses/></Sidebar></Auth>}/>
                
                <Route path="/cart" element={<Auth><Sidebar><Cart/></Sidebar></Auth>}/>
                
                <Route path="/favourite" element={<Auth><Sidebar><Favourite/></Sidebar></Auth>}/>
                
                <Route path="/messages" element={<Auth><Sidebar><Massages/></Sidebar></Auth>}/>
                
                <Route path="/account" element={<Auth><Sidebar><Account/></Sidebar></Auth>}/>

                <Route path="/learn/:id" element={<Auth><Sidebar><ManageCourse/></Sidebar></Auth>}/>
                
                <Route path="*" element={<PageNotFound data="/"/>} />
            </Routes>
        <Footer/>
    </>

)
}

export default User