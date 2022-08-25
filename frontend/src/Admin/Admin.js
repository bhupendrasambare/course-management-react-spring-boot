import React from 'react'
import { BrowserRouter,Route, Routes } from 'react-router'
import PageNotFound from '../OffPage/PageNotFound'
import Login from "./pages/Login"
import Dashboard from "./pages/Dashboard"
import Sidebar from './components/Sidebar'
function Admin() {
  return (
    <>
        <Routes>
            
            <Route path="/login" element={<Login/>}/>
            <Route path="/dashboard" element={<><Sidebar><Dashboard/></Sidebar></>}/>
            <Route path="*" element={<PageNotFound/>} />
            
        </Routes>
    </>
  )
}

export default Admin