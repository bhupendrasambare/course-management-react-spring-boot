import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import { userLogoutUser } from '../../Redux/Action/UserDataAction';

function Navbar() {


    const user = useSelector((state) => state.userDetails.user);
    const dispach = useDispatch();
    const navigate = useNavigate();

    function logout(){
        dispach(userLogoutUser());
        toast.warn('Logout Succesful', {
            theme: "colored",
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
        
    }

  return (
    <div>
    <ToastContainer />          
            <nav className="navbar navbar-expand-lg navbar-light bg-transparent shadow">
                
                <NavLink  to="/"><img className="ml-5 navbar-brand" src={process.env.PUBLIC_URL + '/images/nav-img.jpeg'} height={50}/> </NavLink>

                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse mr-5" id="navbarNav">
                    <ul className="navbar-nav ml-auto">

                        <li className="nav-item active">
                            <a className="nav-link"><NavLink className="nav-link" to="/categories">Categories <span className="sr-only">(current)</span></NavLink></a>
                        </li>
                        <li className="nav-item active">
                            <a className="nav-link"><NavLink className="nav-link" to="/courses">Courses <span className="sr-only">(current)</span></NavLink></a>
                        </li>
                        <li className="nav-item active">
                            <a className="nav-link"><NavLink className="nav-link" to="/contact">Contact <span className="sr-only">(current)</span></NavLink></a>
                        </li>
                        {
                            (user != undefined || user != null)?
                            <>
                            {(new Date(user.expirey) < new Date())?
                            <>
                                <li className="nav-item active">
                                    <a className="nav-link">
                                        <NavLink className="nav-link" to="/user/login">Login <span className="sr-only">(current)</span></NavLink>
                                    </a>
                                </li>
                                <li className="nav-item active">
                                    <a className="nav-link">
                                        <NavLink className="nav-link" to="/user/register">Register <span className="sr-only">(current)</span></NavLink>
                                    </a>
                                </li>
                            </>
                            :
                            <div className='d-flex justify-content-start'>
                                <li className="nav-item active">
                                    <a className="nav-link">
                                        <NavLink className="nav-link " to="/user/cart">
                                            <i className="fa fa-shopping-cart fs-5 text-warning  sidebar-icon px-2 py-1 rounded-pill shadow-lg" aria-hidden="true"></i> <span className="sr-only">(current)</span>
                                        </NavLink>
                                    </a>
                                </li>
                                <li className="nav-item active mx-1">
                                    <a className="nav-link">
                                        <NavLink className="nav-link " to="/user/account">
                                            <i className="fa fa-user-circle fs-5 text-primary  sidebar-icon px-2 py-1 rounded-pill shadow-lg" aria-hidden="true"></i> <span className="sr-only">(current)</span>
                                        </NavLink>
                                    </a>
                                </li>
                                <li className="nav-item active">
                                    <a className="nav-link" onClick={logout} >
                                        <div className='nav-link '>
                                            <i className="fa fa-sign-out fs-5 text-dark  sidebar-icon px-2 py-1 rounded-pill shadow-lg" aria-hidden="true"></i> <span className="sr-only">(current)</span>
                                        </div>
                                    </a>
                                </li>
                            </div>
                            }
                            

                            </>:<>

                                <li className="nav-item active">
                                    <a className="nav-link">
                                        <NavLink className="nav-link" to="/user/login">Login <span className="sr-only">(current)</span></NavLink>
                                    </a>
                                </li>
                                <li className="nav-item active">
                                    <a className="nav-link">
                                        <NavLink className="nav-link" to="/user/register">Register <span className="sr-only">(current)</span></NavLink>
                                    </a>
                                </li>

                            </>
                        }


                    </ul>

                </div>
                </nav>
    </div>
  )
}


export default Navbar