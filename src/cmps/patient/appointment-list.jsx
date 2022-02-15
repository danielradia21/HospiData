import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getLoggedInUser } from '../../store/actions/user.actions';
import { AppointmentTable } from './appointment-table';
import { patientService } from '../../services/patient.service';
import { AppointmentModal } from './appointment-modal';
import { Alert, Snackbar } from '@mui/material';
import { Loader } from '../loader';

export function AppointmentList() {
    const { user } = useSelector((state) => state.userModule);

    const [appointments, setAppointments] = useState([]);
    const [doctors, setDoctors] = useState([]);
    const [filteredApps, setFilteredApps] = useState(null);
    const [openSnackbar, setOpenSnackbar] = useState({
        isOpen: false,
        msg: '',
        sev: 'error',
    });

    const [open, setOpen] = useState(false);
    const [openId, setOpenId] = useState(null);
    const [openNewApp, setOpenNewApp] = useState(false);

    const dispatch = useDispatch();

    useEffect(async () => {
        if (!user) {
            dispatch(getLoggedInUser());
        }
        else if(user) {
          getAppointments();
          await getDoctors();
        }
    }, [user]);

    function getAppointments() {
        const futureAppointments = user.appointments.filter(
            (app) => app.status === 'pending' || app.status === 'approved'
        );
        setAppointments(
            (prevAppointments) => (prevAppointments = futureAppointments)
        );
    }

    async function getDoctors() {
        const doctors = await patientService.getPatientDoctors(user);
        setDoctors((prevDoctors) => (prevDoctors = doctors));
    }

    async function cancelAppointment() {
        try {
            if (!openId) return;
            await patientService.cancelAppointment(user, openId);
            closeCancelModal();
        } catch (err) {
            console.log(err);
        }
    }

    const filterApps = ({ target }) => {
        const filteredApps = appointments.filter((app) =>
            app.doctor.fullname.toLowerCase().includes(target.value)
        );
        setFilteredApps((prev) => (prev = filteredApps));
    };

    function openCancelModal(id) {
        setOpen(() => true);
        setOpenId((prevOpenId) => (prevOpenId = id));
    }

    function closeCancelModal() {
        setOpen(() => false);
        setOpenId((prevOpenId) => (prevOpenId = null));
    }

    function openNewAppModal() {
        setOpenNewApp((prevOpenNewApp) => (prevOpenNewApp = true));
    }

    function closeNewAppModal() {
        setOpenNewApp((prevOpenNewApp) => (prevOpenNewApp = false));
    }

    const makeAppointment = async (doctorId, treatment, date) => {
        try {
            date = date.getTime();
            if (Date.now() + 10 * 60 * 1000 >= date)
                throw new Error('Pick another date');
            await patientService.makeAppointment({ doctorId, date, user });
            handleOpenSnackbar('success', 'Appointment sent for review');
            closeNewAppModal();
        } catch (err) {
            console.log('Pick a diffrent date');
            handleOpenSnackbar('error', 'Pick a diffrent date');
        }
    };

    function handleOpenSnackbar(sev, msg) {
        setOpenSnackbar((prev) => (prev = { sev, msg, isOpen: true }));
    }

    const handleCloseSnackbar = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpenSnackbar(
            (prev) => (prev = { isOpen: false, msg: '', sev: 'error' })
        );
    };

    return (
        <div className="appointments-content">
            <Snackbar
                open={openSnackbar.isOpen}
                autoHideDuration={6000}
                onClose={handleCloseSnackbar}
            >
                <Alert
                    onClose={handleCloseSnackbar}
                    severity={openSnackbar.sev}
                    sx={{ width: '100%' }}
                >
                    {openSnackbar.msg}
                </Alert>
            </Snackbar>
            {!appointments && <Loader />}
                    <div className="main-content-header">Appointments</div>
                    {user.appointments.find(app=>app.status==='pending'||app.status==='approved')?<> <input
                        onChange={filterApps}
                        className="patient-search-input"
                        type="text"
                        placeholder="Search Appointments..."
                    />
                   <AppointmentTable
                        appointments={filteredApps || appointments}
                        openId={openId}
                        open={open}
                        openCancelModal={openCancelModal}
                        closeCancelModal={closeCancelModal}
                        cancelAppointment={cancelAppointment}
                    /></>:<div className='no-items'>No Appointments</div>}
                    <div className="appointments-btn-container">
                        <button
                            className="new-appointment"
                            onClick={openNewAppModal}
                        >
                            Make an appointment
                        </button>
                    </div>
            {openNewApp && (
                <AppointmentModal
                    handleOpenSnackbar={handleOpenSnackbar}
                    openNewApp={openNewApp}
                    closeNewAppModal={closeNewAppModal}
                    makeAppointment={makeAppointment}
                    openNewAppModal={openNewAppModal}
                    doctors={doctors}
                />
            )}
        </div>
    );
}

