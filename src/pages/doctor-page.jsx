import React, { useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import logo from '../assets/img/logo.png';
import { Switch, Route } from 'react-router';
import { History } from '../cmps/doctor/history';
import { Meetings } from '../cmps/doctor/meetings';
import { Patients } from '../cmps/doctor/patients';
import { useDispatch, useSelector } from 'react-redux';
import { getLoggedInUser, onLogout } from '../store/actions/user.actions';
import { doctorService } from '../services/doctor.service';
import { PateintProfile } from '../cmps/doctor/visitPage/pateintProfile';
import { DocCalendar } from '../cmps/doctor/doc-calendar';
import { socketService,SOCKET_EMIT_USER_WATCH } from '../services/socket.service';

const nestedRoutes = [
    {
        path: '/doctor/meetings',
        component: Meetings,
    },

    {
        path: '/doctor/patiences',
        component: Patients,
    },
    {
        path: '/doctor/patiences/patient',
        component: PateintProfile,
    },
    {
        path: '/doctor/history',
        component: History,
    },
    {
        path: '/doctor/calendar',
        component: DocCalendar,
    },
];

export function DoctorPage() {
    const { user } = useSelector((state) => state.userModule);
    const dispatch = useDispatch();
    useEffect(() => {
        if (!user) dispatch(getLoggedInUser());
        if(user) socketService.emit(SOCKET_EMIT_USER_WATCH,user._id)
    }, [user]);

    const onLogOut = () => {
        window.location.href = '/';
        dispatch(onLogout());
    };

    // const test = async () => {
    //     const doctors = await doctorService.getDoctors();
    // };

    // test();

    if (!user) return <div>w8</div>;
    return (
        <div className="main-wrapper">
            <div className="main-contents">
                <div className="profile-section">
                    <div className="main-profile-container">
                        <div className="img-wrapper">
                            <img
                                src="https://randomuser.me/api/portraits/women/39.jpg"
                                alt=""
                            />
                        </div>

                        <div className="name-section">
                            <div>
                                <div className="details">
                                    <p className="title">{user.fullname}</p>
                                </div>
                                <div className="details">
                                    <p className="sub-title">{user.type}</p>
                                </div>
                            </div>
                            <div className="logout-btn">
                                <button onClick={onLogOut}>logout</button>
                            </div>
                        </div>
                    </div>

                    <div className="details-wrapper">
                        <div className="details">
                            <NavLink to="/doctor/meetings">Meetings</NavLink>
                        </div>
                        <div className="details">
                            <NavLink to="/doctor/patiences">Patiences</NavLink>
                        </div>
                        <div className="details">
                            <NavLink to="/doctor/history">History</NavLink>
                        </div>
                        <div className="details">
                            <NavLink to="/doctor/calendar">Calendar</NavLink>
                        </div>
                    </div>
                </div>
                <div className="main-content-section">
                    <div className="main-content">
                        <Switch>
                            {nestedRoutes.map((nestedRoute) => (
                                <Route
                                    key={nestedRoute.path}
                                    exact
                                    component={nestedRoute.component}
                                    path={nestedRoute.path}
                                />
                            ))}
                        </Switch>
                    </div>
                </div>
            </div>
        </div>
    );
}
