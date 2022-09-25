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
                $("#data-table").DataTable({
                    data: response.data.data,
                    columns: [
                        { data: 'id' },
                        { data: 'username' },
                        { data: 'name' },
                        { data: 'last' },
                        { data: 'email' },
                    ],
                });
            });
        }
    })

  return (
    <>
        <div className='card pt-3 p-3 m-3 border-0 shadow'>
            <div className='m-2'> 
                <h5 className='mb-3'>Users List</h5>
                <div className='table-responsive'>
                    <table id="data-table" className="table ">
                        <thead className='mt-3'>
                            <tr>
                                <th>ID</th>
                                <th>Username</th>
                                <th>Name</th>
                                <th>Last</th>
                                <th>Email</th>
                            </tr>
                        </thead>
                    </table>
                </div>
            </div>
        </div>
    </>
  )
}

export default Users