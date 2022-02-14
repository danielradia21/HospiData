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
    removeDoctor
};

async function removeDoctor (doctor) {
    try {
        return await storageService.remove('user',doctor._id);
    } catch (err) {
        console.log('Had error on userService: GETUSERS', err);
  }
 }

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

    patient.appointments.unshift(patMeeting);
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

    user.meetings.unshift(docMeeting);
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
    await userService.update(patient);
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
        // const users = await userService.getUsers();
        // const doctors = users.filter((user) => user.type === 'doctor');
        // return doctors;
        let filterBy = { type: 'doctor' };
        return await userService.getUsers(filterBy);
    } catch (err) {
        console.log('cant get doctors', err);
    }
}

async function updateDoctor(user) {
    try {
        return await userService.update(user);
    } catch (err) {
        console.log(err);
    }
}
