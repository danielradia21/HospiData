import { storageService } from './async-storage.service';
import { userService } from './user.service';


export const doctorService = {
  updetDoctor,
  removeDoctor,
  getDoctors
};


async function updetDoctor (doctor) {
    try {
        return await storageService.put('user',doctor);
    } catch (err) {
        console.log('Had error on userService: GETUSERS', err);
  }
 }

 async function removeDoctor (doctor) {
    try {
        return await storageService.remove('user',doctor._id);
    } catch (err) {
        console.log('Had error on userService: GETUSERS', err);
  }
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


