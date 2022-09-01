import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { Navigate, useLocation, useNavigate } from 'react-router';

export const Auth = ({children}) => {
    const navigate = useNavigate();

    const location = useLocation();

    const data = useSelector((state) => state.adminDetails);
    const admin = useSelector((state) => state.adminDetails.admin);

    if(data == null || data == undefined || admin == null || admin == undefined){
        return <Navigate to="/admin/login" state={{path:location.pathname}}/>
    }else{
        return(<>{children}</>)
    }



}