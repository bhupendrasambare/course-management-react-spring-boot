import React from 'react'
import { BrowserRouter,Route, Routes } from 'react-router'
import PageNotFound from '../OffPage/PageNotFound'
import Login from "./pages/Login"
import Dashboard from "./pages/Dashboard"
import Sidebar from './components/Sidebar'
import { Auth } from './util/AdminAuth'
function Admin() {
  return (
    <>
          <Routes>
              
              <Route path="/login" element={<Login/>}/>
              <Route path="/dashboard" element={<><Auth><Sidebar><Dashboard/></Sidebar></Auth></>}/>
              <Route path="*" element={<PageNotFound data="/admin/dashboard"/>} />
              
          </Routes>
    </>
  )
}

export default Admin