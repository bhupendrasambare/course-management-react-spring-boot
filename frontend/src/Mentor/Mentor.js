import React from 'react'
import PageNotFound from '../OffPage/PageNotFound'
import {  Route, Routes } from "react-router-dom";

function Mentor() {
  return (
    <>
    <Routes>
            {/* <Route path="/login" element={<>Mentor<Login/></>}/> */}
            <Route path="*" element={<PageNotFound/>} />
        </Routes>
    </>
  )
}

export default Mentor