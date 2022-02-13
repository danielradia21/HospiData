import testPic from '../../assets/img/p-imgs/p1.jpg';
import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { SignUp } from '../signup';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { userService } from '../../services/user.service';
import { PatientPreview } from './visitPage/patientPreview';

export function Patients() {
    const { user } = useSelector((state) => state.userModule);
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [filteredPatients, setFilteredPatients] = React.useState(null);
    const [pagiCountrer, setPagiCountrer] = React.useState(0);
    const [currFilter, setCurrFilter] = React.useState([]);

    React.useEffect(() => {
        pagination();
    }, [filteredPatients, pagiCountrer]);

    const patientsFilter = (ev) => {
        const patientFilterdList = user.patients.filter((patient) =>
            patient.fullname.toLocaleLowerCase().includes(ev.target.value)
        );
        setFilteredPatients((prev) => (prev = patientFilterdList));
    };

    const paging = (num) => {
        if (pagiCountrer === 0 && num === -1) return;
        setPagiCountrer((prev) => (prev += num));
        pagination();
    };

    const pagination = () => {
        let count = 6;
        let cards = (filteredPatients || user.patients).slice();
        let cardToRender = pagiCountrer * count;
        if (cards.slice(cardToRender, cardToRender + 7).length === 0)
            setPagiCountrer((prev) => (prev = 0));
        pagiCountrer === 0
            ? setCurrFilter(
                  (prev) => (prev = cards.slice(cardToRender, cardToRender + 6))
              )
            : setCurrFilter(
                  (prev) => (prev = cards.slice(cardToRender, cardToRender + 7))
              );
    };

    return (
        <>
            <div className="main-content-header">Your Patients</div>
            <div className="doc-patient-actions-container">
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
                {currFilter.map((patient) => {
                    return <PatientPreview key={patient.UID} patient={patient} />;
                })}
            </div>
        </>
    );
}
