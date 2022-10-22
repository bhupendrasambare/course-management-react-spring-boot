import React from 'react'
import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router';

export const Auth = ({children}) => {

    const location = useLocation();

    const data = useSelector((state) => state.userDetails);
    const user = useSelector((state) => state.userDetails.user);

    if(data == null || data == undefined || user == null || user == undefined){
        return <Navigate to="/user/login" state={{path:location.pathname}}/>
    }else{            
        if(new Date(user.expirey) < new Date()){
            return <Navigate to="/user/login" state={{path:location.pathname}}/>
        }
        return(<>{children}</>)
    }



}