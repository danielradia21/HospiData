import { Box, Modal } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';
import { doctorService } from '../../../services/doctor.service';
import { PatientModal } from '../patient/patientModal';
import { PatientTable } from '../patients-table';

export function PatientPage({ patient, user }) {
    const [filteredHistory, setFilteredHistory] = React.useState(null);
    const [modalQuest, setModalQuest] = React.useState('');
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [open, setOpen] = React.useState(false);

    const filterHistory = (ev) => {
        const FilteredList = patient.appointments.filter((app) =>
            app.doctor.fullname.toLowerCase().includes(ev.target.value)
        );
        setFilteredHistory((prev) => (prev = FilteredList));
    };
    const toggleModal = (question) => {
        setModalQuest((prev) => (prev = question));
        handleOpen();
    };

    const makeAppointment = async (values) => {
        const meeting = user.meetings.find(
            (meet) =>
                meet.patient.UID === patient.UID &&
                meet.status === ('approved' || 'pending')
        );

        if (meeting) {
            await doctorService.updateMeeting(
                meeting._id,
                patient,
                values,
                user
            );
        } else {
            await doctorService.getEmptyMeet(user, patient, values);
        }
    };

    if (!patient) return <div>Loading...</div>;
    return (
        <>
            <div className="main-content-header">
                <div className="doc-patient-header">
                    {' '}
<<<<<<< HEAD
                    <div>{patient.fullName}</div>
=======
                    <div>{user.fullname}</div>
>>>>>>> 3cd7e1d813de108d5791b3656f1403d1cc80f79a
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
<<<<<<< HEAD
                            <p>{patient.fullName}</p>
=======
                            <p>{user.fullname}</p>
>>>>>>> 3cd7e1d813de108d5791b3656f1403d1cc80f79a
                            <p>age</p>
                            <p>last visited</p>
                        </div>
                    </div>
                    <button onClick={handleOpen} className="main-btn">
                        New something
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
                        items={filteredHistory || patient.appointments}
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
