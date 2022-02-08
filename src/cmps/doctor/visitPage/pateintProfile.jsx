import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { userService } from '../../../services/user.service';
import { PatientPage } from './patientPage';
export function PateintProfile() {
    const { user } = useSelector((state) => state.userModule);
    const [patient, setPatient] = useState(null);
  
 

    useEffect(() => {
        getPatinet();
    }, []);
    const getPatinet = async () => {
        let searchParams = new URLSearchParams(window.location.search);
        if (searchParams.has('uid')) {
            let patId = searchParams.get('uid');
            const currUser = await userService.getByUID(patId);
            setPatient((prev) => (prev = currUser));
        }
    };
    if (!user) return <div>loading...</div>;
    return <PatientPage user={user} patient={patient}/>;
  
}
