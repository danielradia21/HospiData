import React from 'react';
import { Link } from 'react-router-dom';

import { PatientTable } from '../patients-table';

export function PatientPage({ user }) {
    const [filteredHistory, setFilteredHistory] = React.useState(null);
    const [modalQuest, setModalQuest] = React.useState('');
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [open, setOpen] = React.useState(false);
    const filterHistory = (ev) => {
        const FilteredList = user.appointments.filter((app) =>
            app.doctor.fullname.toLowerCase().includes(ev.target.value)
        );
        setFilteredHistory((prev) => (prev = FilteredList));
    };
    const toggleModal = (question) => {
        setModalQuest((prev) => (prev = question));
        handleOpen();
    };
    if (!user) return;
    return (
        <>
            <div className="main-content-header">
                <div className="doc-patient-header">
                    {' '}
                    <div>{user.fullname}</div>
                    <Link to={`/doctor/patiences/`} className="sub-btn">
                        Back
                    </Link>
                </div>
            </div>
            <div className="doc-patients-page-container">
                <div className="doc-patient-profile">
                    <div className="doc-patient-details">
                        <div className="img-container">
                            <img src={user.imgUrl} alt="" />
                        </div>
                        <div className="patient-details-info">
                            <p>{user.fullname}</p>
                            <p>age</p>
                            <p>last visited</p>
                        </div>
                    </div>
                    <button className="main-btn">New something</button>
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
                        items={filteredHistory || user.appointments}
                        toggleModal={toggleModal}
                    />
                </div>
            </div>
        </>
    );
}
