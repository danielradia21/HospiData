import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import logo from '../assets/img/logo.png';
import someImg from '../assets/img/health-section-doctor.png';
export function DoctorPage() {
    return (
        <div className="main-wrapper">
            <div className="main-contents">
                <div className="profile-section">
                    <div className="img-wrapper">
                        <img src={someImg} alt="" />
                    </div>

                    <div className="name-section">
                        <div className="details">
                            <p className="title">Name</p>
                        </div>
                        <div className="details">
                            <p>Job</p>
                        </div>
                    </div>

                    <div className="details-wrapper">
                        <div className="details">
                            <span>icon</span>
                            <p>Name</p>
                        </div>
                        <div className="details">
                            <span>icon</span>
                            <p>Name</p>
                        </div>
                    </div>
                </div>
                <div>
                    <div className="main-content-section">
                        <div className="main-content">
                            <div className="contents">
                                <div className="content">
                                    <div>date</div>
                                    <div>time</div>
                                    <div>name</div>
                                </div>
                                <div className="btns-wrapper">
                                    <button className="main-btn">V</button>
                                    <button className="main-btn red">X</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="others-section">
                        <div className="first-other"></div>
                        <div className="sec-other"></div>
                    </div>
                </div>
            </div>
        </div>
    );
}
