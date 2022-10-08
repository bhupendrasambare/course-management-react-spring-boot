import axios from 'axios';
import React from 'react'
import { useState } from 'react';
import {
    FaFacebookF,
    FaGithub,
    FaGoogle,
}from "react-icons/fa";
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';

function Register() {

    const navigate = useNavigate();
    
    const [username,setUsername] = useState("");
    const [name,setName] = useState("");
    const [last,setLast] = useState("");
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");

    function submitform (e){
        e.preventDefault()
        
        // if(email === "" || password === "" || name === "" || username === "" || last === ""){
        //     toast.error('Please Enter Credentials!', {
        //         theme: "colored",
        //         position: "top-right",
        //         autoClose: 2000,
        //         hideProgressBar: false,
        //         closeOnClick: true,
        //         pauseOnHover: true,
        //         draggable: true,
        //         progress: undefined,
        //     });
        //     return;
        // }

        axios({
            url: window.backend+"/api/user/validate-email",
            method: "GET",
            params: {
                "username":username,
                "email":email
            },
        }).then((res) => { 

            if(!res.data.success){
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


        axios({
            url: window.backend+"/api/user/register",
            method: "POST",
            data: {
                "username":username,
                "password":password,
                "name":name,
                "last":last,
                "email":email
            },
        }).then((res) => { 

                var myDate = new Date() // your date object
                myDate.setHours(myDate.getHours() + 24)
                res.data.expirey=myDate;

                //dispach(userLoginUser(res.data));
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
                setTimeout(function (){
                    navigate("/user/login");
                }.bind(this),3000)
            
        })
        .catch((err) => {

            toast.error('Invalid Credentials!', {
                theme: "colored",
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            
        });

    }

  return (
    <div>
    <ToastContainer/>
        <div className='w-100 d-flex justify-content-center align-items-center'>
            <div className='my-5 rounded-lg card shadow p-3 pb-5 mx-2 min-width-500 col-md-4'>
                <h5 className='family-normal fw-500 mx-auto text-center mb-3'>Register</h5>
                <div className='d-flex justify-content-center mb-2'>
                    <FaGoogle className='text-danger rounded-pill shadow-sm p-1 fs-10'/>
                    <FaFacebookF className='text-primary rounded-pill shadow-sm p-1 fs-10 mx-5'/>
                    <FaGithub className='text-secoundary rounded-pill shadow-sm p-1 fs-10'/>
                </div>
                <hr/>
                <div className='ml-2'>
                    <form onSubmit={(e) =>submitform(e)}>
                        <div className="mt-2">
                            <label for={"username"}>Username </label> <spam className="text-danger">*</spam> <small>minimum 3 character required</small>
                            <input id="username" type="text" className="form-control" name="username" placeholder="Username" value={username} onChange={(e)=>setUsername(e.target.value)}/>
                        </div>
                        <div className="mt-2">
                            <label for={"password"}>Password</label> <spam className="text-danger">*</spam> <small>minimum 6 character required</small>
                            <input id="password" type="password" className="form-control" name="password" placeholder="Password" value={password} onChange={(e)=>setPassword(e.target.value)} />
                        </div>
                        <div className="mt-2">
                            <label for={"email"}>Email</label> <spam className="text-danger">*</spam> <small>maximum 50 character</small>
                            <input id="email" type="text" className="form-control" name="email" placeholder="Email" value={email} onChange={(e)=>setEmail(e.target.value)}/>
                        </div>
                        <div className="mt-2">
                            <label for={"name"}>First Name</label> <spam className="text-danger">*</spam> <small>minimum 3 character required</small>
                            <input id="name" type="text" className="form-control" name="name" placeholder="Name" value={name} onChange={(e)=>setName(e.target.value)}/>
                        </div>
                        <div className="mt-2">
                            <label for={"last"}>Last Name</label> <spam className="text-danger">*</spam> <small>minimum 3 character required</small>
                            <input id="last" type="text" className="form-control" name="last" placeholder="Last" value={last} onChange={(e)=>setLast(e.target.value)}/>
                        </div>
                        <div className="mt-3 d-flex">
                            <button type='submit' className='btn btn-secondary btn-sm '>Register</button>
                            <NavLink to={"/user/login"} className='mx-2 btn btn-secondary btn-sm'>Login</NavLink>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Register