// import { storageService } from './async-storage.service';
// import { doctorService } from './doctor.service';
import { httpService } from './http.service';
import { userService } from './user.service';
import { utilService } from './util.service';

// const STORAGE_KEY = 'user';

export const patientService = {
    query,
    getById,
    remove,
    getEmptyPatient,
    update,
    updateSelfPatient,
    getDoctors,
    makeAppointment,
    cancelAppointment,
    getPatientDoctors,
    getAppByAppId,
};

async function query() {
    try {
        const filterBy = { type: 'patient' };
        return await userService.getUsers(filterBy);
        // return users.filter((user) => user.type === 'patient');
    } catch (err) {
        console.log('Had error bringing patients', err);
    }
}

async function getAppByAppId(patId, appId) {
    try {
        const user = await getById(patId);
        return user.appointments.find((app) => app._id === appId);
    } catch (err) {
        console.log(err);
    }
}

async function getById(id) {
    try {
        // let users = await userService.getUsers();
        // return users.find((user) => user._id === id);
        // return users.filter(
        //     (user) => user._id === id && user.type === 'patient'
        // );
        return await userService.getById(id);
    } catch (err) {
        console.log("couldn't find patient", err);
    }
}

async function updateSelfPatient(user) {
    try {
        return await userService.updateLoggedInUser(user);
    } catch (err) {
        console.log(err);
    }
}

async function cancelAppointment(user, appId) {
    try {
        const appIdx = user.appointments.findIndex((app) => app._id === appId);
        if (user.appointments[appIdx].status === 'cancelled') return;
        let doctor = await userService.getById(
            user.appointments[appIdx].doctor._id
        );
        if (user.appointments[appIdx].status === 'approved') {
            const historyIdx = doctor.history.findIndex(
                (oldMeeting) => oldMeeting._id === appId
            );
            doctor.history.splice(historyIdx, 1);
        } else {
            const meetIdx = doctor.meetings.findIndex(
                (meeting) => meeting._id === appId
            );
            doctor.meetings.splice(meetIdx, 1);
        }
        user.appointments[appIdx].status = 'cancelled';
        await userService.update(doctor);
        return await userService.update(user);
        // return await updateSelfPatient(user);
    } catch (err) {
        console.log(err);
    }
}

async function getPatientDoctors(patient) {
    try {
        // let patient = await userService.getLoggedinUser();
        let appointments = patient.appointments.filter(
            (app) => app.status === ('pending' || 'approved')
        );
        let doctors = await getDoctors();
        //  return doctors.filter((doc)=>!appointments.includes(doc._id) )
        return doctors.reduce((acc, doc) => {
            if (!appointments.some((app) => app.doctor._id === doc._id))
                acc.push({ fullname: doc.fullname, _id: doc._id });
            return acc;
            // return !appointments.some(app=>app.doctor._id===doc._id) ? acc.push({ fullname: doc.fullname, _id: doc._id }) : acc
        }, []);
    } catch (err) {
        console.log(err);
    }
}

async function makeAppointment({ doctorId, date, user }) {
    try {
        // let loggedInUser = await userService.getLoggedinUser();

        const randomId = 'a' + utilService.makeId();
        const meeting = {
            _id: randomId,
            status: 'pending',
            patient: {
                _id: user._id,
                UID: user.UID,
                fullname: user.fullname,
                imgUrl: user.imgUrl,
            },
            date: date,
        };
        let doctor = await userService.getById(doctorId);
        doctor.meetings.unshift(meeting);
        await userService.update(doctor);
        // const appointment = getEmptyAppointment()
        // appointment._id = randomId
        // appointment.doctor = {_id:doctor._id,fullname:doctor.fullname,imgUrl:doctor.imgUrl}
        // appointment.date = date
        const miniDoc = {
            _id: doctor._id,
            fullname: doctor.fullname,
            imgUrl: doctor.imgUrl,
        };
        const appointment = makePatientAppointment(randomId, miniDoc, date);
        user.appointments.unshift(appointment);
        await userService.updateLoggedInUser(user);
    } catch (err) {
        console.log(err);
    }
}

async function getDoctors() {
    try {
        // let users = await userService.getUsers();
        // return users.reduce((acc, user) => {
        //     if (user.type === 'doctor')
        //         acc.push({ fullname: user.fullname, _id: user._id });
        //     return acc;
        // }, []);
        let filterBy = { type: 'doctor' };
        return await userService.getUsers(filterBy);
    } catch (err) {
        console.log(err);
    }
}

// async function add(patient) {
//     try {
//         return await storageService.post(STORAGE_KEY, patient);
//     } catch (err) {
//         console.log("couldn't add patient", err);
//     }
// }

async function update(patient) {
    try {
        return await userService.update(patient);
    } catch (err) {
        console.log("couldn't update patient", err);
    }
}

async function remove(id) {
    try {
        return await httpService.delete(`user/${id}`);
    } catch (err) {
        console.log("couldn't remove patient", err);
    }
}

function makePatientAppointment(_id, doctor, date) {
    return {
        _id,
        title: '',
        description: '',
        date,
        status: 'pending',
        doctor,
    };
}

// function getEmptyAppointment() {
//     return {
//         _id: '',
//         title: '',
//         description: '',
//         date: 0,
//         status: 'pending',
//         doctor: {},
//     };
// }

function getEmptyPatient() {
    return {
        fullname: '',
        username: '',
        password: '',
        imgUrl: '',
        UID: '',
        isAdmin: false,
        type: 'patient',
        appointments: [],
        inbox: [],
    };
}
