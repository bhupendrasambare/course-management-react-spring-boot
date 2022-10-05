import axios from 'axios';
import React ,{ useEffect,useState } from 'react'
import Skeleton from 'react-loading-skeleton';
import {  useParams } from 'react-router';

const Course = () => {

    const [courseLoading,setCourseLoading] = useState(true);
    const [course,setCourse] = useState(null);
    const [chapters,setChapters] = useState(null);
    const {id} = useParams()

    useEffect(()=>{
        axios({
            url:window.backend+"/api/public/get-course-by-id",
            params:{
                id:id
            }
        }).then((result) => { 
            if(result.data.success){
                setCourse(result.data.data.courses);
                setChapters(result.data.data.chapterTopics)
                setCourseLoading(false)
            }
        })
    },[id])
    var number =0;
  return (
    <div className='bg-white-1 py-5'>
        <a href='/courses' className='px-4 text-decoration-none text-primary underline ml-3'><i class="fa fa-angle-left mr-2" aria-hidden="true"></i>All Courses</a>
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
                    <img src={window.backend+"/api/public/resources?folder=courses&file="+course.image} height={300} className="m-2"/>
                </div>
                <div className='ml-3 d-flex flex-column'>
                    <h4 className="family-normal fw-600 mt-1 m-2"h4>{course.name}</h4>

                    <a href={"/categories/"+course.categoryId} className='mt-auto my-2 btn rounded-pill shadow-sm px-3 py-1 btn-light'>{course.category}</a>

                    <p className='family-normal mt-1 m-2'><i class="fa fa-video-camera mr-1" aria-hidden="true"></i> {course.hour + "Hr  " + course.minutes+"Min"} ( On-demand Learning material )</p>

                    <p className='family-normal mt-1 m-2 fs-2'>Created by 
                        <a href={"/user/"+course.mentorName} target="_target" className='mt-1 family-normal text-decoration-none text-primary'><small>{" "+course.mentor}</small></a>
                    </p>

                    <button className=' btn-sm form-control btn btn-dark family-normal mt-1 m-2 fs-2'>Enroll
                    </button>
                </div>

            </>}
        </div>
        <div className='my-3 px-4  ml-3'>
            {(courseLoading)?<>
                <div>
                    <Skeleton width={300} height={300} className="mx-4 m-2 w-100"/>
                </div>
            </>:<>
                <div className='row'>

                    <div className='ml-3 mt-3 width-max-700 col-md-6'dangerouslySetInnerHTML={{__html: course.description}}></div>
                    <div className='mt-3 ml-3width-max-700 col-md-6 h-auto' >
                        <div className=' card rounded-lg p-3 '>
                            <h4  className='family-normal'>Course Details</h4>
                            {
                                chapters.map((c)=>{
                                    number++;
                                    return (
                                    <>
                                        <div class="card">
                                            <div class="card-header d-flex justify-content-between" id="headingTwo" data-toggle="collapse" href={"#collapseExample"+number} role="button" aria-expanded="false" aria-controls={"collapseExample"+number}>
                                                <a className=' fw-600'>
                                                    {c.chapter}
                                                </a>
                                                <a className='fs-sm'>
                                                    <small> {c.topics.length} Topics</small>
                                                </a>
                                            </div>
                                            {
                                                c.topics.map((t)=>
                                                {
                                                        return (
                                                        <>
                                                            <div class="collapse" id={"collapseExample"+number}>
                                                                <div class="card card-body">
                                                                    <small>{t}</small>
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

export default Course