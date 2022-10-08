import axios from 'axios';
import { cat } from 'fontawesome';
import React ,{ useEffect,useState } from 'react'
import Skeleton from 'react-loading-skeleton';
import { NavLink } from 'react-router-dom';

const Courses = () => {

    const [data,setData] = useState([]);
    const [courses,setCourses] = useState([]);
    const [loading,setLoading] = useState(true);
    const [categories,setCategories] = useState([]);

  useEffect(()=>{
    axios({
        url:window.backend+"/api/public/get-courses"
    }).then((result) => { 
        if(result.data.success){
            setCourses(preState =>
                {
                preState = [];
                return ([...preState,result.data.data])
            });
            setData(preState =>
                {
                    preState = [];
                    return ([...preState,result.data.data])
                });
            var categoryList = new Set([]);
            result.data.data.map((r)=>{
                categoryList.add(r.category)
            });
            setCategories(preState =>
                {
                preState = [];
                return ([...preState,[...categoryList]])
            });
            setLoading(false)
        }
    })
  },[])

  const filter = (props) =>{
        var filterResult = [];
        if(props === "All"){
            courses[0].map((r)=>{
                    filterResult.push(r);
            })
        }else{
            courses[0].map((r)=>{
                if(r.category == props){
                    filterResult.push(r);
                }
            })
        }
        setData(preState =>
        {
            preState = [];
            return ([...preState,filterResult])
        });
  }


  return (
    <div className='bg-random-1  pb-5 pt-4'>
       <div className='mb-5 mx-3'>
            <NavLink to='/' className='text-decoration-none text-primary underline ml-3 mb-3'><i class="fa fa-angle-left mr-2" aria-hidden="true"></i> Home</NavLink>
            <div className='d-flex flex-wrap justify-content-center mx-auto mt-3'>
                {(loading)?
                <>
                    <div className='w-100 flex-wrap d-flex justify-content-center'>
                        <div><Skeleton width={200} height={40} className="m-2"/></div>
                        <div><Skeleton width={200} height={40} className="m-2"/></div>
                        <div><Skeleton width={200} height={40} className="m-2"/></div>
                        <div><Skeleton width={200} height={40} className="m-2"/></div>
                    </div>
                    <br/>

                    <div><Skeleton width={300} height={300} className="m-2"/>
                    <Skeleton width={300} height={40} className="m-2"/></div>
                    <div><Skeleton width={300} height={300} className="m-2"/>
                    <Skeleton width={300} height={40} className="m-2"/></div>
                    <div><Skeleton width={300} height={300} className="m-2"/>
                    <Skeleton width={300} height={40} className="m-2"/></div>
                    <div><Skeleton width={300} height={300} className="m-2"/>
                    <Skeleton width={300} height={40} className="m-2"/></div>
                    <div><Skeleton width={300} height={300} className="m-2"/>
                    <Skeleton width={300} height={40} className="m-2"/></div>
                    <div><Skeleton width={300} height={300} className="m-2"/>
                    <Skeleton width={300} height={40} className="m-2"/></div>
                    <div><Skeleton width={300} height={300} className="m-2"/>
                    <Skeleton width={300} height={40} className="m-2"/></div>
                </>:
                <>
                    <div className='w-100 flex-wrap d-flex justify-content-center mb-5'>
                    <button className='btn btn-light shadow rounded mx-3 px-3' onClick={() =>filter("All")}>All</button>
                        {

                            categories[0].map((c)=>{
                                return(
                                    <button className='btn btn-light shadow rounded mx-3 px-3' onClick={() =>filter(c)}>{c}</button>
                                )
                            })
                        }
                        
                    </div>
                    <br/>


                    <div className='w-100 flex-wrap d-flex justify-content-start'>
                        {
                            data[0].map((r)=>{
                                return(
                                    <a className='text-decoration-none bg-light rounded-lg m-3 cursol-pointer  course-card flex-fill card m-2'>
                                        <img src={window.backend+"/api/public/resources?folder=courses&file="+r.image} height={200} className=" rounded-top-lg"/>

                                        <div className='px-2 py-3 bg-light fw-600 h-100 d-flex flex-column'>
                                            <NavLink to={"/courses/"+r.id} className='mt-1 family-normal text-decoration-none'>{r.name}</NavLink>
                                            <NavLink target="_blank" to={"/user/"+r.mentorName} className='mt-1 family-normal text-decoration-none'><small>{r.mentor}</small></NavLink>
                                            <div className='mt-auto d-flex justify-content-between'>
                                                <h6 className='fw-400 text-secondary'>{r.hour}Hr {r.minutes}Min</h6>
                                                <div className='text-success mt-1 family-normal text-decoration-none'><i class="fa fa-inr" aria-hidden="true"></i> {r.price}</div>
                                            </div>
                                        </div>
                                    </a>
                                )
                            })
                        }
                    </div>
                
                </>
                }
                </div>
        </div>
    </div>
  )
}

export default Courses