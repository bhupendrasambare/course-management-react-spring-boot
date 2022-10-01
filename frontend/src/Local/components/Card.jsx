import React from 'react'
import { useState } from 'react'

export const Card = () => {

    const [serchLoging,setSearchLoding] = useState(false);

  return (
        <div>
            <div className="container-fluid bg-danger bg-image-1">
        
                <div className="row h-100 mx-4 index-card-box">
                    <div className='container mt-5 shadow shadow-light rounded bg-light p-2'>

                        
                        <img className="mr-autor navbar-brand" src='/images/light-logo.jpeg' height={150} width={170}/>

                        <div className='ml-2'>

                            <h5 className='family-normal mt-3 font-weight-bold'>
                            <i className="fa fa-rocket fa-2 text-warning font-weight-bold" aria-hidden="true"></i>&ensp;Boost Carier With New Skills
                            </h5>

                            <input type="text" placeholder="Let's Learn Something Excited (❁´◡`❁)" className="form-control rounded-pill border-3 card" data-toggle="dropdown" aria-expanded="false"/>

                            {(serchLoging)?<>
                                <div className="rounded dropdown-menu index-card-box mr-5">
                                    <div className='ml-2'>
                                        <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>&ensp;
                                        Loading...
                                    </div>
                                </div>
                            </>:<>
                                
                            </>}

                            <p className='mt-2'>
                                <a><img src="./images/celebrate.png" height={20} width={20}/>&ensp;&ensp;New Courses</a>
                            </p>
                            
                            <p>
                                <a><img src="./images/blog-icon.jpg" height={20} width={20}/>&ensp;&ensp;Blogs</a>
                            </p>

                            <p>
                                <a><img src="./images/user-icon.jpg" height={20} width={20}/>&ensp;&ensp;Users Account</a>
                            </p>

                        </div>
                    </div>
                </div>
            </div>
        </div>
  )
}
