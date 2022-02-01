import { storageService } from './async-storage.service';
import { userService } from './user.service';


export const doctorService = {
  updetDoctor,
  removeDoctor
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