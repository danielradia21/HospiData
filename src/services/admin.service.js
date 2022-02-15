// import { storageService } from './async-storage.service';
import { doctorService } from './doctor.service';
import { patientService } from './patient.service';
// import { userService } from './user.service';


export const adminService = {
    getDoctors,
    getPatience
};


 async function getDoctors () {
    try {
        // const users = await userService.getUsers();
        // const doctors = users.filter(user => user.type === 'doctor')
        // return doctors;

        return await doctorService.getDoctors()
    } catch (err) {
        console.log('Had error on userService: GETUSERS', err);
  }
 }

 async function getPatience () {
    try {
        return await patientService.query()
        // const users = await userService.getUsers();
        // const patience = users.filter(user => user.type === 'patient')
        // return patience;
    } catch (err) {
        console.log('Had error on userService: GETUSERS', err);
  }
 }