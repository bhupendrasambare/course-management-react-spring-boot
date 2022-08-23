import React from 'react'

    function check(val){
        console.log(val.target.value)
    }

function Navbar() {
  return (
    <div>
        <nav className="navbar navbar-expand-lg navbar-light bg-light mx-5">
            <div className="container-fluid">
                <a className="navbar-brand fw-bold heading-font fs-4 m-0" href="">Easy Learning</a>

                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse mx-5" id="navbarSupportedContent">

                            <input className="form-control rounded-pill" onChange={text => check(text)} type="search" placeholder="Search" aria-label="Search" role="button" data-bs-toggle="dropdown" aria-expanded="false"/>
                            <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                {/* <li><a className="dropdown-item" href="">Action</a></li>
                                <li><a className="dropdown-item" href="">Another action</a></li>
                                <li><a className="dropdown-item" href="">Something else here</a></li> */}
                            </ul>
                </div>
                <div className="ms-auto d-flex">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <a className="nav-link active" aria-current="page" href="">Home</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link active" aria-current="page" href="">Home</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link active" aria-current="page" href="">Home</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link active" aria-current="page" href="">Home</a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    </div>
  )
}

export default Navbar