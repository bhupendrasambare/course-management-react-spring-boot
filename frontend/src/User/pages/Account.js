import axios from 'axios';
import { thunderstorm } from 'fontawesome';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify';
import "../Css/Profile.css"

export default function Account() {
  
    const user = useSelector((state) => state.userDetails.user);
    console.log(user)

    const[details,setDetails] = useState(null);

    function getDetails(){
        axios({
            "url":window.backend+"/api/user/get-account?auth=token "+user.token,
        }).then((result)=>{
            if(result.data.success){
                setDetails(result.data.data);
            }else{
                toast.warn("Something went wrong", {
                    theme: "colored",
                    position: "top-right",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: true,
                    progress: undefined,
                });
            }
        })
    }

    useEffect(()=>{
        getDetails()
    },[])

    return (
    <div className='mx-2 my-5 card shadow rounded-lg py-5 px-2'>
        <ToastContainer/>
            <div className="row container">
                {/* <div className="col-md-4">
                    <div className="profile-img">
                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS52y5aInsxSm31CvHOFHWujqUx_wWTS9iM6s7BAm21oEN_RiGoog" alt=""/>
                        <div className="file btn btn-lg btn-primary">
                            Change Photo
                            <input type="file" name="file"/>
                        </div>
                    </div>
                </div> */}
                <div className="col-md-12">
                    <div className="profile-head">
                                <h5>
                                    {details?.first} {details?.last}
                                </h5>
                                <p className="proile-rating">Courses Enrolled : <span>{details?.courses.length}</span></p>
                        <ul className="nav nav-tabs" id="myTab" role="tablist">
                            <li className="nav-item">
                                <a className="nav-link active" id="home-tab" data-toggle="tab" href="#home" role="tab" aria-controls="home" aria-selected="true">About</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" id="profile-tab" data-toggle="tab" href="#profile" role="tab" aria-controls="profile" aria-selected="false">Courses</a>
                            </li>
                        </ul>
                    </div>
                </div>
                {/* <div className="col-md-3 mb-5">
                    <NavLink to={"/user/edit-account"} type="submit" className="w-100" name="btnAddMore"><input type="submit" class="px-3 profile-edit-btn" name="btnAddMore" value="Edit Profile"/></NavLink>
                </div> */}
            </div>
            <div className="row container">
                {/* <div className="col-md-4">
                    
                </div> */}
                <div className="col-md-12">
                    <div className="tab-content profile-tab" id="myTabContent">
                        <div className="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                            <div className="row">
                                <div className="col-md-6">
                                    <label>User Id</label>
                                </div>
                                <div className="col-md-6">
                                    <p>{details?.username}</p>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-6">
                                    <label>Name</label>
                                </div>
                                <div className="col-md-6">
                                    <p>{details?.first} {details?.last}</p>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-6">
                                    <label>Email</label>
                                </div>
                                <div className="col-md-6">
                                    <p>{details?.email}</p>
                                </div>
                            </div>
                            {/* <div className="row">
                                <div className="col-md-6">
                                    <label>Phone</label>
                                </div>
                                <div className="col-md-6">
                                    <p>{details?.phone}</p>
                                </div>
                            </div> */}
                        </div>
                        <div className="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab">
                            
                            {
                                details?.courses.map((data)=>{
                                    return(
                                        <div className="row">
                                            <div className="col-md-6">
                                                <label>{data.name}</label>
                                            </div>
                                            <div className="col-md-6">
                                                <p>
                                                    <NavLink to={"/courses/"+data.id} className='mt-1 family-normal text-primary'>Go To Course</NavLink>
                                                    </p>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                            
                        </div>
                    </div>
                </div>
            </div>
    </div>
  )
}
