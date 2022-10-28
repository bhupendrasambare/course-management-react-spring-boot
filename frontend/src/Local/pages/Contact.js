import axios from 'axios';
import React from 'react'
import { useState } from 'react';
import {
    FaLinkedin,
    FaPhoneAlt,
    FaRegEnvelope,
}from "react-icons/fa";
import { toast, ToastContainer } from 'react-toastify';

function Contact() {

    const [first,setFirst] = useState("");
    const [last,setLast] = useState("");
    const [email,setEmail] = useState("");
    const [comment,setComment] = useState("");

    const submitForm = () =>{
        var message = "";
        if(comment == ""){
            message ="Comment is Required";
        }
        if(email == ""){
            message ="Email is Required";
        }
        if(last == ""){
            message ="Last Name is Required";
        }
        if(first == ""){
            message ="First Name is Required";
        }
        if(message != ""){
            toast.error(message, {
                theme: "colored",
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            return;
        }

        axios({
            url: window.backend+"/api/public/save-contact",
            method: "POST",
            params: {
                "comment":comment,
                "first":first,
                "last":last,
                "email":email
            },
        }).then((res) => { 
            if(res.data.success){
                toast.success(res.data.message, {
                    theme: "colored",
                    position: "top-right",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            }else{
                toast.error(res.data.message, {
                    theme: "colored",
                    position: "top-right",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            }

            
        })

    }

  return (
    <div className=' py-4 bg-image-space-two'>
        <ToastContainer />    
        <div className="container contact card shadow rounded-lg my-5 bg-transparent">
            <div className="row bg-transparent px-2">
                <div className="col-md-3 contact-side-color rounded bg-image-space-h-auto h-auto">
                    <div className="contact-info py-3 text-light family-normal">
                        <div className='d-flex flex-wrap'>
                            <div>
                                <h2><FaRegEnvelope/></h2>
                                <h2 className='fw-700'>Contact Us</h2>
                                <h4 className='fw-500'>We would love to hear from you !</h4>
                            </div>
                            <div className='w-100 d-flex flex-wrap justify-content-center'>
                                <div className='mt-3'>
                                    <div className='text-center'><FaPhoneAlt className=' circle-box-in-middle'/></div>
                                    <div className='mt-1 fw-700'>+91 9516138020</div>
                                </div>
                                <div className='mt-3 mx-3'>
                                    <div className='text-center'><FaRegEnvelope className=' circle-box-in-middle'/></div>
                                    <div className='mt-1 text-break fw-700'>bhupendrasam1404@gmail.com</div>
                                </div>
                                <div className='mt-3'>
                                <a href="https://www.linkedin.com/in/bhupendrasambare/" target="_blank"><div className='text-center text-light'><FaLinkedin className=' circle-box-in-middle'/></div>
                                    <div className='text-decoration-none text-light mt-1 fw-700'>LinkedIn</div></a>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
                <div className="col-md-9 py-5 rounded-lg bg-transparent-20">
                    <div className="contact-form">
                        <div className="form-group">
                        <label className="control-label col-sm-4 text-light" for="fname">First Name:</label>
                        <div className="col-sm-10">          
                            <input type="text" value={first} onChange={(e)=>setFirst(e.target.value)} className="form-control " placeholder="Enter First Name"/>
                        </div>
                        </div>
                        <div className="form-group">
                        <label className="control-label col-sm-4 text-light" for="lname">Last Name:</label>
                        <div className="col-sm-10">          
                            <input type="text" className="form-control" value={last} onChange={(e)=>setLast(e.target.value)} placeholder="Enter Last Name"/>
                        </div>
                        </div>
                        <div className="form-group">
                        <label className="control-label col-sm-4 text-light" for="email">Email:</label>
                        <div className="col-sm-10">
                            <input type="email" className="form-control" value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="Enter email"/>
                        </div>
                        </div>
                        <div className="form-group">
                        <label className="control-label col-sm-4 text-light" for="comment">Comment:</label>
                        <div className="col-sm-10">
                            <textarea className="form-control" rows="5" id="comment" value={comment} onChange={(e)=>setComment(e.target.value)}></textarea>
                        </div>
                        </div>
                        <div className="form-group">        
                        <div className="col-sm-offset-2 col-sm-10">
                            <button type="submit" onClick={submitForm} className="btn contact-btn">Submit</button>
                        </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </div>
  )
}

export default Contact