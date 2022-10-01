import React from 'react'
import {  Route, Routes } from "react-router-dom";
import PageNotFound from '../OffPage/PageNotFound';
import Navbar from "./components/Navbar"
import Categories from './pages/Categories';
import Home from "./pages/Home"

function Local() {
return (
    <>
            <Routes>
                <Route path="/" element={<><Navbar/><Home/></>}/>
                <Route path="/categories" element={<><Navbar/><Categories/></>}/>
                <Route path="*" element={<PageNotFound data="/"/>} />
            </Routes>
    </>

)
}

export default Local