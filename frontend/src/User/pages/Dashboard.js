import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { toast, ToastContainer } from 'react-toastify';
import { BsBook, BsBookmarkCheck } from "react-icons/bs";
import $, { data } from 'jquery'
import { windows } from 'fontawesome';
import { NavLink } from 'react-router-dom';
import {
    FaArrowRight,
}from "react-icons/fa";

function Dashboard() {
  
    const user = useSelector((state) => state.userDetails.user);
    const[details,setDetails] = useState(null);

    useEffect(()=>{
        axios({
            "url":window.backend+"/api/user/get-dashboard?auth=token "+user.token,
        }).then((result)=>{
            if(result.data.success){
                setDetails(result.data.data);
                if(result.data.data!= null){

                    $("#data-table").DataTable({
                        data: result.data.data.courses,
                        columns: [
                            {   data: 'name',},
                            {   data: 'image',
                                'render': function(data, type, full, meta){
                                    console.log(full)
                                    return "<img src='"+window.backend+"/api/public/resources?folder=courses&file="+data+"' width='100px'/>";
                                }
                            },
                            {   data: 'category'},
                            {   data: 'mentor'},
                        ],
                    });
                }

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
    },[])

  return (
    <>
    <ToastContainer/>
    <div className='mx-2 my-2 py-4 px-2'>

        <div className="d-flex flex-wrap justify-content-start">
            <div className="card border-left-primary shadow h-100 py-1 m-2">
                <div className="w-300 card-body">
                    <div className="row no-gutters align-items-center">
                        <div className="col mx-2">
                            <BsBook className="fas fa-calendar fa-2x text-success"/>
                            <div className="text-xs font-weight-bold text-success text-uppercase my-1">
                                Total Courses
                            </div>
                        </div>
                        <div className="col-auto">
                            <div className="fs-8 mb-0 font-weight-bold text-success">{details?.countCourses}</div>
                        </div>
                    </div>
                </div>
            </div>
            
            <div className="card border-left-primary shadow py-1 m-2">
                <div className="w-300 card-body">
                    <div className="row no-gutters align-items-center">
                        <div className="col mx-2">
                            <BsBookmarkCheck className="fas fa-calendar fa-2x text-warning"/>
                            <div className="text-xs font-weight-bold text-warning text-uppercase my-1">
                                Total Courses
                            </div>
                        </div>
                        <div className="col-auto">
                            <div className="fs-8 mb-0 font-weight-bold text-warning">{details?.countTopics}</div>
                        </div>
                    </div>
                </div>
            </div>
            
        </div>
    </div>

    <div className='card shadow mx-2 mb-4 my-2 py-4 px-2'>
        {
            (details != null && details?.courses.length != 0)?<></>:<>
                <div className='text-danger family-normal fw-600'>Your Cart's Empty</div>
            </>
        }

        {
            details?.courses.map((c)=>{
                return (
                <>
                    <div className="row shadow-sm pb-3 m-4 justify-content-between align-items-center">
                        
                        <div className="col-md-2 col-lg-2 col-xl-2">
                            <NavLink to={"/user/learn/"+c.id} className="width-max-150">
                                <img src={window.backend+"/api/public/resources?folder=courses&file="+c.image} className="img-fluid rounded-3 " alt={c.courseName}/>
                            </NavLink>
                        </div>

                        <div className="col-md-3 col-lg-3 col-xl-2 d-flex mt-2 pl-5">
                            <h6 className="ml-2">
                                <NavLink to={"/user/learn/"+c.id}><h6 className="text-black mb-0 mt-2">{c.name}</h6></NavLink>
                            </h6>
                        </div>
                        
                        <div className="col-md-3 col-lg-3 col-xl-3 pl-5">
                            <NavLink to={"/categories/"+c.categoryId}><h6 className="text-muted mt-2">{c.category}</h6></NavLink>
                        </div>

                        <div className="col-md-3 mt-2 col-lg-2 col-xl-2 pl-5">
                            <NavLink to={"/user/learn/"+c.id} className="text-muted">
                                <button >
                                    Go To Course <FaArrowRight className='text-success'/>
                                </button> 
                            </NavLink>
                        </div>
                    </div>
                </>
                )
            })
        }
    </div>
    </>
  )
}

export default Dashboard