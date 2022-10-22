import React from 'react'
import { NavLink } from 'react-router-dom'

const Footer = () => {
  return (
    <div className='bg-footer pt-1'>
        <div className='py-5'>
            <div className='d-flex w-100 justify-content-end  flex-wrap container'>
                <div className='family-normal col-md-3 min-width-200 mb-3'>
                    <NavLink to="/" className='text-decoration-none text-light fw-500'>Home</NavLink><br/>
                    <NavLink to="/categories" className='text-decoration-none text-light fw-500'>Categories</NavLink><br/>
                    <NavLink to="/coursces" className='text-decoration-none text-light fw-500'>Courses</NavLink><br/>
                    <NavLink to="/blogs" className='text-decoration-none text-light fw-500'>Blogs</NavLink><br/>
                </div>
                <div className='family-normal col-md-3  min-width-200  mb-3'>
                    <NavLink to="/contact" className='text-decoration-none text-light fw-500'>Contact</NavLink><br/>
                    <a href="mailto:bhupendrasam1404@gmail.com" target="_blank" className='text-decoration-none text-light fw-500 text-break'>bhupendrasam1404@gmail.com</a><br/>
                    <a className='text-decoration-none text-light fw-500'>+91 9516138020</a><br/>
                    <NavLink to="/resume" className='text-decoration-none text-light fw-500'>Resume</NavLink><br/>
                </div>
                <div className='family-normal col-md-6 mb-3'>
                    <a href="https://www.linkedin.com/in/bhupendrasambare/" target="_blank" className='text-decoration-none text-light fw-500'>LinkedIn</a><br/>

                    <a href="https://github.com/bhupendrasambare" target="_blank" className='text-decoration-none text-light fw-500'>Github</a><br/>

                    <h5 className='text-decoration-none text-light fw-500 fw-600 mt-1'>Feedback</h5>
                    <textarea type="text" className='form-cotrol rounded w-100' placeholder='Enter Your Feedback'/><br/>
                    <button className='btn btn-outline-light btn-sm mt-2'>Submit</button><br/>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Footer