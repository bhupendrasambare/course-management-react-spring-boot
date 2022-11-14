import axios from 'axios';
import React ,{ useEffect,useState } from 'react'
import Skeleton from 'react-loading-skeleton';
import { useSelector } from 'react-redux';
import {   useLocation, useNavigate } from 'react-router';
import { Link, NavLink, useSearchParams } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';

import "../Css/User.css"

import {
    FaCheckCircle,
}from "react-icons/fa";

function Learning() {
    const navigate = useNavigate();

    const user = useSelector((state) => state.userDetails.user);

    const search = useLocation().search;
    const [searchParams, setSearchParams] = useSearchParams();
    const course = searchParams.get("course");
    const id = new searchParams.get('topic');

    const [topic,setTopic] = useState(null);

    const markAsRead = () =>{
        axios({
            url:window.backend+"/api/user/mark-as-read?auth=token "+user.token,
            params:{
                topic:topic?.id,
            }
        }).then((result) => { 
            if(result.data.success){
                if(topic?.courseCompleted == true){
                    navigate("/user/courses");
                }else{
                    toast.success("Moving to next topic", {
                        theme: "colored",
                        position: "top-right",
                        autoClose: 2000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });
                    setTimeout(function (){
                        navigate("/user/learning?topic="+topic?.nextId);
                    }.bind(this),3000)
                    
                }
            }else{
                navigate("/user/courses");
            }
        })
    }

    useEffect(()=>{
        axios({
            url:window.backend+"/api/user/get-user-topic?auth=token "+user.token,
            params:{
                id:id,
                course:course
            }
        }).then((result) => { 
            if(result.data.success){
                setTopic(result.data.data);
            }else{
                navigate("/user/courses");
            }
        })
    },[id])

  return (
    <div className='bg-white-1 py-5'>
    <ToastContainer />    
        <NavLink to='/user/courses' className='px-4 text-decoration-none text-primary underline ml-3'><i className="fa fa-angle-left mr-2" aria-hidden="true"></i>All Courses</NavLink>
        <div className='px-4 mt-3'>
            <p className='fs-1 fw-400 text-muted'>Course Name : {topic?.chapter}</p>
            <p className='fs-3 fw-500'>{topic?.name}</p>
            <div className='container mt-5'dangerouslySetInnerHTML={{__html: topic?.description}}></div>
            <div className='container mt-3 d-flex flex-wrap w-100 justify-content-between'>
                <div></div>
                <div>
                    {
                        (topic?.courseCompleted == false)?<>
                            <Link to={"/user/learning?topic="+topic?.nextId}><button className='btn btn-primary mr-2'>Next</button></Link>
                        </>:<></>
                        
                    }
                    <button className='btn btn-success' onClick={markAsRead}>Mark as Done</button>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Learning