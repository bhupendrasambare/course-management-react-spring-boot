import React from 'react'
import {
    FaFacebookF,
    FaGithub,
    FaGoogle,
}from "react-icons/fa";
import { useState } from 'react';
import { ToastContainer,toast } from 'react-toastify';
import { useSelector,useDispatch } from 'react-redux';
import {useNavigate,useLocation, NavLink} from "react-router-dom";
import {userLoginUser} from "../../Redux/Action/UserDataAction";
import axios from 'axios';
import 'react-toastify/dist/ReactToastify.css';

function Login() {

    const dispach = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");

    const redirectPath = location.state?.path || "/user/account";

    function submitform (e){
        e.preventDefault()
        if(email == "" || password == ""){
            toast.error('Please Enter Credentials!', {
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
            url: window.backend+"/api/user/login",
            method: "POST",
            data: {
                "username":email,
                "password":password
            },
        }).then((res) => { 

                var myDate = new Date() // your date object
                myDate.setHours(myDate.getHours() + 24)
                res.data.expirey=myDate;
                dispach(userLoginUser(res.data));
                toast.success('Login Successfully !!', {
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
                    navigate(redirectPath, {replace:true});
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
    <ToastContainer />
        <div className='w-100 d-flex justify-content-center align-items-center'>
            <div className='my-5 rounded-lg card shadow p-3 pb-5 min-width-500 col-md-4'>
                <h5 className='family-normal w-auto fw-500 mx-auto text-center mb-3'>Login</h5>
                <div className='d-flex justify-content-center'>
                    <FaGoogle className='text-danger rounded-pill shadow p-1 fs-10'/>
                    <FaFacebookF className='text-primary rounded-pill shadow p-1 fs-10 mx-5'/>
                    <FaGithub className='text-secoundary rounded-pill shadow p-1 fs-10'/>
                </div>
                <hr/>
                <div className='ml-2'>
                    <form onSubmit={(e) =>submitform(e)}>
                        <div className="mt-2">
                            <label>Username / Email</label>
                            <input id="email" type="text" className="form-control" name="email" placeholder="Email" value={email} onChange={(e)=>setEmail(e.target.value)}/>
                        </div>
                        <div className="mt-2">
                            <label>Password</label>
                            <input id="password" type="password" className="form-control" name="password" placeholder="Password" onChange={(e)=>setPassword(e.target.value)}/>
                        </div>
                        <div className="mt-3 d-flex">
                            <button type='submit' className='btn btn-secondary btn-sm'>Login</button>
                            <NavLink to={"/user/register"} className='btn btn-secondary btn-sm mx-2'>Register</NavLink>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Login