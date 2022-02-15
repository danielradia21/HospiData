import React, { useEffect } from 'react';
import { PatientNavBar } from '../cmps/patient/patientNavbar';
import { useDispatch, useSelector } from 'react-redux';
import {
    getLoggedInUser,
    onLogout,
    updateLoggedInUser,
} from '../store/actions/user.actions';
import { PatientMainContent } from '../cmps/patient/patientMainContent';
import { Loader } from '../cmps/loader';
import {
    socketService,
    SOCKET_EMIT_USER_WATCH,
    SOCKET_EVENT_USER_UPDATED,
} from '../services/socket.service';


export function PatientPage() {
    const { user } = useSelector((state) => state.userModule);

    const dispatch = useDispatch();

    useEffect(() => {
        if (!user) dispatch(getLoggedInUser());
        if (user) {
            socketService.emit(SOCKET_EMIT_USER_WATCH, user._id);

            socketService.on(SOCKET_EVENT_USER_UPDATED, (user) => {
                dispatch(updateLoggedInUser(user));
            });
        }
        return () => {
            socketService.off(SOCKET_EVENT_USER_UPDATED);
        };

    }, [user]);

    const onLogOut = () => {
        window.location.href = '/';
        dispatch(onLogout());
    };

    return (
        <div className="main-wrapper">
            {!user && <Loader />}
            {user && (
                <div className="main-contents">
                    <div className="profile-section">
                        <div className="main-profile-container">
                            <div className="img-wrapper">
                                <img src={user.imgUrl} alt="user-img" />
                            </div>

                            <div className="name-section">
                                <div className="details">
                                    <p className="title">{user.fullname}</p>
                                </div>
                                <div className="logout-btn">
                                    <button onClick={onLogOut}>logout</button>
                                </div>
                            </div>
                        </div>

                        <div className="details-wrapper">
                            <PatientNavBar user={user} />
                        </div>
                    </div>
                   
                        <div className="main-content-section">
                            <PatientMainContent />
                        </div>
                
                </div>
            )}
        </div>
    );
}
