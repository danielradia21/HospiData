import { useEffect } from 'react';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Loader } from '../loader';
import { HistoryAppointmentModal } from './history-appointment-modal';
import { MedicalHistoryTable } from './medical-history-table';

export function MedicalHistory() {
    const { user } = useSelector((state) => state.userModule);
    const [history, setHistory] = useState(null);
    const [filteredHistory, setFilteredHistory] = useState(null);
    const [appointment, setAppointment] = useState(null);
    const [open, setOpen] = useState(false);

    useEffect(() => {
        const history = user.appointments.filter(
            (app) => app.status === 'arrived'
        );
        setHistory((prevHistory) => (prevHistory = history));
    }, [user]);

    const openAppointment = (app) => {
        setAppointment((prev) => (prev = app));
        setOpen((prev) => (prev = true));
    };

    const closeAppointment = () => {
        setAppointment((prev) => (prev = null));
        setOpen((prev) => (prev = false));
    };

    const filterHistory = ({ target }) => {
        const filteredResults = history.filter((res) =>
            res.title.toLowerCase().includes(target.value)
        );
        setFilteredHistory((prev) => (prev = filteredResults));
    };

    return (
        <div className="medical-referrals-content">
            <div className="main-content-header">Mecial History</div>
            {!user && <Loader />}
           {history?.length ? <> <input
                onChange={filterHistory}
                className="patient-search-input"
                type="text"
                placeholder="Search Meetings..."
            />
                <MedicalHistoryTable
                    history={filteredHistory || history}
                    openAppointment={openAppointment}
                />
            </>: <div className='no-items'>No Medical History</div>}
            {appointment && (
                <HistoryAppointmentModal
                    appointment={appointment}
                    closeAppointment={closeAppointment}
                    open={open}
                    user={user}
                />
            )}
        </div>
    );
}
