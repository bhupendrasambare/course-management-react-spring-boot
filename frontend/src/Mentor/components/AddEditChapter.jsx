import { useState } from "react";
import { toast } from "react-toastify";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import 'react-quill/dist/quill.bubble.css';
import "../CSS/Courses.css"
import axios from "axios";
import { useSelector } from "react-redux";
import { useEffect } from "react";
export const AddEditChapter = (props) => {

    const mentor = useSelector((state) => state.mentorDetails.mentor);
    const [chapter,setChapter] = useState(null);
    const [name,setName] = useState("");
    const [description,setDescription] = useState("");
    const modules = {
        toolbar: [
          [{ 'font': [] }],
          [{ 'size': ['small', false, 'large', 'huge'] }],
          ['bold', 'italic', 'underline'],
          [{'list': 'ordered'}, {'list': 'bullet'}],
          [{ 'align': [] }],
          [{ 'color': [] }, { 'background': [] }],
          ['clean']
        ]
    };

    const formats = [
        'font',
        'size',
        'bold', 'italic', 'underline',
        'list', 'bullet',
        'align',
        'color', 'background'
      ];


    const submitForm = () =>{

        if(name == "" || description == ""){
            toast.error('Invalid Filed !', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
        const formData = new FormData();
        formData.append("name",name);
        formData.append("description",description);
        formData.append("id",props.course);
        if(props.chapter != null || props.chapter != ""){
            formData.append("chapter",props.chapter);
        }
        axios({
            url: "http://localhost:8080/api/mentor/add-edit-chapter?auth=token "+mentor.token,
            method:"POST",
            data:formData,
        }).then((res) => { 
            if(res.data){
                toast.success('Chapter Added !', {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
                window.location.reload(false);
                props.close();
            }else{
                toast.success(res.message, {
                    position: "top-right",
                    autoClose: 3000,
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
        props.close();
    }


    useEffect(() =>{
        if(props.chapter != null && chapter == null){
            axios({
                url: "http://localhost:8080/api/mentor/get-chapter-by-id?auth=token "+mentor.token,
                params:{
                    id:props.chapter,
                }
            }).then((res) => { 
                setName(res.data.data.name);
                setDescription(res.data.data.description)
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
                props.close();
            });
        }
    },[])
       

        return (
            <>
            <div className="p-2 w-100">
                <div className="d-flex">
                    <h5 >Edit Chapter</h5>
                    <button className="ms-auto btn-sm btn btn-outline-danger" onClick={props.close}>
                        &times;
                    </button>                  
                </div>
                <hr/>
                <div className="my-2">
                    <div className="row lh-lg">
                        <div className="col-sm-6">
                            <label>Chapter Name
                            <input value={name}  onChange={(e) =>setName(e.target.value)} id="name" type="text" className="form-control" placeholder="Enter Class name"></input></label>
                        </div>
                        <div className="col-sm-6"></div>
                        <div className="col-sm-12 mb-4">
                            <label for="description">Description
                            <ReactQuill value={description} class="description-box w-100" theme="snow"  modules={modules} formats={formats} onChange={(e) =>setDescription(e)} /></label>
                        </div>
                        <div className="col-sm-12 d-flex">
                            <button className="ms-auto me-2 mt-2 btn-sm btn btn-success" onClick={submitForm}>
                                Submit
                            </button>  
                        </div>
                    </div>
                </div>
            </div>
        </>
        )
}