import React, { useEffect, useState } from 'react'
import Skeleton from 'react-loading-skeleton';
import OwlCarousel from 'react-owl-carousel'; 
import axios from 'axios';

const Categorie = () => {

    const [data,setData] = useState([]);
    const [catLoding,setCatLoding] = useState(true);

    const options = {
        margin: 50,
        responsiveClass: true,
        nav: true,
        loop:true,
        dots: true,
        autoplay: true,
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

    // useEffect(()=>{
    //     // if(data != null && data.length !=0){ 
    //         setCatLoding(false)
    //         setCategories(data)
    //     // }
    // },[data])   
  return (
    <div className='mx-5 card rounded-lg shadow p-3 mt-5 mb-5'>
        <h5 className='family-normal mb-3'>Categories</h5><hr className='my-0'/>
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
                <OwlCarousel  className="owl-theme"  {...options}> 
                    {(data != [])?data[0].map((r)=>
                    { 
                        {
                            return(
                            <a className='text-decoration-none rounded-lg m-3 cursol-pointer' href={"/categories/"+r.id}>
                                <img src={window.backend+"/api/public/resources?folder=categories&file="+r.image} width={200} height={200} className=" rounded-lg"/>
                                <div className='mt-1 mx-auto family-normal text-center'>{r.name}</div>
                            </a>
                                )
                            
                        }
                    }):<></>} 
                </OwlCarousel>
                
            </>
        }
        
    </div>
  )
}

export default Categorie