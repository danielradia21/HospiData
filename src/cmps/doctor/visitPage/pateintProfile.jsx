import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { userService } from '../../../services/user.service';
import { PatientPage } from './patientPage';
export function PateintProfile() {
    const [user, setUser] = useState(null);

    useEffect(() => {
        getPatinet();
    }, []);
    const getPatinet = async () => {
        let searchParams = new URLSearchParams(window.location.search);
        if (searchParams.has('uid')) {
            let patId = searchParams.get('uid');
            const user = await userService.getByUID(patId);
            console.log('file: pateintProfile.jsx   line 18   user', user);
            setUser((prev) => (prev = user));
        }
    };
    if (!user) return <div>loading...</div>;
    return <PatientPage user={user} />;
}
