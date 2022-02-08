import { storageService } from './async-storage.service';
import { patientService } from './patient.service';
import { userService } from './user.service';
import { utilService } from './util.service';

export const doctorService = {
    getDoctors,
    updateDoctor,
    getEmptyMail,
    updateMeeting,
    getEmptyMeet,
};

async function getEmptyMeet(user, patient, vals) {
    
    const referrals = {
        title: vals.referrals,
        date: Date.now() + 1000 * 60 * 60 * 24,
        _id: 'r' + utilService.makeId(),
    };
    const patMeeting = {
        _id: 'a' + utilService.makeId(),
        status: 'arrived',
        doctor: {
            _id: user._id,
            UID: user.UID,
            fullname: user.fullName,
            imgUrl: user.imgUrl,
        },
        date: Date.now(),
        ...vals,
        referrals,
    };
    patient.appointments.push(patMeeting);
    await patientService.update(patient);
    delete patMeeting.title;
    delete patMeeting.description;
    delete patMeeting.referrals;
    delete patMeeting.doctor;
    const docMeeting = {
        ...patMeeting,
        patient: {
            _id: patient._id,
            UID: patient.UID,
            fullname: patient.fullName,
            imgUrl: patient.imgUrl,
        },
    };
   

    console.log("file: doctor.service.js   line 46  user.meetings", user.meetings)
    user.meetings.push(docMeeting);
    console.log("file: doctor.service.js   line 48   user.meetings", user.meetings)
    await updateDoctor(user);
}

async function updateMeeting(appId = null, patient, newApp, user) {
    let idx = patient.appointments.findIndex((app) => app._id === appId);
    let referrals = null;
    if (newApp.referrals) {
        referrals = {
            title: newApp.referrals,
            date: Date.now() + 1000 * 60 * 60 * 24,
            _id: 'r' + utilService.makeId(),
        };
    }
    const appointment = {
        ...patient.appointments[idx],
        ...newApp,
        referrals,
        status: 'arrived',
    };

    patient.appointments.splice(idx, 1, appointment);
    await patientService.update(patient);

    const meetIdx = user.meetings.findIndex((meet) => meet._id === appId);
    user.meetings[meetIdx].status = 'arrived';
    await updateDoctor(user);
}

function getEmptyMail(id, { _id, fullName, imgUrl }, stat) {
    return {
        _id: utilService.makeId(),
        appId: id,
        date: Date.now(),
        isOpened: false,
        by: {
            _id,
            fullname: fullName,
            imgUrl,
        },
        msg: `Your appointment got ${stat}, By doctor ${fullName}`,
    };
}

async function getDoctors() {
    try {
        const users = await userService.getUsers();
        const doctors = users.filter((user) => user.type === 'doctor');
        return doctors;
    } catch (err) {
        console.log('cant get doctors', err);
    }
}

async function updateDoctor(user) {
    try {
        return await storageService.put('user', user);
    } catch (err) {
        console.log(err);
    }
}
