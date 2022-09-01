import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import $ from 'jquery'


function Users() {
    const admin = useSelector((state) => state.adminDetails.admin);

    const [data,setDate] = useState(null);

    useEffect(() =>{
        if(data == null){
            axios('http://localhost:8080/api/admin/get-users-by-role?auth=token '+admin.token+'&role=user').then((response) =>{
                setDate(response.data.data);
                setTimeout(function(){
                    $("#data-table").DataTable();
                },100)
            });
        }
    })

  return (
    <>
        <div className='card pt-3 p-3 m-3 border-0 shadow'>
            <div className='container'> 
                <h5 className='mb-3'>Users List</h5>
                <table id="data-table" className="table table-hover">
                    <thead className='mt-3'>
                        <tr>
                            <th>ID</th>
                            <th>Username</th>
                            <th>Name</th>
                            <th>Last</th>
                            <th>Email</th>
                        </tr>
                    </thead>
                    <tbody>
                        {(data != null)?data.map((result) =>{
                            return (
                                <tr>
                                    <td>{result.id}</td>
                                    <td>{result.username}</td>
                                    <td>{result.name}</td>
                                    <td>{result.last}</td>
                                    <td>{result.email}</td>
                                </tr>
                            )
                        }):<tr><td>No Data Found</td></tr>}
                    </tbody>
                </table>
            </div>
        </div>
    </>
  )
}

export default Users