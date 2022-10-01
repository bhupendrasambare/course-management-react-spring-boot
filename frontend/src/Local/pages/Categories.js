import axios from 'axios';
import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import Skeleton from 'react-loading-skeleton';
import Footer from '../components/Footer';

function Categories() {

  const [data,setData] = useState([]);
  const [catLoding,setCatLoding] = useState(true);

  useEffect(()=>{
    axios({
        url:window.backend+"/api/public/get-categories"
    }).then((result) => { 
        setData(preState =>
            {
                preState = [];
                return ([...preState,result.data.data])
            }
        );
        setCatLoding(false)
    })
},[])

    return (
        <>
            <div className='bg-image-white py-5'>
                <div className='mb-5 mx-3'>
                    <h3 className='family-normal font-weight-bold'>Courses Categories</h3>
                    <div className='d-flex flex-wrap'>
                    {(catLoding)?<>
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
                        <div><Skeleton width={300} height={300} className="m-2"/>
                        <Skeleton width={300} height={40} className="m-2"/></div>
                        </>:
                        <>
                            {(data != [])?data[0].map((r)=>
                            { 
                                {
                                    return(
                                    <a className='text-decoration-none rounded-lg m-2 cursol-pointer' href={"/categories/"+r.id}>
                                        <img alt={r.name} src={window.backend+"/api/public/resources?folder=categories&file="+r.image} width={300} height={300} className="rounded-lg"/>
                                        <div className='mt-1 mx-auto family-normal text-center'>{r.name}</div>
                                    </a>
                                        )
                                    
                                }
                            }):<></>} 
                        </>
                    }
                    </div>
                </div>    
            </div>
        <Footer/>
        </>
    )
}

export default Categories