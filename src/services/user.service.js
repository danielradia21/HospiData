// import { storageService } from './async-storage.service';
// import defaultUsers from '../assets/data/users.json';
// import { socketService } from './socket.service';
import { httpService } from './http.service';

// const STORAGE_KEY = 'user';
// const STORAGE_KEY_LOGGEDIN_USER = 'loggedIn';

const doctorsKeys = ['az89A', 'Wn68s', 'Zk56t', 'b79iB'];

export const userService = {
    login,
    logout,
    signup,
    getLoggedinUser,
    getUsers,
    getById,
    getByUID,
    update,
    updateLoggedInUser,
    Chackey,
    remove,
};

async function remove(id) {
    try {
        return await httpService.delete(`user/${id}`);
    } catch (err) {
        console.log("couldn't remove patient", err);
    }
}

async function Chackey(key) {
    try {
        return doctorsKeys.some((currKey) => key === currKey);
        //   return httpService.get(`user`)
    } catch (err) {
        console.log('Had error on userService: GETUSERS', err);
    }
}

async function getUsers(filterBy = {}) {
    try {
        // let users = await storageService.query('user');
        // if (!users || !users.length)
        //     return await storageService.postMany(STORAGE_KEY, defaultUsers);
        // return users;
        return await httpService.get(`user`, filterBy);

        //   return await httpService.get(`user`,filterBy)
    } catch (err) {
        console.log('Had error on userService: GETUSERS', err);
    }
}

async function getById(userId) {
    try {
        // const filterBy = { by: 'id', content: userId };
        // return await storageService.get(STORAGE_KEY, userId);
        //   return await httpService.get(`user/${userId}`)
        // const user = await httpService.get(`user/${userId}`)
        return await httpService.get(`user/user?type=id&userId=${userId}`);
        // const user = await httpService.get(`user/${'620500f4a144af8a8d6fb719'}`)
    } catch (err) {
        console.log('Had error on userService: GETUSERBYID', err);
    }
}

async function getByUID(UID) {
    try {
        // const filterBy = { by: 'UID', content: UID };
        return await httpService.get(`user/user?type=UID&userId=${UID}`);
        // let users = await storageService.query('user');
        // return users.find((user) => user.UID === UID);
        //   return await httpService.get(`user/${userId}`)
    } catch (err) {
        console.log('Had error on userService: GETUSERBYID', err);
    }
}

async function update(user) {
    try {
        // if (!getLoggedinUser().isAdmin)
        //  throw Error('Cant update when you are not admin')
        // return await storageService.put(STORAGE_KEY, user);
        return await httpService.put(`user/${user._id}`, user);
        // return _saveLocalUser(user);
    } catch (err) {
        console.log('Had error on userService: UPDATE', err);
    }
}

async function login(userCred) {
    try {
        // const users = await getUsers();
        // const user = users.find(
        //     (user) =>
        //         user.username.toLowerCase() ===
        //             userCred.username.toLowerCase() &&
        //         user.password === userCred.password
        // );
        return await httpService.post('auth/login', userCred);
    } catch (err) {
        console.log('Had error on userService: LOGIN', err);
    }
}
async function signup(userCred) {
    try {
        // Might need to change up the userCred here
        // const users = await storageService.query(STORAGE_KEY);
        // if (users.find((user) => user.username === userCred.username || user.UID === userCred.UID))
        //     throw Error('Username already taken');
        // const user = await storageService.post(STORAGE_KEY, userCred);
         await httpService.post('auth/signup', userCred);
        // return _saveLocalUser(user);
    } catch (err) {
        console.log('Had error on userService: SIGNUP', err);
    }
}
async function logout() {
    try {
        // sessionStorage.removeItem(STORAGE_KEY_LOGGEDIN_USER);
        // return getLoggedinUser();
        return await httpService.post('auth/logout');
    } catch (err) {
        console.log('Had error on userService: LOGOUT', err);
    }
}

async function updateLoggedInUser(user) {
    try {
        // sessionStorage.setItem(STORAGE_KEY_LOGGEDIN_USER, JSON.stringify(user));
        return await update(user);
    } catch (err) {
        console.log(err);
    }
}

// function _saveLocalUser(user) {
//     sessionStorage.setItem(STORAGE_KEY_LOGGEDIN_USER, JSON.stringify(user));
//     return user;
// }

// function getLoggedinUser() {
//     return JSON.parse(
//         sessionStorage.getItem(STORAGE_KEY_LOGGEDIN_USER) || null
//     );
// }

async function getLoggedinUser() {
    try {
        return await httpService.get('user/loggedin');
    } catch (err) {
        console.log(err);
    }
}
