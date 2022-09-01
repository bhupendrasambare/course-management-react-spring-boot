import React from 'react'
import PageNotFound from '../OffPage/PageNotFound'
import {  Route, Routes } from "react-router-dom";
import {Auth} from '../Mentor/Util/MentorAuth';
import Login from '../Mentor/pages/Login';
import Dashboard from '../Mentor/pages/Dashboard';
import Sidebar from './components/Sidebar';
import Courses from './pages/Courses';
import AddCourse from './pages/AddCourse';

function Mentor() {
  return (
    <>
    <Routes>
            {/* <Route path="/login" element={<>Mentor<Login/></>}/> */}
              <Route path="/login" element={<Login/>}/>
              <Route path="/dashboard" element={<><Auth><Sidebar><Dashboard/></Sidebar></Auth></>}/>
              <Route path="/courses" element={<><Auth><Sidebar><Courses/></Sidebar></Auth></>}/>
              <Route path="/add-course" element={<><Auth><Sidebar><AddCourse/></Sidebar></Auth></>}/>
              <Route path="*" element={<PageNotFound data="/mentor/dashboard"/>} />
        </Routes>
    </>
  )
}

export default Mentor