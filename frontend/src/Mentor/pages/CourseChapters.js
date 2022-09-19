import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router'
import { toast, ToastContainer } from 'react-toastify';
import Popup from 'reactjs-popup';
import { AddEditChapter } from '../components/AddEditChapter';
import $ from 'jquery'

import "../CSS/Popup.css"

export default function CourseChapters() {
    const mentor = useSelector((state) => state.mentorDetails.mentor);

    const {id} = useParams()
    const navigate = useNavigate();
    const [course,setCourse] = useState(null);
    const [data,setDate] = useState(null);
        

    useEffect(() =>{
        axios({
            url: window.backend+"/api/mentor/get-course-by-id?auth=token "+mentor.token,
            params:{
                id:id,
            }
        }).then((res) => { 
            if(res.data.success){
                setCourse(res.data.data);
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
        if(data == null){
            axios(window.backend+'/api/mentor/get-chapters?auth=token '+mentor.token+'&id='+id).then((response) =>{
                if(response.data.success){
                    setDate(response.data.data);
                    setTimeout(function(){
                        $("#data-table").DataTable(
                            {
                                "pageLength": 7,
                                bAutoWidth: false, 
                                aoColumns : [
                                { sWidth: '10%' },
                                { sWidth: '50%' },
                                { sWidth: '20%' },
                                { sWidth: '20%' },
                                ]
                            }
                        );
                    },100)
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
                
            });
        }
    },[])
    var count =0;
  return (
    <>
        <ToastContainer/>
        <div>
            <div className='m-3 card shadow py-2 px-2'>
                <div className='d-flex w-100'>
                    <div>
                        <h5 className='m-3'>Manage Chapters : {(course != null)?course.name :""}</h5>
                    </div>
                    <div className=' ms-auto'>
                        <a>
                        <Popup 
                        trigger={
                            <button className="button btn btn-sm btn-success">
                                Add Chapter 
                            </button>} modal>
                            {close => (<AddEditChapter course={id} close={close}/>)}
                        </Popup>
                        </a>
                        <a onClick={() =>navigate(-1)}>
                            <button className="button m-3 btn btn-sm btn-danger">
                                Cancel 
                            </button>
                        </a>
                    </div>
                </div> 
                <div className='mx-2 mb-3'>
                    <hr/>
                    <div className='container'> 
                        <table id="data-table" className="table is-striped">
                            <thead className='mt-3'>
                                <tr>
                                    <th>*</th>
                                    <th>Name</th>
                                    <th>Topics</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {(data != null)?data.map((result) =>{
                                    return (
                                        <tr>
                                            <td>{++count}</td>
                                            <td>{result.name}</td>
                                            <td><a className='text-decoration-none text-primary' href={'../manage-topics/'+result.id}><i class="fa fa-list-alt" aria-hidden="true"></i>&ensp;Manage Topics</a></td>
                                            <td>
                                            <Popup 
                                            trigger={
                                                <button className="btn btn-warning btn-sm me-2 my-1 px-4">
                                                    Edit 
                                                </button>} modal>
                                                {close => (<AddEditChapter chapter={result.id} course={id} close={close}/>)}
                                            </Popup>
                                                <button className='btn btn-danger btn-sm px-4 my-1'>Delete</button>
                                            </td>
                                        </tr>
                                    )
                                }):<tr><td>No Data Found</td></tr>}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            
        </div>
    </>
  )
}
