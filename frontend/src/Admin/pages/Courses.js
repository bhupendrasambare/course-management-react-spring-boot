import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router';
import { NavLink } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';

const Courses = () => {

    const admin = useSelector((state) => state.adminDetails.admin);
    const [courses,setCourses] = useState([]);
    const navigate = useNavigate();

    useEffect(() =>{
        axios({
            url: window.backend+"/api/admin/get-courses?auth=token "+admin.token,
        }).then((res) => { 
            if(res.data.success){
                setCourses(res.data.data);
            }else{
                toast.error('Something Went Wrong!', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            }
        }).catch((err) => {
            toast.error('Something Went Wrong!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            
        });
    },[])


  return (
    <>
    <ToastContainer />
        <div className='m-3 card shadow py-2 px-2'>
            <div className='d-flex w-100'>
                <div><h5 className='m-3'>All Cources</h5></div>
            </div>
            <div className='mx-2 my-3'>
                <div className='d-flex align-items-baseline flex-wrap'>
                    {
                        courses.map(course =>{
                            return (
                                <>
                                    <div className="text-decoration-none bg-light rounded-lg m-3 cursol-pointer  course-card card m-2">
                                        <img src={window.backend+"/api/public/resources?folder=courses&file="+course.image}/>
                                        <div className="card-body">
                                            <h5 className="card-title fs-1 h-37 family-normal">{course.name}</h5>
                                            <div className='d-flex justify-content-between mb-2'>
                                                <div className="card-text ">
                                                    Duration : {course.hour} : {course.minutes}
                                                </div>
                                                <div className="card-text">
                                                    Price : {course.price}
                                                </div>
                                            </div>
                                            <button className='w-100 btn rounded-pill border shadow disabled btn-sm mb-2'>{course.category}</button>
                                            <div className='d-flex'>
                                                <NavLink target="_blank" to={"/courses/"+course.id} className="w-100 me-1 btn-sm btn btn-success px-3">View</NavLink>
                                            </div>

                                        </div>
                                    </div>
                                </>
                            )
                        })
                    }
                    
                    
                </div>
            </div>
        </div>
    </>
  )
}

export default Courses