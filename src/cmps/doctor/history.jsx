import { useSelector } from 'react-redux';
import * as React from 'react';
import Modal from '@mui/material/Modal';
import { MeetingTable } from './meeting-table';
import { Box } from '@mui/material';
import { useEffect } from 'react';

export function History() {
    const { user } = useSelector((state) => state.userModule);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [open, setOpen] = React.useState(false);
    const [modalQuest, setModalQuest] = React.useState('');
    const [filteredHistory, setFilteredHistory] = React.useState(null);
    const [history, setHistory] = React.useState([]);
    const toggleModal = (question) => {
        setModalQuest((prev) => (prev = question));
        handleOpen();
    };

    useEffect(() => {
        getHistory();
    }, []);

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

    const getHistory = () => {
        const histor = user.meetings.filter(
            (meet) => meet.status === 'arrived'
        );
        setHistory((prev) => (prev = histor));
    };

    const filterHistory = (ev) => {
        const FilteredList = history.filter((histor) =>
            histor.patient.fullname.toLowerCase().includes(ev.target.value)
        );
        setFilteredHistory((prev) => (prev = FilteredList));
    };
    return (
        <>
            <div className="main-content-header">Your Meetings</div>
            <div className="doc-patients-main-content">
                <input
                    onChange={filterHistory}
                    className="doc-patient-search"
                    type="text"
                    placeholder="Search Meetings..."
                />
            </div>
            <div className="doc-meeting-main-content">
                <MeetingTable
                    isHistory={true}
                    items={filteredHistory || history}
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
                                <button className="accept-btn">
                                    {modalQuest} Meeting
                                </button>
                                <button
                                    onClick={handleClose}
                                    className="remove-btn"
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </Box>
                </Modal>
            </div>
        </>
    );
}
