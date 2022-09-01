import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { ToastContainer,toast } from 'react-toastify';

function AddCourse() {

    const mentor = useSelector((state) => state.mentorDetails.mentor);

    // form parameter
    const [name,setName] = useState("");
    const [description,setDescription] = useState("");
    const [hr,setHr] = useState(0);
    const [min,setMin] = useState(0);
    const [price,setPrice] = useState(0);
    const [categorie,setCategorie] = useState(-1);
    const [selectedFile, setSelectedFile] = useState(null);
    const [filePreview,setFilePreview] = useState(null);
    const [categories,setCategories] = useState([]);

    const addCategoriesForm = (data) =>{
        data.preventDefault();
        const formData = new FormData();
        formData.append("name",name);
        formData.append("description",description);
        formData.append("hr",hr);
        formData.append("min",min);
        formData.append("price",price);
        formData.append("category",categorie);
        formData.append("file",selectedFile);
        console.log("selectedFile",selectedFile)
        axios({
            method: 'POST',
            url: "http://localhost:8080/api/mentor/add-edit-course?auth=token "+mentor.token,
            headers: {
                "Content-Type": "multipart/form-data"
            },
            data:formData,
        }).then((res) => { 
            console.log(res.data)
            // console.log(categories)
            if(res.data.status == "OK"){
                toast.success('Course Created', {
                    position: "top-right",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                }); 
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
                toast.error('Invalid Details!', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
                
            console.log(err.response.data);
        });
    }

    const validateName = (name) =>{
        axios({
            method: 'GET',
            url: "http://localhost:8080/api/mentor/validate-course-name?auth=token "+mentor.token,
            params:{
                name:name
            },
        }).then((res) => { 
            if(res.data.data){
                document.getElementById("courseNameWarning").classList.add("d-none");
            }else{
                document.getElementById("courseNameWarning").classList.remove("d-none");
            }
            // console.log(categories)
        })
    }

    useEffect(() =>{
        axios({
            url: "http://localhost:8080/api/public/get-categories",
        }).then((res) => { 
            setCategories(res.data.data);
            if(res.data.data[0] != null){
                setCategorie(res.data.data[0].id)
            }
            console.log(categories)
            // console.log(categories)
        })
    },[])

  return (
    <>
        <ToastContainer />
        <div className='m-3 card shadow py-3 px-2'>
        <div className='d-flex w-100'>
                <div><h5 className='m-3'>Add Course</h5></div>
                <div className=' ms-auto'><a href='./courses' ><button className='m-3 btn btn-sm btn-danger'>Cancel</button></a></div>
        </div>
        <div>
                <form className='row' onSubmit={addCategoriesForm}>
                    <div className='col-sm-6 px-4 mt-2'>
                        <label for="course-name">Course Name</label><label id='courseNameWarning' className='d-none ms-2 text-danger fw-bold'>Course Name Exist</label>
                        <input type="text" placeholder="Course Name" onChange={(e) => {setName(e.target.value);validateName(e.target.value)}} className='form-control mt-2' />
                    </div>      
                    <div className='col-sm-6 px-4 mt-2 row'>
                        <div className='col-sm-8'>
                            <label for="course-image">Course Image</label>
                            <input type="file" className='form-control mt-2' placeholder='Cours Banner' onChange={(e) => {setSelectedFile(e.target.files[0]);setFilePreview(URL.createObjectURL(e.target.files[0]))}}/>
                        </div>
                        <div className='col-sm-4'>
                            {filePreview &&  <img width={80} height={100} src={filePreview} /> }
                        </div>
                    </div>      
                    <div className='col-sm-12 p-4 mt-2'>
                        <label for="course-image">Course Description</label>
                        <textarea onChange={(e) => setDescription(e.target.value)} placeholder='Course Description' className='form-control mt-1'></textarea>
                    </div>      
                    <div className='col-sm-6 px-4 mt-2 row'>
                        <div className='col-sm-3'>
                            <label for="course-image">Duration in Hr</label>
                            <input onChange={(e) => setHr(e.target.value)} type="number" className='form-control mt-2' placeholder='Hour'/>
                        </div>
                        <div className='col-sm-3'>
                            <label for="course-image">Duration in Min</label>
                            <input onChange={(e) => setMin(e.target.value)} type="number" className='form-control mt-2' placeholder='Minutes'/>
                        </div>
                        <div className='col-sm-6'>
                            <label for="course-image">Course price in Rs.</label>
                            <input onChange={(e) => setPrice(e.target.value)} type="number" className='form-control mt-2' placeholder='Course Price in Rs.' step="0.01"/>
                        </div>
                    </div>     
                    <div className='col-sm-6 px-4 mt-2 row'>
                        <div className='col-sm-8'>
                            <label for="course-image">Course Categories</label>
                            <select onChange={(e) => setCategorie(e.target.value)} className='form-control mt-2' placeholder='Cours Banner'>
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
                        <button className='btn-success btn'>Save Course</button>
                    </div>
                </form>
        </div>
        </div>
    </>
  )
}

export default AddCourse