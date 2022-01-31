import { storageService } from './async-storage.service';
import { userService } from './user.service';

export const doctorService = {
    getDoctors,
    updateDoctor,
};

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
