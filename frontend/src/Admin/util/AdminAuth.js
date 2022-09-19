import React from 'react'
import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router';

export const Auth = ({children}) => {

    const location = useLocation();

    const data = useSelector((state) => state.adminDetails);
    const admin = useSelector((state) => state.adminDetails.admin);

    if(data == null || data == undefined || admin == null || admin == undefined){
        return <Navigate to="/admin/login" state={{path:location.pathname}}/>
    }else{            
        if(new Date(admin.expirey) < new Date()){
        return <Navigate to="/admin/login" state={{path:location.pathname}}/>
    }
        return(<>{children}</>)
    }



}