import {  useSelector } from 'react-redux';
import * as React from 'react';
import Modal from '@mui/material/Modal';
import { MeetingTable } from './meeting-table';
import { Box } from '@mui/material';
import { doctorService } from '../../services/doctor.service';
import { useEffect } from 'react';
import { patientService } from '../../services/patient.service';
import { userService } from '../../services/user.service';

export function Meetings() {
    const { user } = useSelector((state) => state.userModule);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [open, setOpen] = React.useState(false);
    const [modalQuest, setModalQuest] = React.useState('');
    const [filteredMeetings, setFilteredMeetings] = React.useState(null);
    const [meetingId, setMeetingId] = React.useState('');
    const [pendingMeetings, setPendingMeetings] = React.useState([]);

    const toggleModal = (question, id) => {
        setMeetingId((prev) => (prev = id));
        setModalQuest((prev) => (prev = question));
        handleOpen();
    };


    const style = {
        position: 'absolute',
        top: '36%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
    };

    useEffect(() => {
        getPendingMeetings();
    }, [user]);

    

    const filterMeetings = (ev) => {
        const FilteredList = pendingMeetings.filter((meet) =>
            meet.patient.fullname.toLowerCase().includes(ev.target.value)
        );
        setFilteredMeetings((prev) => (prev = FilteredList));
    };

    const getPendingMeetings = () => {
        if (!user.meetings) return;
        const pendings = user.meetings.filter(
            (meet) => meet.status === 'pending'
        );
        setPendingMeetings((prev) => (prev = pendings));
    };
    const switchBtns = () => {
        if (modalQuest === 'Approve')
            return (
                <>
                    <button
                        onClick={() => doneMeeting('approved')}
                        className="accept-btn"
                    >
                        {modalQuest} Meeting
                    </button>
                    <button onClick={handleClose} className="remove-btn">
                        Cancel
                    </button>
                </>
            );
        else {
            return (
                <>
                    <button
                        onClick={() => doneMeeting('cancelled')}
                        className="accept-btn"
                    >
                        {modalQuest} Meeting
                    </button>
                    <button onClick={handleClose} className="remove-btn">
                        Cancel
                    </button>
                </>
            );
        }
    };

    const doneMeeting = async (stat) => {
        handleClose();
        const currMeet = pendingMeetings.find((meet) => meet._id === meetingId);
        currMeet.status = stat;
        const idx = user.meetings.findIndex((meet) => meet._id === meetingId);
        user.meetings[idx].status = stat;
        const exsist = user.patients.some(
            (patient) => patient._id === currMeet.patient._id
        );
        if (!exsist) user.patients.push(currMeet.patient);
        const currPatient = await userService.getByUID(currMeet.patient.UID);
        const currAppIdx = currPatient.appointments.findIndex(
            (app) => app._id === meetingId
        );
        const newPatientApp = currPatient.appointments[currAppIdx];
        newPatientApp.status = stat;
        currPatient.appointments.splice(currAppIdx, 1, newPatientApp);
        await userService.updateLoggedInUser(user);
        const msg = doctorService.getEmptyMail(currMeet._id, user, stat);
        currPatient.inbox.unshift(msg);
        await patientService.update(currPatient);
        getPendingMeetings();
    };

    return (
        <>
            <div className="main-content-header">Your Meetings</div>
            <div className="doc-patients-main-content">
                <input
                    onChange={filterMeetings}
                    className="doc-patient-search"
                    type="text"
                    placeholder="Search Meetings..."
                />
            </div>
            <div className="doc-meeting-main-content">
                <MeetingTable
                    items={filteredMeetings || pendingMeetings}
                    toggleModal={toggleModal}
                />
                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style} className="delete">
                        <div>
                            <div className="modal-header">
                                <p>Warning!</p>
                                <button onClick={handleClose}>X</button>
                            </div>
                            <div className=" modal-info-continer flex column justify-center align-center">
                                <p>
                                    Are you sure want to{' '}
                                    {modalQuest.toLowerCase()} this Meeting?
                                </p>
                                {switchBtns()}
                            </div>
                        </div>
                    </Box>
                </Modal>
            </div>
        </>
    );
}
