import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { ToastContainer,toast } from 'react-toastify';
import ReactSummernote from "react-summernote";
import "react-summernote/dist/react-summernote.css"; // import styles
import "bootstrap/dist/css/bootstrap.css";
import "../CSS/Courses.css"
import { useSearchParams } from 'react-router-dom';

function AddEditCourse() {

    const mentor = useSelector((state) => state.mentorDetails.mentor);
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();
    // form parameter
    const [id,setId] = useState();
    const [staticName,setStaticName] = useState("");
    const [name,setName] = useState("");
    const [description,setDescription] = useState("");
    const [hr,setHr] = useState(0);
    const [min,setMin] = useState(0);
    const [price,setPrice] = useState(0);
    const [categorie,setCategorie] = useState(-1);
    const [selectedFile, setSelectedFile] = useState(null);
    const [filePreview,setFilePreview] = useState(null);
    const [categories,setCategories] = useState([]);
    const [checkName,setCheckName] = useState(false); 

    const addCategoriesForm = (data) =>{
        data.preventDefault();
        var formValidationText = "";
        if(categorie == null || categorie == ""){
            formValidationText = "Invalid Course Category";
        }
        if(price == null || price == ""){
            formValidationText = "Invalid Course Price";
        }
        if(hr+min == 0){
            formValidationText = "Invalid Course Duration";
        }
        if(min == null || min == ""){
            formValidationText = "Invalid Course Minutes";
        }
        if(hr == null || hr == ""){
            formValidationText = "Invalid Course Hour";
        }
        if(description == null || description == ""){
            formValidationText = "Invalid Course Discription";
        }
        if(id == null || id == undefined){
            if(selectedFile == null){
                formValidationText = "Invalid Course Image";
            }
        }
        if(name == null || name == "" || checkName){
            formValidationText = "Invalid Course Name";
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
        formData.append("hr",hr);
        formData.append("min",min);
        formData.append("price",price);
        formData.append("category",categorie);
        if(id != null && id != undefined){
            formData.append("id",id);
        }
        formData.append("file",selectedFile);
        axios({
            method: 'POST',
            url: window.backend+"/api/mentor/add-edit-course?auth=token "+mentor.token,
            headers: {
                "Content-Type": "multipart/form-data"
            },
            data:formData,
        }).then((res) => { 
            if(res.data.success){
                var massage = "Course Created";
                if(id != null && id != null){
                    massage = "Course Edited";
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

    const validateName = (name) =>{
        if(id != null || id != undefined){
            if(staticName == name){
                return;
            }
        }
        axios({
            method: 'GET',
            url: window.backend+"/api/mentor/validate-course-name?auth=token "+mentor.token,
            params:{
                name:name
            },
        }).then((res) => { 
            if(res.data.data){
                document.getElementById("courseNameWarning").classList.add("d-none");
                setCheckName(false);
            }else{
                document.getElementById("courseNameWarning").classList.remove("d-none");
                setCheckName(true);
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
        axios({
            url: window.backend+"/api/public/get-categories",
        }).then((res) => { 
            setCategories(res.data.data);
            if(res.data.data[0] != null){
                setCategorie(res.data.data[0].id)
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

    },[])

    useEffect(() =>{

        setId(searchParams.get("id"));

        if(id != null && id != undefined && name == ""){
            axios({
                method: 'GET',
                url: window.backend+"/api/mentor/get-course-by-id?auth=token "+mentor.token,
                params:{
                    id:id
                },
            }).then((res) => { 
                var coursedata = res.data.data;
                setStaticName(coursedata.name);
                setName(coursedata.name);
                setDescription(coursedata.description);
                setHr(coursedata.hour);
                setMin(coursedata.minutes);
                setPrice(coursedata.price);
                http://localhost:8080/api/public/resources?folder=courses&file=4455152download.png
                setFilePreview(window.backend+"/api/public/resources?folder=courses&file="+coursedata.image)
            }).catch((err)=>{
                navigate(-1);
            })
        }
    })

  return (
    <>
        <ToastContainer />
        <div className='m-3 card shadow py-3 px-2'>
            <div className='d-flex w-100'>
                    <div><h5 className='m-3'>{(id)?"Edit Course":"Add Course"}</h5></div>
                    <div className=' ml-auto'><a  onClick={() =>navigate(-1)} ><button className='m-3 btn btn-sm btn-danger'>Cancel</button></a></div>
            </div>
            <div>
                <form className='row' onSubmit={addCategoriesForm}>
                    <div className='col-sm-6 px-4 mt-2'>
                        <label for="course-name">Course Name</label><label id='courseNameWarning' className='d-none ms-2 text-danger fw-bold'>Course Name Exist</label>
                        <input id="course-name" type="text" placeholder="Course Name" value={name} onChange={(e) => {setName(e.target.value);validateName(e.target.value)}} className='form-control mt-2' />
                    </div>      
                    <div className='col-sm-6 px-4 mt-2 row'>
                        <div className='col-sm-8'>
                            <label for="course-image">Course Image</label>
                            <input id="course-image" type="file" className='form-control mt-2' placeholder='Cours Banner' onChange={(e) => {setSelectedFile(e.target.files[0]);setFilePreview(URL.createObjectURL(e.target.files[0]))}}/>
                        </div>
                        <div className='col-sm-4'>
                            {filePreview &&  <img className='shadow m-2' height={100} src={filePreview} /> }
                        </div>
                    </div>      
                    <div className='col-sm-12 p-4 mt-2'>
                        <label>Course Description</label>
                        <ReactSummernote height={600} options={{
                                height: 350,
                                dialogsInBody: true,
                                toolbar: [
                                ["style", ["style"]],
                                ["font", ["bold", "underline", "clear"]],
                                ["fontname", ["fontname"]],
                                ["para", ["ul", "ol", "paragraph"]],
                                ["table", ["table"]],
                                ["insert", ["link", "picture", "video"]],
                                ["view", ["codeview"]]
                                ]}} value={description} onChange={(e) =>{setDescription(e)}} />
                        {/* <textarea onChange={(e) => setDescription(e.target.value)} placeholder='Course Description' className='form-control mt-1'></textarea> */}
                    </div>      
                    <div className='col-sm-6 px-4 mt-2 row'>
                        <div className='col-sm-3'>
                            <label for="course-hr">Duration in Hr</label>
                            <input id="course-hr" onChange={(e) => setHr(e.target.value)} value={hr} type="number" className='form-control mt-2' placeholder='Hour'/>
                        </div>
                        <div className='col-sm-3'>
                            <label for="course-min">Duration in Min</label>
                            <input id="course-min" onChange={(e) => setMin(e.target.value)} value={min} type="number" className='form-control mt-2' placeholder='Minutes'/>
                        </div>
                        <div className='col-sm-6'>
                            <label for="course-rs">Course price in Rs.</label>
                            <input id="course-rs" onChange={(e) => setPrice(e.target.value)} type="number" className='form-control mt-2' value={price} placeholder='Course Price in Rs.' step="0.01"/>
                        </div>
                    </div>     
                    <div className='col-sm-6 px-4 mt-2 row'>
                        <div className='col-sm-8'>
                            <label for="course-categories">Course Categories</label>
                            <select id="course-categories" value={categorie} onChange={(e) => setCategorie(e.target.value)} className='form-control mt-2' placeholder='Cours Banner'>
                                {(categories != null)?categories.map((result) =>
                                    {
                                        return (
                                            <option value={result.id}>{result.name}</option>
                                            )
                                        }):<></>
                                    }
                            </select>
                        </div>
                    </div>
                    <div className='col-sm-6 px-4 mt-3'>
                        <button className='btn-success btn'>{(id)?"Edit Course":"Save Course"}</button>
                    </div>
                </form>
            </div>
        </div>
    </>
  )
}

export default AddEditCourse