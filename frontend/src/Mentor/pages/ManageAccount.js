import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import { ToastContainer } from 'react-toastify';

export default function ManageAccount() {
    const mentor = useSelector((state) => state.mentorDetails.mentor);
    
    const [username,setUserName] = useState(mentor.username);
    const [email,setEmail] = useState(mentor.email);
    console.log(mentor)


  return (
    <>
        <ToastContainer/>
        <div className='m-3 card shadow py-2 px-2 vh-100-40'>
            <h5 className='ml-3 mt-3 font-normal'> Accoutn Details</h5>
            <form>
                <div className='ml-3 mt-4 min-width-200 width-max-500'>
                    <div className='mb-3'>
                        <label for="username"> First Name</label>
                        <input type="text" id="username" onChange={()=>setUserName(this.target.value)} value={username} className="form-control"/>
                    </div>
                    <div className='mb-3'>
                        <label for="email"> Email</label>
                        <input type="text" id="email" value={email} onChange={()=>setEmail(this.target.value)} className="form-control"/>
                    </div>
                    <div className='mb-3'>
                        <label for="username"> First Name</label>
                        <input type="text" id="username" value={username} className="form-control"/>
                    </div>
                    <div className='mb-3'>
                        <label for="username"> First Name</label>
                        <input type="text" id="username" value={username} className="form-control"/>
                    </div>
                </div>
            </form>
        </div>
    </>
  )
}
