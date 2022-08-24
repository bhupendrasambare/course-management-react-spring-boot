import React from 'react'
import { BrowserRouter,Route, Routes } from 'react-router'
import PageNotFound from '../OffPage/PageNotFound'
import Login from "./pages/Login"

function Admin() {
  return (
    <>
        <Routes>
            <Route path="/login" element={<Login/>}/>
            <Route path="*" element={<PageNotFound/>} />
        </Routes>
    </>
  )
}

export default Admin