import axios from 'axios';
import React ,{ useEffect,useState } from 'react'
import Skeleton from 'react-loading-skeleton';
import { useSelector } from 'react-redux';
import {   useLocation, useNavigate, useParams } from 'react-router';
import { NavLink } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';

import {
    FaCheckCircle,
}from "react-icons/fa";

const ManageCourse = () => {

    const navigate = useNavigate();

    const user = useSelector((state) => state.userDetails.user);

    const [courseLoading,setCourseLoading] = useState(true);
    const [course,setCourse] = useState(null);
    const [chapters,setChapters] = useState(null);
    const {id} = useParams()

    useEffect(()=>{
        axios({
            url:window.backend+"/api/user/get-course-by-id?auth=token "+user.token,
            params:{
                id:id
            }
        }).then((result) => { 
            if(result.data.success){
                setCourse(result.data.data.courses);
                setChapters(result.data.data.chapterTopics)
                setCourseLoading(false)
            }else{
                navigate("/user/courses");
            }
        })
    },[id])
    var number =0;
  return (
    <div className='bg-white-1 py-5'>
    <ToastContainer />    
        <NavLink to='/user/courses' className='px-4 text-decoration-none text-primary underline ml-3'><i className="fa fa-angle-left mr-2" aria-hidden="true"></i>All Courses</NavLink>
        <div className='px-4 mt-5 d-flex flex-wrap justify-content-start'>
            {(courseLoading)?<>
                <div>
                    <Skeleton width={300} height={300} className="m-2"/>
                </div>
                <div>
                    <Skeleton width={400} height={60} className="mt-1 m-2"/>
                    <Skeleton width={200} height={60} className="mt-1 m-2"/>
                    <Skeleton width={200} height={60} className="mt-1 m-2"/>
                    <Skeleton width={300} height={60} className="mt-1 m-2"/>
                </div>

            </>:<>
            
                <div className='ml-3'>
                    <img src={window.backend+"/api/public/resources?folder=courses&file="+course?.image} className="m-2 width-max-300"/>
                </div>
                <div className='ml-3 d-flex flex-column'>
                    <h4 className="family-normal fw-600 mt-1 m-2"h4>{course?.name}</h4>

                    <NavLink to={"/categories/"+course?.categoryId} target="_blank" className='mt-auto my-2 btn rounded-pill shadow-sm px-3 py-1 btn-light'>{course?.category}</NavLink>

                    <p className='family-normal mt-1 m-2'><i className="fa fa-video-camera mr-1" aria-hidden="true"></i> {course?.hour + "Hr  " + course?.minutes+"Min"} ( On-demand Learning material )</p>

                    <p className='family-normal mt-1 m-2 fs-2'>Created by 
                        <a target="_target" className='mt-1 family-normal text-decoration-none text-primary'><small>{" "+course?.mentor}</small></a>
                    </p>
                    <button className=' btn-sm form-control btn btn-success family-normal mt-1 m-2 fs-2'>Start Learning</button> 

                </div>

            </>}
        </div>
        <div className='my-3 px-4  ml-3'>
            {(courseLoading)?<>
                <div>
                    <Skeleton width={300} height={300} className="mx-4 m-2 w-100"/>
                </div>
            </>:<>
                <div className='d-flex flex-wrap'>

                    <div className='ml-3 mt-3 min-width-500 col-md-6 w-50'dangerouslySetInnerHTML={{__html: course?.description}}></div>
                    <div className='mt-3 ml-3 w-10 h-auto flex-fill' >
                        <div className='shadow card rounded-lg p-3  w-100'>
                            <h4  className='family-normal'>Course Details</h4>
                            {
                                chapters?.map((c)=>{
                                    number++;
                                    return (
                                    <>
                                        <div className="card">
                                            <div className="card-header d-flex justify-content-between" id="headingTwo" data-toggle="collapse" href={"#collapseExample"+number} role="button" aria-expanded="false" aria-controls={"collapseExample"+number}>
                                                <a className=' fw-600'>
                                                    {c?.chapter}
                                                </a>
                                                <a className='fs-sm'>
                                                    <small> {c?.topics.length} Topics</small>
                                                </a>
                                            </div>
                                            {
                                                c?.topics.map((t)=>
                                                {
                                                        return (
                                                        <>
                                                            <div className="collapse" id={"collapseExample"+number}>
                                                                <div className="card card-body">
                                                                <div>
                                                                    {(t?.isCompleted)?<><FaCheckCircle className='fs-5 mr-3 text-success'/></>:<><FaCheckCircle className='fs-5 mr-3 text-muted'/></>}
                                                                {t?.topic}</div>
                                                                </div>
                                                            </div>
                                                        </>)
                                                    }
                                                )
                                            }
                                        </div>
                                    </>)
                                })
                            }
                        </div>
                                
                            
                            
                    </div>
                </div>

            </>}
        </div>

    </div>
  )
}

export default ManageCourse