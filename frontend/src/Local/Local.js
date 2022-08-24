import React from 'react'
import {  Route, Routes } from "react-router-dom";
import PageNotFound from '../OffPage/PageNotFound';
import Navbar from "./components/Navbar"
import Home from "./pages/Home"

function Local() {
return (
    <>
            <Routes>
                <Route path="/" element={<><Navbar/><Home/></>}/>
            <Route path="*" element={<PageNotFound/>} />
            </Routes>
    </>

)
}

export default Local