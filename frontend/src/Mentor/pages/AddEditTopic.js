import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router';
import { ToastContainer } from 'react-toastify';
import ReactSummernote from "react-summernote";
import "react-summernote/dist/react-summernote.css"; // import styles
import "bootstrap/dist/css/bootstrap.css";

import $ from 'jquery'

export default function AddEditTopic() {

    const mentor = useSelector((state) => state.mentorDetails.mentor);

    const {id} = useParams()
    const navigate = useNavigate();
    const [image,setImage] = useState(null);

    // form parameter
    const [name,setName] = useState("");
    const [description,setDescription] = useState("")

    useEffect(() =>{
        axios({
            url: window.backend+"/api/mentor/get-chapter-by-id?auth=token "+mentor.token,
            params:{
                id:id,
            }
        }).then((res) => { 
            if(!res.data.success){
                navigate(-1);
            }
        }).catch((err) => {
            navigate(-1);
        });

    },[]);

  return (
    <>
        <ToastContainer />
        <div className='m-3 card shadow py-3 px-2'>
            <div className='d-flex w-100'>
                    <div><h5 className='m-3'>{(id)?"Edit Topic":"Add Topic"}</h5></div>
                    <div className=' ml-auto'><a  onClick={() =>navigate(-1)} ><button className='m-3 btn btn-sm btn-danger'>Cancel</button></a></div>
            </div>
            <div>
                <form className='row' >
                    <div className='col-sm-6 px-4 mt-2'>
                        <label for="course-name">Topic Name</label><label id='courseNameWarning' className='d-none ms-2 text-danger fw-bold'>Topic Name Exist</label>
                        <input id="course-name" type="text" placeholder="Topic Name" value={name} onChange={(e) => {setName(e.target.value)}} className='form-control mt-2' />
                    </div>
                    <div className='col-sm-12 p-4 mt-2'>
                        <label>Topic Description</label>
                        <ReactSummernote height={600} options={{
                                theme:"superhero",
                                height: 350,
                                dialogsInBody: true,
                                toolbar: [
                                ["style", ["style"]],
                                ["font", ["bold", "underline", "clear"]],
                                ["fontname", ["fontname"]],
                                ['fontsize', ['fontsize']],
                                ['height', ['height']]
                                ["para", ["ul", "ol", "paragraph"]],
                                ["table", ["table"]],
                                ["insert", ["link", "picture", "video"]],
                                ["view", ["codeview"]]
                                ]}} value={description} onChange={(e) =>{setDescription(e);console.log(e)}} />
                        {/* <textarea onChange={(e) => setDescription(e.target.value)} placeholder='Course Description' className='form-control mt-1'></textarea> */}
                    </div>    
                    <div className='col-sm-6 px-4 mt-3'>
                        <button className='btn-success btn'>{(id)?"Edit Topic":"Save Topic"}</button>
                    </div>
                </form>
            </div>
        </div>
    </>
  )
}
