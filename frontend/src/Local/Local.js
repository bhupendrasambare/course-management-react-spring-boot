import React from 'react'
import {  Route, Routes } from "react-router-dom";
import PageNotFound from '../OffPage/PageNotFound';
import Footer from './components/Footer';
import Navbar from "./components/Navbar"
import Categories from './pages/Categories';
import Category from './pages/Category';
import Cources from './pages/Cources';
import Home from "./pages/Home"

function Local() {
return (
    <>
            <Routes>
                <Route path="/" element={<><Navbar/><Home/><Footer/></>}/>
                <Route path="/categories" element={<><Navbar/><Categories/><Footer/></>}/>
                <Route path="/categories/:id" element={<><Navbar/><Category/><Footer/></>}/>
                <Route path="/cources" element={<><Navbar/><Cources/><Footer/></>}/>
                <Route path="*" element={<PageNotFound data="/"/>} />
            </Routes>
    </>

)
}

export default Local