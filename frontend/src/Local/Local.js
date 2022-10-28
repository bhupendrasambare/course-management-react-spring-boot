import React from 'react'
import {  Route, Routes } from "react-router-dom";
import PageNotFound from '../OffPage/PageNotFound';
import Footer from './components/Footer';
import Navbar from "./components/Navbar"
import Categories from './pages/Categories';
import Category from './pages/Category';
import Courses from './pages/Courses';
import Course from './pages/Course';
import Home from "./pages/Home"
import Contact from './pages/Contact';

function Local() {
return (
    <>
        <Navbar/>
            <Routes>
                <Route path="/" element={<><Home/></>}/>
                <Route path="/categories" element={<><Categories/></>}/>
                <Route path="/categories/:id" element={<><Category/></>}/>
                <Route path="/courses" element={<><Courses/></>}/>
                <Route path="/courses/:id" element={<><Course/></>}/>
                <Route path="/contact" element={<><Contact/></>}/>
                <Route path="*" element={<PageNotFound data="/"/>} />
            </Routes>
        <Footer/>
    </>

)
}

export default Local