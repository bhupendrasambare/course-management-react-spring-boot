import React from 'react'

const Footer = () => {
  return (
    <div className='bg-footer pt-1'>
        <div className='py-5'>
            <div className='d-flex justify-content-around flex-wrap mx-5'>
                <div className='family-normal min-width-200 m-5' width={60}>
                    <a href='/' className='text-decoration-none text-light fw-500'>Home</a><br/>
                    <a href='/categories' className='text-decoration-none text-light fw-500'>Categories</a><br/>
                    <a href='/cources' className='text-decoration-none text-light fw-500'>Cources</a><br/>
                    <a href='/blogs' className='text-decoration-none text-light fw-500'>Blogs</a><br/>
                </div>
                <div className='family-normal min-width-200 m-5' width={60}>
                    <a href='/contact' className='text-decoration-none text-light fw-500'>Contact</a><br/>
                    <a href='mailto:bhupendrasam1404@gmail.com' target="_blank" className='text-decoration-none text-light fw-500'>bhupendrasam1404@gmail.com</a><br/>
                    <a className='text-decoration-none text-light fw-500'>+91 9516138020</a><br/>
                    <a href='/resume' className='text-decoration-none text-light fw-500'>Resume</a><br/>
                </div>
                <div className='family-normal min-width-600 m-5' width={60}>
                    <a href='https://www.linkedin.com/in/bhupendrasambare/' target="_blank" className='text-decoration-none text-light fw-500'>LinkedIn</a><br/>

                    <a href='https://github.com/bhupendrasambare' target="_blank" className='text-decoration-none text-light fw-500'>Github</a><br/>

                    <h5 className='text-decoration-none text-light fw-500 fw-600 mt-1'>Feedback</h5>
                    <textarea type="text" className='form-cotrol rounded w-100' placeholder='Enter Your Feedback'/><br/>
                    <button href='/home' className='btn btn-outline-light btn-sm mt-2'>Submit</button><br/>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Footer