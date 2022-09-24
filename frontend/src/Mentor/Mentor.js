import React from 'react'
import PageNotFound from '../OffPage/PageNotFound'
import {  Route, Routes } from "react-router-dom";
import {Auth} from '../Mentor/Util/MentorAuth';
import Login from '../Mentor/pages/Login';
import Sidebar from './components/Sidebar';
import Dashboard from "./pages/Dashboard"
import AddEditCourse from "./pages/AddEditCourse"
import ManageChapters from "./pages/ManageChapters"
import ManageCourses from "./pages/ManageCourses"
import ManageTopics from "./pages/ManageTopics"
import AddEditTopic from './pages/AddEditTopic';
function Mentor() {
return (
        <>
            <Routes>
            {/* <Route path="/login" element={<>Mentor<Login/></>}/> */}
            <Route path="/login" element={<Login/>}/>
            <Route path="/dashboard" element={<><Auth><Sidebar><Dashboard/></Sidebar></Auth></>}/>
            <Route path="/courses" element={<><Auth><Sidebar><ManageCourses/></Sidebar></Auth></>}/>
            <Route path="/add-course" element={<><Auth><Sidebar><AddEditCourse/></Sidebar></Auth></>}/>
            <Route path="/course/chapters/:id" element={<><Auth><Sidebar><ManageChapters/></Sidebar></Auth></>}/>
            <Route path="/course/manage-topics/:id" element={<><Auth><Sidebar><ManageTopics/></Sidebar></Auth></>}/>
            <Route path="/course/add-edit-topic/:id" element={<><Auth><Sidebar><AddEditTopic/></Sidebar></Auth></>}/>
            <Route path="*" element={<PageNotFound data="/mentor/dashboard"/>} />
            </Routes>
        </>
    )
}

export default Mentor