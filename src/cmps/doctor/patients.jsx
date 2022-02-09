import testPic from '../../assets/img/p-imgs/p1.jpg';
import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { SignUp } from '../signup';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

export function Patients() {
    const { user } = useSelector((state) => state.userModule);
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [filteredPatients, setFilteredPatients] = React.useState(null);
    const [pagiCountrer, setPagiCountrer] = React.useState(0);
    
    const patientsFilter = (ev) => {
        const patientFilterdList = user.patients.filter((patient) =>
        patient.fullname.toLocaleLowerCase().includes(ev.target.value)
);
        setFilteredPatients((prev) => prev = patientFilterdList);
    };

    const paging = (num) => {
        if (pagiCountrer === 0 && num === -1) return;
        setPagiCountrer((prev) => (prev += num));
        pagination();
    };

    const pagination = () => {
        let count = 6;
        let cards = filteredPatients || user.patients;
        let cardToRender = pagiCountrer * count;
        if (cards.slice(cardToRender, cardToRender + 7).length === 0)
            setPagiCountrer((prev) => (prev = 0));
        return pagiCountrer === 0
            ? cards.slice(cardToRender, cardToRender + 6)
            : cards.slice(cardToRender, cardToRender + 7);
    };

    return (
        <>
            <div className="main-content-header">Your Patients</div>
            <div className='doc-patient-actions-container'>
                <div className="doc-patients-main-content">
                    <input
                        onChange={patientsFilter}
                        className="doc-patient-search search"
                        type="text"
                        placeholder="Serach Patients..."
                    />
                </div>
                <div className="btns-container">
                    <button className="sub-btn" onClick={() => paging(-1)}>
                        Previous
                    </button>
                    <div>{pagiCountrer + 1}</div>
                    <button className="sub-btn" onClick={() => paging(1)}>
                        Next
                    </button>
                </div>
            </div>
            <div className="doc-patient-card-container">
                {pagination().map((patient) => {
                    return (
                        <div className="doc-patient-card">
                            <div className="img-container">
                                <img src={patient.imgUrl} alt="" />
                            </div>
                            <div className="patient-details">
                                <div className="title">{patient.fullname}</div>
                                <div className="age">36 Years Old</div>
                                <div className="last-visit">
                                    Last Visit: 11/12/23
                                </div>
                            </div>
                            <Link
                                to={`/doctor/patiences/patient/?uid=${patient.UID}`}
                                className="sub-btn"
                            >
                                Visit
                            </Link>
                        </div>
                    );
                })}
            </div>

            {/* 
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style} className="check">
                    <SignUp onClose={handleClose} />
                </Box>
            </Modal> */}
        </>
    );
}
