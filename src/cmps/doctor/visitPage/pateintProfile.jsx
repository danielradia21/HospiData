import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { doctorService } from '../../../services/doctor.service';
import { userService } from '../../../services/user.service';
import { getLoggedInUser } from '../../../store/actions/user.actions';
import { Loader } from '../../loader';
import { PatientPage } from './patientPage';
export function PateintProfile() {
    const { user } = useSelector((state) => state.userModule);
    const [patient, setPatient] = useState(null);

    const dispatch = useDispatch();

    useEffect(() => {
        getPatinet();
    }, [user]);

    const getPatinet = async () => {
        let searchParams = new URLSearchParams(window.location.search);
        if (searchParams.has('uid')) {
            let patId = searchParams.get('uid');
            const currUser = await userService.getByUID(patId);
            setPatient((prev) => (prev = currUser));
        }
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
        await getPatinet();
        dispatch(getLoggedInUser());
    };

    if (!patient) return <Loader />;

    return (
        <PatientPage
            user={user}
            patient={patient}
            makeAppointment={makeAppointment}
        />
    );
}
