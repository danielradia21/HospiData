import React, { useState, useEffect } from 'react'
// import { Link, NavLink, Route, Switch } from 'react-router-dom'
// import logo from '../assets/img/logo.png'
// import someImg from '../assets/img/health-section-doctor.png'
// import { userService } from '../services/user.service'
// import loader from '../assets/img/loader.gif'
// import { AppointmentList } from '../cmps/patient/appointment-list'
// import { useRouteMatch } from 'react-router-dom'
// import { Lab } from '../cmps/patient/lab'
import { PatientNavBar } from '../cmps/patient/patientNavbar'
import { useDispatch, useSelector } from 'react-redux'
import { getLoggedInUser, onLogout } from '../store/actions/user.actions'
import { PatientMainContent } from '../cmps/patient/patientMainContent'

export function PatientPage() {
  const { user } = useSelector((state) => state.userModule)

  const dispatch = useDispatch()

  useEffect(() => {
    if (!user) dispatch(getLoggedInUser())
  }, [user])

  const onLogOut = () => {
    window.location.href = '/'
    dispatch(onLogout())
  }

  return (
    <div className="main-wrapper">
      {/* {!patient && <div><img src={loader}/></div>} */}
      {user && (
        <div className="main-contents">
          <div className="profile-section">
            <div className="main-profile-container">
              <div className="img-wrapper">
                <img src={user.imgUrl} alt="user-img" />
              </div>

              <div className="name-section">
                <div className="details">
                  <p className="title">{user.fullName}</p>
                </div>
                <div className="logout-btn">
                  <button onClick={onLogOut}>logout</button>
                </div>
              </div>
            </div>

            <div className="details-wrapper">
              <PatientNavBar user={user}/>
              
            </div>
          </div>
          <div>
            <div className="main-content-section">
              <PatientMainContent />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
