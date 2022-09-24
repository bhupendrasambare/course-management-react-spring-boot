import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { mentorLogoutUser } from '../../Redux/Action/MentorDataAction';

export const Navbar = () => {
    const username = useSelector((state) => state.mentorDetails.mentor.username);
    const dispach = useDispatch();
    const navigate = useNavigate();

    function logout(){
        dispach(mentorLogoutUser());

        navigate("/mentor/login");
    }
  return (
    <>
        <nav className="navbar navbar-light shadow">
            <div className="w-100 container-fluid">

                <a className="navbar-brand ml-auto">
                    <div className="dropdown">
                        <a className="p-2 dropdown-toggle text-dark text-decoration-none" href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-expanded="false">
                        <i className="mx-2 fa fa-user fa-1x"></i>{username}
                        </a>

                        <ul className="dropdown-menu shadow border-0 " aria-labelledby="dropdownMenuLink">
                            <li><a className="dropdown-item" onClick={logout}>Logout</a></li>
                            <li><a className="dropdown-item" href='account'>Account</a></li>
                        </ul>
                    </div>
                </a>
            </div>
        </nav>
    </>
  )
}
