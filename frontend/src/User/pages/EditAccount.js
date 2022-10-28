import React from 'react'
import { NavLink } from 'react-router-dom'

function EditAccount() {
  return (
    <div className='mx-2 my-5 card shadow rounded-lg py-5 px-2'>
        <div className="row">
            <div className="col-md-12">
                <div className="profile-head">
                    <ul className="nav nav-tabs" id="myTab" role="tablist">
                        <li className="nav-item">
                            <a className="nav-link active" id="home-tab" data-toggle="tab" href="#home" role="tab" aria-controls="home" aria-selected="true">About</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" id="profile-tab" data-toggle="tab" href="#profile" role="tab" aria-controls="profile" aria-selected="false">Interest</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" id="social-tab" data-toggle="tab" href="#social" role="tab" aria-controls="social" aria-selected="false">Social Media</a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <div className="row">
            <div className="col-md-8">
                <div className="tab-content profile-tab" id="myTabContent">
                    <div className="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                        <div className="row">
                            <div className="col-md-6">
                                <label>User Id</label>
                            </div>
                            <div className="col-md-6">
                                <p>Kshiti123</p>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-6">
                                <label>Name</label>
                            </div>
                            <div className="col-md-6">
                                <p>Kshiti Ghelani</p>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-6">
                                <label>Email</label>
                            </div>
                            <div className="col-md-6">
                                <p>kshitighelani@gmail.com</p>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-6">
                                <label>Phone</label>
                            </div>
                            <div className="col-md-6">
                                <p>123 456 7890</p>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-6">
                                <label>Profession</label>
                            </div>
                            <div className="col-md-6">
                                <p>Web Developer and Designer</p>
                            </div>
                        </div>
                    </div>
                    <div className="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab">
                        <div className="row">
                            <div className="col-md-6">
                                <label>Experience</label>
                            </div>
                            <div className="col-md-6">
                                <p>Expert</p>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-6">
                                <label>Hourly Rate</label>
                            </div>
                            <div className="col-md-6">
                                <p>10$/hr</p>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-6">
                                <label>Total Projects</label>
                            </div>
                            <div className="col-md-6">
                                <p>230</p>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-6">
                                <label>English Level</label>
                            </div>
                            <div className="col-md-6">
                                <p>Expert</p>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-6">
                                <label>Availability</label>
                            </div>
                            <div className="col-md-6">
                                <p>6 months</p>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-12">
                                <label>Your Bio</label><br/>
                                <p>Your detail description</p>
                            </div>
                        </div>
                    </div>
                    <div className="tab-pane fade" id="social" role="tabpanel" aria-labelledby="social-tab">
                        <div className="row">
                            <div className="col-md-6">
                                <label>Experience</label>
                            </div>
                            <div className="col-md-6">
                                <p>Expert</p>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-6">
                                <label>Hourly Rate</label>
                            </div>
                            <div className="col-md-6">
                                <p>10$/hr</p>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-6">
                                <label>Total Projects</label>
                            </div>
                            <div className="col-md-6">
                                <p>230</p>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-6">
                                <label>English Level</label>
                            </div>
                            <div className="col-md-6">
                                <p>Expert</p>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-6">
                                <label>Availability</label>
                            </div>
                            <div className="col-md-6">
                                <p>6 months</p>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-12">
                                <label>Your Bio</label><br/>
                                <p>Your detail description</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default EditAccount