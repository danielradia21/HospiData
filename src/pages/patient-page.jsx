import React, { useState, useEffect } from 'react'
import { Link, NavLink, Route, Switch } from 'react-router-dom'
import logo from '../assets/img/logo.png'
import someImg from '../assets/img/health-section-doctor.png'
import { userService } from '../services/user.service'
import loader from '../assets/img/loader.gif'
import { AppointmentList } from '../cmps/patient/appointment-list'
import { useRouteMatch } from 'react-router-dom'
import { Lab } from '../cmps/patient/lab'
import {  PatientNavBar } from '../cmps/patient/patientNavbar'
import { PatientMainContent } from '../cmps/patient/patientMainContent'



export function PatientPage() {
  //   const [patient, setPatient] = useState({})
  const patient = {
    _id: 'u102',
    fullName: 'Tino Blom',
    username: 'Tinoblom@gmail.com',
    password: '1234Password',
    imgUrl:
      'https://images.unsplash.com/photo-1607746882042-944635dfe10e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
    isAdmin: false,
    type: 'patient',
    appointments: [
      {
        _id: 'a101',
        title: 'Nose Pain',
        description: 'Nose bled twice for no reason',
        date: '1642506255660',
        status: 'cancelled',
        doctor: {
          _id: 'u101',
          fullname: 'Orly Amadi',
          imgUrl: 'https://randomuser.me/api/portraits/women/39.jpg',
        },
      },
      {
        _id: 'a103',
        title: 'Back pain',
        description: 'Back hurts after falling from a bike',
        date: '1642507155660',
        status: 'arrived',
        doctor: {
          _id: 'u101',
          fullname: 'Orly Amadi',
          imgUrl: 'https://randomuser.me/api/portraits/women/39.jpg',
        },
        drugs: ['acamol', 'decsamol'],
        'medical references': [
          {
            _id: 'r-101',
            title: 'Ultrasound',
            date: '1642508955660',
          },
        ],
      },
      {
        _id: 'a104',
        title: 'headache',
        description: 'Head hurts alot, feels like i may faint',
        date: '1642508155660',
        status: 'pending',
        doctor: {
          _id: 'u101',
          fullname: 'Orly Amadi',
          imgUrl: 'https://randomuser.me/api/portraits/women/39.jpg',
        },
      },
    ],
  }
  useEffect(async () => {
    const currUser = await userService.getLoggedinUser()
    // setPatient(currUser)
    // if(currUser.type!=='patient')
  })

  let { path, url } = useRouteMatch()

  return (
    <div className="main-wrapper">
      {/* {!patient && <div><img src={loader}/></div>} */}
      {patient && (
        <div className="main-contents">
          <div className="profile-section">
            <div className="img-wrapper">
              <img src={patient.imgUrl} alt="" />
            </div>

            <div className="name-section">
              <div className="details">
                <p className="title">{patient.fullName}</p>
              </div>
            </div>

            <div className="details-wrapper">
             <PatientNavBar/>
            </div>
          </div>
          <div>
            <div className="main-content-section">
              <PatientMainContent/>
            </div>
            <div className="others-section">
              <div className="first-other"></div>
              <div className="sec-other"></div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
