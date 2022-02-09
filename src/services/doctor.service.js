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
            fullname: user.fullname,
            imgUrl: user.imgUrl,
        },
        date: Date.now(),
        ...vals,
        referrals,
    };

    patient.appointments.push(patMeeting);
    const docMeeting = {
        _id: patMeeting._id,
        status: 'arrived',
        patient: {
            _id: patient._id,
            UID: patient.UID,
            fullname: patient.fullname,
            imgUrl: patient.imgUrl,
        },
        date: patMeeting.date,
    };

    user.meetings.push(docMeeting);
    patient.inbox.unshift({
        _id: utilService.makeId(),
        appId: patMeeting._id,
        date: Date.now(),
        isOpened: false,
        by: {
            _id: user._id,
            fullname: user.fullname,
            imgUrl: user.imgUrl,
        },
        msg: `Your appointment with me has ended,
         Your's Dr. ${user.fullname}`,
    });
    await patientService.update(patient);
    await userService.updateLoggedInUser(user);
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
        date: Date.now(),
    };
    patient.inbox.unshift({
        _id: utilService.makeId(),
        appId: appointment._id,
        date: Date.now(),
        isOpened: false,
        by: {
            _id: user._id,
            fullname: user.fullname,
            imgUrl: user.imgUrl,
        },
        msg: `Your appointment with me has ended,
         Your's Dr. ${user.fullname}`,
    });

    patient.appointments.splice(idx, 1, appointment);

    await patientService.update(patient);

    const meetIdx = user.meetings.findIndex((meet) => meet._id === appId);
    user.meetings[meetIdx].status = 'arrived';
    user.meetings[meetIdx].date = appointment.date;
    await userService.updateLoggedInUser(user);
}

function getEmptyMail(id, { _id, fullname, imgUrl }, stat) {
    return {
        _id: utilService.makeId(),
        appId: id,
        date: Date.now(),
        isOpened: false,
        by: {
            _id,
            fullname: fullname,
            imgUrl,
        },
        msg: `Your appointment got ${stat}, By doctor ${fullname}`,
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
