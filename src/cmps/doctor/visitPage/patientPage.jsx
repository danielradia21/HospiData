import { Box, Modal } from '@mui/material';
import React from 'react';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { doctorService } from '../../../services/doctor.service';
import { getLoggedInUser } from '../../../store/actions/user.actions';
import { Loader } from '../../loader';
import { PatientModal } from '../patient/patientModal';
import { PatientTable } from '../patients-table';

export function PatientPage({ patient, user, makeAppointment }) {
    const [filteredHistory, setFilteredHistory] = React.useState(null);
    const [modalQuest, setModalQuest] = React.useState('');
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [open, setOpen] = React.useState(false);
    const [appointmentsList, setAppointmentsList] = React.useState([]);

    const dispatch = useDispatch();

    useEffect(() => {
        appList();
    }, [patient]);

    const filterHistory = (ev) => {
        const FilteredList = appointmentsList.filter((app) =>
            app.doctor.fullname.toLowerCase().includes(ev.target.value)
        );
        setFilteredHistory((prev) => (prev = FilteredList));
    };
    const toggleModal = (question) => {
        setModalQuest((prev) => (prev = question));
        handleOpen();
    };

    const appList = () => {
        const appointments = patient.appointments.filter(
            (app) => app.status === 'arrived'
        );
        setAppointmentsList((prev) => (prev = appointments));
    };

    const patientLastVisit = () => {
        if (!appointmentsList.length) return 'No recent visits';
        const lastMeet = appointmentsList[appointmentsList.length - 1];
        const date = dateConvertion(lastMeet.date);
        return date;
    };
    const dateConvertion = (time) => {
        const newTime = new Date(+time);
        const Year = newTime.getFullYear();
        const Month = newTime.getMonth() + 1;
        const Day = newTime.getDate();
        return `${Day}/${Month}/${Year}`;
    };

    if (!patient) return <Loader />;;

    return (
        <>
            <div className="main-content-header">
                <div className="doc-patient-header">
                    {' '}
                    <div>{patient.fullname}</div>
                    <Link to={`/doctor/patiences/`} className="sub-btn">
                        Back
                    </Link>
                </div>
            </div>
            <div className="doc-patients-page-container">
                <div className="doc-patient-profile">
                    <div className="doc-patient-details">
                        <div className="img-container">
                            <img src={patient.imgUrl} alt="" />
                        </div>
                        <div className="patient-details-info">
                            <p>{patient.fullname}</p>

                            <p>last visited: {patientLastVisit()} </p>
                        </div>
                    </div>
                    <button onClick={handleOpen} className="main-btn">
                        New Treatment
                    </button>
                </div>
                <div className="doc-patients-main-content">
                    <input
                        onChange={filterHistory}
                        className="doc-patient-search search"
                        type="text"
                        placeholder="Serach Meetings..."
                    />
                </div>
                <div className="doc-meeting-main-content">
                    <PatientTable
                        isHistory={true}
                        items={filteredHistory || appointmentsList}
                        toggleModal={toggleModal}
                    />
                </div>
            </div>
            <PatientModal
                makeAppointment={makeAppointment}
                open={open}
                handleClose={handleClose}
            />
        </>
    );
}
