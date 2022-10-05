import React, { useEffect, useState } from 'react'
import Skeleton from 'react-loading-skeleton';
import OwlCarousel from 'react-owl-carousel'; 
import axios from 'axios';

const OwlCourses = (props) => {

    const [data,setData] = useState([]);
    const [catLoding,setCatLoding] = useState(true);

    const options = {
        margin: 50,
        responsiveClass: true,
        nav: true,
        dots: true,
        smartSpeed: 1000,
        responsive: {
            0: {
                items: 1,
            },
            400: {
                items: 1,
            },
            580: {
                items: 2,
            },
            880: {
                items: 3,
            },
            1100: {
                items: 4,
    
            },
            1300: {
                items: 5,
    
            }
        },
    };

    useEffect(()=>{
        console.log(props?.id)
        var url = "";
        if(props.id === null || props.id === undefined || props.id === "-1"){
            url = window.backend+"/api/public/get-courses"
        }else{
            url = window.backend+"/api/public/get-courses-by-category?id="+props?.id
        }
        axios({
            url:url,
        }).then((result) => { 
            if(result.data.success){

                setData(preState =>
                    {
                        preState = [];
                        return ([...preState,result.data.data])
                    }
                );
                setCatLoding(false)
            }
        })
    },[])


  return (
    <div className='mx-5 card rounded-lg shadow p-3 mt-5 mb-5'>
        <h5 className='family-normal mb-3'>
        {(props.id === null || props.id === undefined || props.id === "-1")?
        <>
            <div className='d-flex justify-content-between'>
                <h5 className='family-normal mb-3'>Courses</h5>
                <a href="/courses" className="text-decoration-none text-primary underline ml-3">All Courses</a>
            </div>
        </>:<>Courses related to {props?.name}</>}
        </h5><hr className='my-0'/>
        { (catLoding)?
            <OwlCarousel  className="owl-theme"  {...options}>  
                <div className='m-3'><Skeleton width={200} height={200}/></div>      
                <div className='m-3'><Skeleton width={200} height={200}/></div>      
                <div className='m-3'><Skeleton width={200} height={200}/></div>      
                <div className='m-3'><Skeleton width={200} height={200}/></div>      
                <div className='m-3'><Skeleton width={200} height={200}/></div>      
                <div className='m-3'><Skeleton width={200} height={200}/></div>      
                <div className='m-3'><Skeleton width={200} height={200}/></div>      
                <div className='m-3'><Skeleton width={200} height={200}/></div>      
            </OwlCarousel>:
            <>
                <OwlCarousel  className="owl-theme" autopla {...options}> 
                    {(data !== [] && data[0].length > 0)?data[0].map((r)=>
                    { 
                            return(
                                <a className='text-decoration-none bg-light rounded-lg m-3 cursol-pointer course-card flex-fill m-2'>
                                <img src={window.backend+"/api/public/resources?folder=courses&file="+r.image} className=" rounded-top-lg"/>

                                <div className='px-2 py-3 bg-light fw-600 h-100 d-flex flex-column'>
                                    <a href={"/courses/"+r.id} className='mt-1 family-normal text-decoration-none h-45'>{r.name}</a>
                                    <a href={"/user/"+r.mentorName} className='mt-1 family-normal text-decoration-none'><small>{r.mentor}</small></a>
                                    <div className='mt-auto d-flex justify-content-between'>
                                        <h6 className='fw-400 text-secondary'>{r.hour}Hr {r.minutes}Min</h6>
                                        <div className='text-success mt-1 family-normal text-decoration-none'><i class="fa fa-inr" aria-hidden="true"></i> {r.price}</div>
                                    </div>
                                </div>
                            </a>
                                )
                            
                    }):
                    <></>} 
                </OwlCarousel>
                {(data[0].length <= 0)?<>
                    <div className='m-3'>
                        <div class="alert alert-warning" role="alert">
                            Currently No Course Available for this Category
                        </div>
                    </div>
                </>:<></>}
                
            </>
        }
    </div>
  )

}

export default OwlCourses