import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router';
import { toast, ToastContainer } from 'react-toastify';
import Popup from 'reactjs-popup';

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
        axios({
            url: window.backend+"/api/mentor/get-topics?auth=token "+mentor.token,
            method:"POST",
            params:{
                id:id,
            }
        }).then((res) => { 
            if(res.data.success){
                setData(res.data.data);
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
        

    });

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
                            <a href={"../add-edit-topic/"+id}> 
                                <button className="button btn btn-sm btn-success">
                                    Add Topics 
                                </button>
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
                        <div className=''> 
                            <table id="data-table" className="table is-striped">
                                <thead className='mt-3'>
                                    <tr>
                                        <th>*</th>
                                        <th>Name</th>
                                        <th>Topics</th>
                                        <th>Media</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                
            </div>
        </>
    )
}
