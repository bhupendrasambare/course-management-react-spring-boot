import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { ToastContainer,toast } from 'react-toastify';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import 'react-quill/dist/quill.bubble.css';
import "../CSS/Courses.css"
import { useSearchParams } from 'react-router-dom';
function AddCourse() {

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

    const mentor = useSelector((state) => state.mentorDetails.mentor);
    const navigate = useNavigate();
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
                toast.success('Course Created', {
                    position: "top-right",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                }); 
                navigate(-1)
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

        const queryparams = new URLSearchParams(window.location.search);
        setId(queryparams.get("id"));
        console.log(id)

        if(id != null && id != undefined && name == ""){
            axios({
                method: 'GET',
                url: window.backend+"/api/mentor/get-course-by-id?auth=token "+mentor.token,
                params:{
                    id:id
                },
            }).then((res) => { 
                console.log(res.data.data);
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
                    <div><h5 className='m-3'>Add Course</h5></div>
                    <div className=' ms-auto'><a  onClick={() =>navigate(-1)} ><button className='m-3 btn btn-sm btn-danger'>Cancel</button></a></div>
            </div>
            <div>
                <form className='row' onSubmit={addCategoriesForm}>
                    <div className='col-sm-6 px-4 mt-2'>
                        <label for="course-name">Course Name</label><label id='courseNameWarning' className='d-none ms-2 text-danger fw-bold'>Course Name Exist</label>
                        <input type="text" placeholder="Course Name" value={name} onChange={(e) => {setName(e.target.value);validateName(e.target.value)}} className='form-control mt-2' />
                    </div>      
                    <div className='col-sm-6 px-4 mt-2 row'>
                        <div className='col-sm-8'>
                            <label for="course-image">Course Image</label>
                            <input type="file" className='form-control mt-2' placeholder='Cours Banner' onChange={(e) => {setSelectedFile(e.target.files[0]);setFilePreview(URL.createObjectURL(e.target.files[0]))}}/>
                        </div>
                        <div className='col-sm-4'>
                            {filePreview &&  <img className='shadow m-2' height={100} src={filePreview} /> }
                        </div>
                    </div>      
                    <div className='col-sm-12 p-4 mt-2'>
                        <label for="course-image">Course Description</label>
                        <ReactQuill class="description-box" theme="snow"  modules={modules}
				formats={formats} value={description} onChange={(e) =>{setDescription(e);console.log(description)}} />
                        {/* <textarea onChange={(e) => setDescription(e.target.value)} placeholder='Course Description' className='form-control mt-1'></textarea> */}
                    </div>      
                    <div className='col-sm-6 px-4 mt-2 row'>
                        <div className='col-sm-3'>
                            <label for="course-image">Duration in Hr</label>
                            <input onChange={(e) => setHr(e.target.value)} value={hr} type="number" className='form-control mt-2' placeholder='Hour'/>
                        </div>
                        <div className='col-sm-3'>
                            <label for="course-image">Duration in Min</label>
                            <input onChange={(e) => setMin(e.target.value)} value={min} type="number" className='form-control mt-2' placeholder='Minutes'/>
                        </div>
                        <div className='col-sm-6'>
                            <label for="course-image">Course price in Rs.</label>
                            <input onChange={(e) => setPrice(e.target.value)} type="number" className='form-control mt-2' value={price} placeholder='Course Price in Rs.' step="0.01"/>
                        </div>
                    </div>     
                    <div className='col-sm-6 px-4 mt-2 row'>
                        <div className='col-sm-8'>
                            <label for="course-image">Course Categories</label>
                            <select value={categorie} onChange={(e) => setCategorie(e.target.value)} className='form-control mt-2' placeholder='Cours Banner'>
                                {(categories != null)?categories.map((result) =>
                                    {
                                        console.log(categorie)
                                        return (
                                            <option value={result.id}>{result.name}</option>
                                            )
                                        }):<></>
                                    }
                            </select>
                        </div>
                    </div>
                    <div className='col-sm-6 px-4 mt-3'>
                        <button className='btn-success btn'>Save Course</button>
                    </div>
                </form>
            </div>
        </div>
    </>
  )
}

export default AddCourse