import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router';
import { toast, ToastContainer } from 'react-toastify';
import ReactSummernote from "react-summernote";
import "react-summernote/dist/react-summernote.css"; // import styles
import "bootstrap/dist/css/bootstrap.css";

import $ from 'jquery'
import { useSearchParams } from 'react-router-dom';

export default function AddEditTopic() {

    const mentor = useSelector((state) => state.mentorDetails.mentor);

    const {id} = useParams()
    const navigate = useNavigate();

    const [searchParams, setSearchParams] = useSearchParams();
    const topicId = searchParams.get("topic")
    // form parameter
    const [name,setName] = useState("");
    const [description,setDescription] = useState("")
    const [chapter,setChapter] = useState(null)

    useEffect(() =>{
        axios({
            url: window.backend+"/api/mentor/get-chapter-by-id?auth=token "+mentor.token,
            params:{
                id:id,
            }
        }).then((res) => { 
            if(!res.data.success){
                navigate(-1);
            }else{
                setChapter(res.data.data)
            }
        }).catch((err) => {
            navigate(-1);
        });

    },[]);

    const submitForm = (data) =>{
        data.preventDefault();
        var formValidationText = "";
        if(description == null || description == ""){
            formValidationText = "Invalid Topic Description";
        }
        if(name == null || name == ""){
            formValidationText = "Invalid Topic Name";
        }

        if(formValidationText != ""){
            toast.error(formValidationText, {
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

        const formData = new FormData();
        formData.append("name",name);
        formData.append("description",description);
        formData.append("id",id);

        if(topicId != null && topicId != ""){
            formData.append("topic",topicId);
        }

        axios({
            url: window.backend+"/api/mentor/add-edit-topic?auth=token "+mentor.token,
            method: 'POST',
            data:formData,
        }).then((res) => { 
            if(res.data.success){
                var massage = "Topic Created";
                if(topicId != null && topicId != null){
                    massage = "Topic Edited";
                }
                toast.success(massage, {
                    position: "top-right",
                    autoClose: 1500,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                }); 
                setTimeout(function(){
                    navigate(-1)
                },2200)
            }else{
                toast.error(res.data.message, {
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
                
        });



    }

    useEffect(() =>{
        if(topicId != null){
            axios({
                url: window.backend+"/api/mentor/get-topic-by-id?auth=token "+mentor.token,
                params:{
                    id:topicId,
                }
            }).then((res) => { 
                if(res.data.success){
                    var TopicData = res.data.data;
                    setName(TopicData.name);
                    setDescription(TopicData.description);
                }else{
                    navigate(-1)
                }
            }).catch((err) => {
                navigate(-1)
            });
        }
    },[])

  return (
    <>
        <ToastContainer />
        <div className='m-3 card shadow py-3 px-2'>
            <div className='d-flex w-100'>
                    <div><h5 className='m-3'>{(topicId)?"Edit Topic":"Add Topic"} : {chapter?.name}</h5></div>
                    <div className=' ml-auto'><a  onClick={() =>navigate(-1)} ><button className='m-3 btn btn-sm btn-danger'>Cancel</button></a></div>
            </div>
            <div>
                <form className='row' onSubmit={submitForm}>
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
                                ["para", ["ul", "ol", "paragraph"]],
                                ["table", ["table"]],
                                ["insert", ["link", "picture", "video"]],
                                ["view", ["codeview"]],
                                ['fontsize', ['fontsize']],
                                ['height', ['height']]
                                ]}} value={description} onChange={(e) =>{setDescription(e)}} />
                        {/* <textarea onChange={(e) => setDescription(e.target.value)} placeholder='Course Description' className='form-control mt-1'></textarea> */}
                    </div>    
                    <div className='col-sm-6 px-4 mt-3'>
                        <button className='btn-success btn'>{(topicId)?"Edit Topic":"Save Topic"}</button>
                    </div>
                </form>
            </div>
        </div>
    </>
  )
}
