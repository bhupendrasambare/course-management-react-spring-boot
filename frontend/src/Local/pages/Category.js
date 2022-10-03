import axios from 'axios';
import React ,{ useEffect,useState } from 'react'
import Skeleton from 'react-loading-skeleton';
import {  useParams } from 'react-router';
import OwlCources from "../components/OwlCources"
const Category = () => {

    const [categoryLoding,setCategoryLoding] = useState(true);
    const [category,setCategory] = useState(null);

    const {id} = useParams()

    useEffect(()=>{
        axios({
            url:window.backend+"/api/public/get-category-by-id",
            params:{
                id:id
            }
        }).then((result) => { 
            if(result.data.success){
                setCategory(result.data.data);
                setCategoryLoding(false)
            }
        })
    },[id])

  return (
    <div className='bg-image-world-blue py-5'>
        <a href='/categories' className='px-4 text-decoration-none text-primary underline ml-3'><i class="fa fa-angle-left mr-2" aria-hidden="true"></i>All Categories</a>
        <div className='px-4 mt-5 d-flex flex-wrap justify-content-start'>
            {(categoryLoding)?<>
                <div>
                    <Skeleton width={300} height={300} className="m-2"/>
                </div>
                <div>
                    <Skeleton width={300} height={60} className="mt-1 m-2"/>
                    <Skeleton width={500} height={240} className="mt-1 m-2"/>
                </div>

            </>:<>
            
                <div className='ml-3'>
                    <img src={window.backend+"/api/public/resources?folder=categories&file="+category.image} width={300} height={300} className="m-2"/>
                </div>
                <div className='ml-3'>
                    <h4 className="family-normal fw-600 mt-1 m-2"h4>{category.name}</h4>
                    <p className="family-normal mt-1 m-2 width-max-500">{category.description}</p>
                </div>

            </>}
            <div>
            </div>
        </div>
        <OwlCources id={id} name={category?.name} />
    </div>
  )
}

export default Category