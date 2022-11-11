import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router';
import { toast, ToastContainer } from 'react-toastify';
import $ from 'jquery'
import { NavLink } from 'react-router-dom';

export default function ManageTopics() {

    const mentor = useSelector((state) => state.mentorDetails.mentor);

    const {id} = useParams()
    const navigate = useNavigate();
    const [chapter,setChapter] = useState(null);
    const [data,setData] = useState(null);

    useEffect(() =>{
        axios({
            url: window.backend+"/api/mentor/get-chapter-by-id?auth=token "+mentor.token,
            params:{
                id:id,
            }
        }).then((res) => { 
            if(res.data.success){
                setChapter(res.data.data);
            }else{
                toast.error('Something Went Wrong!', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            }
        }).catch((err) => {
            toast.error('Something Went Wrong!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            navigate("/mentor/courses");
        });

    },[]);

    useEffect(() =>{
        if(data == null){
            axios(window.backend+'/api/mentor/get-topics?auth=token '+mentor.token+'&id='+id).then((response) =>{
                    setData(response.data.data)
                    setTimeout(function(){
                    $("#data-table").DataTable();
                    });
            });
        }

    });

    const moveup = (data) =>{
        console.log(data)
    }

    const movedown = (data) =>{
        console.log(data)
    }

    const deleteTopic = (data) =>{
        console.log(data)
    }


var count = 0;
    return (
        <>
            <ToastContainer/>
            <div>
                <div className='m-3 card shadow py-2 px-2'>
                    <div className='d-flex w-100'>
                        <div>
                            <h5 className='m-3'>Manage Topics : {(chapter != null)?chapter.name :""}</h5>
                        </div>
                        <div className=' ml-auto'>
                            <NavLink to={"/mentor/course/add-edit-topic/"+id}> 
                                <button className="button btn btn-sm btn-success">
                                    Add Topics 
                                </button>
                            </NavLink>
                            <a onClick={() =>navigate(-1)}>
                                <button className="button m-3 btn btn-sm btn-danger">
                                    Cancel 
                                </button>
                            </a>
                        </div>
                    </div> 
                    <div className='mx-2 mb-3'>
                        <hr/>
                        <div className='table-responsive'>

                            <table id="data-table" className="table thead-dark">
                                <thead className='mt-3'>
                                    <tr>
                                        <th scope="col" className='max-50'>*</th>
                                        <th scope="col">Name</th>
                                        <th scope="col" className='max-150'>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                {(data != null)?data.map((result) =>{
                                    return (
                                        <tr>
                                            <td>{++count}</td>
                                            <td>{result.name}</td>
                                            <td className='max-150'>
                                            <div class="dropdown">
                                                    <button class="btn btn-primary btn-sm dropdown-toggle" type="button" data-toggle="dropdown" aria-expanded="false">
                                                        Actions
                                                    </button>
                                                    <div class="dropdown-menu">

                                                        <a class="dropdown-item moveup"  onClick={() =>moveup(result.id)}><i class="fa fa-angle-up text-primary" aria-hidden="true"></i>&ensp; Move Up</a>
                                                        
                                                        <a class="dropdown-item" onClick={() =>movedown(result.id)}><i class="fa fa-angle-down text-primary" aria-hidden="true" ></i>&ensp; Move Dowm</a>
                                                        
                                                        <a class="dropdown-item"><NavLink to={'/mentor/course/add-edit-topic/'+id+'?topic='+result.id}><i class="fa fa-pencil text-warning" aria-hidden="true"></i>&ensp; Edit</NavLink></a>
                                                        
                                                        <a class="dropdown-item" onClick={() =>deleteTopic(result.id)}><i class="fa fa-ban text-danger" aria-hidden="true" ></i>&ensp; Delete</a>
                                                        
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>
                                    )
                                }):""}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                
            </div>
        </>
    )
}
