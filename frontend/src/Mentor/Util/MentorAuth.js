import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router';

export const Auth = ({children}) => {

    const location = useLocation();

    const data = useSelector((state) => state.mentorDetails);
    const mentor = useSelector((state) => state.mentorDetails.mentor);

        if(data == null || data == undefined || mentor == null || mentor == undefined){
            return <Navigate to="/mentor/login" state={{path:location.pathname}}/>
        }else{
            if(new Date(mentor.expirey) < new Date()){
                return <Navigate to="/mentor/login" state={{path:location.pathname}}/>
            }
            return(<>{children}</>)
        }

}