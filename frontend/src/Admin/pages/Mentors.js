import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import $ from 'jquery'


function Mentors() {
    const admin = useSelector((state) => state.adminDetails.admin);

    const [data,setDate] = useState(null);

    useEffect(() =>{
        if(data == null){
            axios('http://localhost:8080/api/admin/get-users-by-role?auth=token '+admin.token+'&role=mentor').then((response) =>{
                    $("#data-table").DataTable({
                        data: response.data.data,
                        columns: [
                            { data: 'id' },
                            { data: 'username' },
                            { data: 'name' },
                            { data: 'last' },
                            { render:function(row){
                                return (
                                    <>
                                    
                                    </>
                                )
                            } },
                        ],
                    });
            });
        }
    })

  return (
    <>
        <div className='card pt-3 p-3 m-3 border-0 shadow'>
            <div className='m-2'> 
                <h5 className='mb-3'>Mentors List</h5>
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
                    
                </table>
            </div>
        </div>
    </>
  )
}

export default Mentors