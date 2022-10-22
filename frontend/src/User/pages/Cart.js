import axios from 'axios';
import React, { useState,useEffect } from 'react'
import { useSelector } from 'react-redux';
import {
    FaRegClock,
    FaTrash,
}from "react-icons/fa";
import { NavLink } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';

function Cart() {
    const user = useSelector((state) => state.userDetails.user);

    const [cart,setCart] = useState([]);
    const [total,setTotal] = useState(0);
    const [count,setCount] = useState(0);

    const getCartCources = () =>{
        axios(window.backend+"/api/user/get-cart?auth=token "+user.token).then((result)=>{
            if(result.data.success){
                setCart(preState =>
                    {
                    preState = [];
                    return ([...preState,result.data.data])
                });
                var temp=0;
                setCount(result.data.data.length);
            
                result.data.data.map((i)=>{
                    temp += i.price;
                    setTotal(temp);
                })
            }
        })
    }

    function deleteCart(props){
        console.log(props)
        axios({
            "url":window.backend+"/api/user/delete-cart?auth=token "+user.token,
            method:"DELETE",
            params:{
                id:props
            }
        }).then((result)=>{
            if(result.data.success){
                toast.warn(result.data.message, {
                    theme: "colored",
                    position: "top-right",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
                getCartCources()
            }
        })
    }

    useEffect(()=>{
        getCartCources()
    },[])

    return (
        <div>
        <ToastContainer />  
            <div className='py-3 m-3 w-minus-40'>
                <div className="h-100">
                    <div className="row d-flex justify-content-center align-items-center h-100">
                    <div className="col-12">
                        <div className="card-registration card-registration-2">
                        <div className="card-body p-0">
                            <div className="row g-0 ml-2">
                            <div className="col-lg-9 mt-2">
                                <div className="p-3 card shadow">
                                    <div className="d-flex justify-content-between align-items-center mb-2">
                                        <h4 className="fw-bold mb-0 text-black">Your Cart</h4>
                                        <h6 className="mb-0 text-muted">{count} items</h6>
                                    </div>
                                    <hr className="my-4"/>
                                    {
                                        cart[0]?.map((c)=>{
                                            return (
                                            <>
                                                <div className="row mb-4 d-flex justify-content-between align-items-center">
                                                    <div className="col-md-2 col-lg-2 col-xl-2">
                                                        <NavLink to={""}>
                                                            <img src={window.backend+"/api/public/resources?folder=courses&file="+c.image} className="img-fluid rounded-3" alt={c.courseName}/>
                                                        </NavLink>
                                                    </div>
                                                    <div className="col-md-3 col-lg-3 col-xl-3">
                                                    <NavLink to={"/categories/"+c.categoryId}><h6 className="text-muted mt-2">{c.category}</h6></NavLink>
                                                    
                                                    <NavLink to={"/courses/"+c.courseId}><h6 className="text-black mb-0 mt-2">{c.courseName}</h6></NavLink>
                                                    </div>
                                                    <div className="col-md-3 col-lg-3 col-xl-2 d-flex mt-2">
                                                        <FaRegClock className='mt-1 text-primary'/> 
                                                        <h6 className="ml-2">{c.hour}Hr {c.minutes}Min</h6>
                                                    </div>
                                                    <div className="col-md-3 mt-2 col-lg-2 col-xl-2 offset-lg-1">
                                                    <h6 className="mb-0">€ {c.price}</h6>
                                                    </div>
                                                    <div className="col-md-1 mt-2 col-lg-1 col-xl-1 text-end">
                                                    <a className="text-muted">
                                                       <button  onClick={()=>deleteCart(c.id)}>
                                                            <FaTrash className='text-danger'/>
                                                        </button> 
                                                    </a>
                                                    </div>
                                                </div>
                                            </>
                                            )
                                        })
                                    }
                                    

                                    

                                    <hr className="my-4"/>

                                    <div className="pt-2">
                                        <h6 className="mb-0"><NavLink to="/courses" className="text-body"><i
                                            className="fas fa-long-arrow-alt-left me-2"></i>Back to shop</NavLink></h6>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-3 bg-grey mt-2">
                                <div className="py-3 px-4 card shadow">
                                <h4 className="fw-bold mb-2 mt-2 pt-1">Summary</h4>
                                <hr className="my-2"/>

                                <div className="d-flex justify-content-between mb-2">
                                    <p className="text-uppercase">items {count}</p>
                                    <p>€ {total}</p>
                                </div>

                               

                                <hr className="my-2"/>

                                <div className="d-flex justify-content-between mb-2">
                                    <p className="text-uppercase">Total price</p>
                                    <p>€ {total}</p>
                                </div>

                                <button type="button" className="btn btn-dark btn-block btn"
                                    data-mdb-ripple-color="dark">Buy Courses</button>

                                </div>
                            </div>
                            </div>
                        </div>
                        </div>
                    </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Cart