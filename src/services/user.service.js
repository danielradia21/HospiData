import { storageService } from './async-storage.service';
import { httpService } from './http.service';
import defaultUsers from '../assets/data/users.json';
const STORAGE_KEY_LOGGEDIN_USER = 'loggedIn';
const STORAGE_KEY = 'user';
const doctorsKeys = ['az89A','Wn68s','Zk56t','b79iB']

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
    Chackey
};

async function Chackey(key) {
    try {
     return doctorsKeys.some(currKey=> key === currKey );
        //   return httpService.get(`user`)
    } catch (err) {
        console.log('Had error on userService: GETUSERS', err);
    }
}


async function getUsers() {
    try {
        let users = await storageService.query('user');
        if (!users || !users.length)
            return await storageService.postMany(STORAGE_KEY, defaultUsers);
        return users;
        //   return httpService.get(`user`)
    } catch (err) {
        console.log('Had error on userService: GETUSERS', err);
    }
}

async function getById(userId) {
    try {
        return await storageService.get(STORAGE_KEY, userId);
        //   return await httpService.get(`user/${userId}`)
    } catch (err) {
        console.log('Had error on userService: GETUSERBYID', err);
    }
}

async function getByUID(UID) {
    try {
        let users = await storageService.query('user');
        return users.find((user) => user.UID === UID);
        //   return await httpService.get(`user/${userId}`)
    } catch (err) {
        console.log('Had error on userService: GETUSERBYID', err);
    }
}

async function update(user) {
    try {
        // if (!getLoggedinUser().isAdmin)
        //  throw Error('Cant update when you are not admin')
        return await storageService.put(STORAGE_KEY, user);
        //   user = await httpService.put(`user/${user._id}`, user)
        // return _saveLocalUser(user);
    } catch (err) {
        console.log('Had error on userService: UPDATE', err);
    }
}

async function login(userCred) {
    try {
        const users = await getUsers();
        const user = users.find(
            (user) =>
                user.username.toLowerCase() ===
                    userCred.username.toLowerCase() &&
                user.password === userCred.password
        );
        if (user) return _saveLocalUser(user);
        //   const user = await httpService.post('auth/login', userCred)
    } catch (err) {
        console.log('Had error on userService: LOGIN', err);
    }
}
async function signup(userCred) {
    try {
        // Might need to change up the userCred here
        const users = await storageService.query(STORAGE_KEY);
        if (users.find((user) => user.username === userCred.username || user.UID === userCred.UID))
            throw Error('Username already taken');
        const user = await storageService.post(STORAGE_KEY, userCred);
        return _saveLocalUser(user);
        //   const user = await httpService.post('auth/signup', userCred)
    } catch (err) {
        console.log('Had error on userService: SIGNUP', err);
    }
}
async function logout() {
    try {
        sessionStorage.removeItem(STORAGE_KEY_LOGGEDIN_USER);
        return getLoggedinUser();
        //   return await httpService.post('auth/logout')
    } catch (err) {
        console.log('Had error on userService: LOGOUT', err);
    }
}

async function updateLoggedInUser(user) {
    try {
        sessionStorage.setItem(STORAGE_KEY_LOGGEDIN_USER, JSON.stringify(user));
        await update(user);
        return user;
    } catch (err) {
        console.log(err);
    }
}

function _saveLocalUser(user) {
    sessionStorage.setItem(STORAGE_KEY_LOGGEDIN_USER, JSON.stringify(user));
    return user;
}

function getLoggedinUser() {
    return JSON.parse(
        sessionStorage.getItem(STORAGE_KEY_LOGGEDIN_USER) || null
    );
}
