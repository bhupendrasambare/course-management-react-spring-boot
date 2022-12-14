import React from 'react';
import { useState } from 'react';
import { ToastContainer,toast } from 'react-toastify';
import { useSelector,useDispatch } from 'react-redux';
import {useNavigate,useLocation} from "react-router-dom";
import {mentorLoginUser} from "../../Redux/Action/MentorDataAction";
import axios from 'axios';

import "../CSS/Login.css";
import 'react-toastify/dist/ReactToastify.css';

function Login() {

    const dispach = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");

    const redirectPath = location.state?.path || "/mentor/dashboard";

    function submitform (e){
        e.preventDefault()
        if(email == "" || password == ""){
            toast.error('Please Enter Credentials!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            return;
        }

        axios({
            url: window.backend+"/api/auth/signin",
            method: "POST",
            // headers: {
            //   authorization: "your token comes here",
            // },
            data: {
                "username":email,
                "password":password
            },
        }).then((res) => { 
            var loginSuccess = false;
            res.data.roles.forEach(function all(e){
                if(e == "MENTOR"){
                    loginSuccess=true;
                }
            })
            if(loginSuccess){
                var myDate = new Date() // your date object
                myDate.setHours(myDate.getHours() + 24)
                res.data.expirey=myDate;
                dispach(mentorLoginUser(res.data));
                toast.success('🦄 Login Success Redirecting!', {
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
            }else{
                    toast.error('Invalid credentials!', {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });
            }
        })
        .catch((err) => {
            if(err.message != null){
                toast.error(err.message, {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            }else{
            if(err.response.data.message =="Bad credentials"){
                toast.error('Invalid credentials!', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            }else{
                toast.error('Internal Server Problem', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            }
        }   
        });
    }
  return (
    <>
    <ToastContainer />
        <div className="container">
            <div className="row">
                <div className="col-md-6 offset-md-3">
                    <div className="card my-5">
                        <div className='  cardbody-color'>

                            <h2 className="text-center text-dark mt-3">Mentor Login</h2>
                            <div className="text-center mb-2 text-dark">Manage Platform</div>

                                <form className="card-body cardbody-color p-lg-5" onSubmit={(e) =>submitform(e)}>

                                    <div className="text-center">
                                    <img src="https://cdn.pixabay.com/photo/2016/03/31/19/56/avatar-1295397__340.png" className="img-fluid profile-image-pic img-thumbnail rounded-circle mb-3 "
                                        width="200px" alt="profile"/>
                                    </div>

                                    <div className="mb-3">
                                    
                                    <input type="text" className="form-control" id="email" placeholder="Mentor Usename" value={email} onChange={(e)=>setEmail(e.target.value)}/>

                                    </div>
                                    <div className="mb-3">
                                    <input type="password" value={password} className="form-control" id="password" placeholder="Password" onChange={(e)=>setPassword(e.target.value)}/>

                                    </div>
                                    <div className="text-center"><button type="submit" className="btn btn-light px-5 mb-5 w-100">Login</button></div>

                                    <div id="emailHelp" className="form-text text-center mb-5 text-dark">Forgot Password ? <a href="#" className="text-dark fw-bold"> Reset Password</a>
                                    </div>

                                </form>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    </>
  )
}

export default Login;