import React, { useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import logo from '../assets/img/logo.png';
import { Switch, Route } from 'react-router';
import { History } from '../cmps/doctor/history';
import { Meetings } from '../cmps/doctor/meetings';
import { Patients } from '../cmps/doctor/patients';
import { useDispatch, useSelector } from 'react-redux';
import { getLoggedInUser, onLogout } from '../store/actions/user.actions';

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
        path: '/doctor/history',
        component: History,
    },
];

export function DoctorPage() {
    const { user } = useSelector((state) => state.userModule);

    const dispatch = useDispatch();

    useEffect(() => {
        if (!user) dispatch(getLoggedInUser());
    }, [user]);

    const onLogOut = () => {
        window.location.href = '/';
        dispatch(onLogout());
    };

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
                                    <p className="title">Orly Amadi</p>
                                </div>
                                <div className="details">
                                    <p className="sub-title">Doctor</p>
                                </div>
                            </div>
                            <div className="logout-btn">
                                <button onClick={onLogOut}>logout</button>
                            </div>
                        </div>
                    </div>

                    <div className="details-wrapper">
                        <div className="details">
<<<<<<< HEAD
                            <NavLink to="/doctor/meetings">Meetings</NavLink>
                        </div>
                        <div className="details">
                            <NavLink to="/doctor/patiences">Patiences</NavLink>
=======
                            <NavLink to="/doctor/meetings">
                                Meetings
                            </NavLink>
                        </div>
                        <div className="details">
                            <NavLink to="/doctor/patiences">
                                Patiences
                            </NavLink>
>>>>>>> 8453f2116d08eb8dcefd10bbe55b88976ee83b76
                        </div>
                        <div className="details">
                            <NavLink to="/doctor/history">History</NavLink>
                        </div>
                    </div>
                </div>
                <div className="main-content-section">
                    <div className="main-content">
                        <div className="contents">
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
        </div>
    );
}