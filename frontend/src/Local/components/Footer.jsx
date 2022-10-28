import React from 'react'
import { NavLink } from 'react-router-dom'

const Footer = () => {
  return (
    <div className='bg-footer pt-1'>
        <div class="text-light py-5">
            <div class="container">
                <div class="row">
                    <div class="col-md-3 col-lg-4 col-xl-3">
                        <h5>About</h5>
                        <hr class="bg-white mb-2 mt-0 d-inline-block mx-auto w-25"/>
                        <p class="mb-0">
                            E Learning website for learning and developement of one's personal progress.
                        </p>
                    </div>

                    <div class="col-md-2 col-lg-2 col-xl-2 mx-auto">
                        <h5>Informations</h5>
                        <hr class="bg-white mb-2 mt-0 d-inline-block mx-auto w-25"/>
                        <ul class="list-unstyled">
                        <NavLink to="/" className='text-decoration-none text-light fw-500'>Home</NavLink><br/>
                        <NavLink to="/categories" className='text-decoration-none text-light fw-500'>Categories</NavLink><br/>
                        <NavLink to="/courses" className='text-decoration-none text-light fw-500'>Courses</NavLink><br/>
                        {/* <NavLink to="/blogs" className='text-decoration-none text-light fw-500'>Blogs</NavLink><br/> */}
                        </ul>
                    </div>


                    <div class="col-md-4 col-lg-3 col-xl-3">
                        <h5>Contact</h5>
                        <hr class="bg-white mb-2 mt-0 d-inline-block mx-auto w-25"/>
                        <ul class="list-unstyled">
                            {/* <li><i class="fa fa-home mr-2"></i> My company</li> */}
                            <li><i class="fa fa-envelope mr-2"></i>bhupendrasam1404@gmail.com</li>
                            <li><i class="fa fa-phone mr-2"></i> +91 9516138020</li>
                            <li><i class="fa fa-phone mr-2"></i> +91 8989232667</li>
                            {/* <li><i class="fa fa-print mr-2"></i> +91 8989232667</li> */}
                        </ul>
                    </div>
                    
                    <div class="col-md-3 col-lg-2 col-xl-2 mx-auto">
                        <h5>Others links</h5>
                        <hr class="bg-white mb-2 mt-0 d-inline-block mx-auto w-25"/>
                        <ul class="list-unstyled">
                        <a href="https://www.linkedin.com/in/bhupendrasambare/" target="_blank" className='text-decoration-none text-light fw-500'>LinkedIn</a><br/>

                        <a href="https://github.com/bhupendrasambare" target="_blank" className='text-decoration-none text-light fw-500'>Github</a><br/>
                        <NavLink to="/contact" className='text-decoration-none text-light fw-500'>Contact</NavLink><br/>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Footer