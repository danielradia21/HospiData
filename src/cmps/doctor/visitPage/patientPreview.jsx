import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { userService } from '../../../services/user.service';
import { Loader } from '../../loader';

export function PatientPreview({ patient }) {
    const [currDate, setCurrDate] = useState(null);
    useEffect(() => {
        patientLastVisit();
    }, []);

    const patientLastVisit = async () => {
        const currPatient = await userService.getByUID(patient.UID);
        if (!currPatient.appointments.length) {
            setCurrDate((prev) => (prev = 'No recent visits'));
            return;
        }
        const currAppointments = currPatient.appointments.filter(
            (app) => app.status === 'arrived'
        );
        if (!currAppointments.length) {
            setCurrDate((prev) => (prev = 'No recent visits'));
            return;
        }
        const lastMeet = currAppointments[currAppointments.length - 1];
        const date = dateConvertion(lastMeet.date);
        setCurrDate((prev) => (prev = date));
    };

    const dateConvertion = (time) => {
        const newTime = new Date(+time);
        const Year = newTime.getFullYear();
        const Month = newTime.getMonth() + 1;
        const Day = newTime.getDate();
        return `${Day}/${Month}/${Year}`;
    };
    if (!patient || !currDate) return <Loader />;
    return (
        <div className="doc-patient-card">
            <div className="img-container">
                <img src={patient.imgUrl} alt="" />
            </div>
            <div className="patient-details">
                <div className="title">{patient.fullname}</div>
                <div className="last-visit">Last Visit: {currDate}</div>
            </div>
            <Link
                to={`/doctor/patients/patient/?uid=${patient.UID}`}
                className="sub-btn"
            >
                Visit
            </Link>
        </div>
    );
}
