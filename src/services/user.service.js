import { storageService } from './async-storage.service';
import { httpService } from './http.service';
import {defaultUsers} from '../assets/data/users.json'
const STORAGE_KEY_LOGGEDIN_USER = 'loggedIn';

export const userService = {
  login,
  logout,
  signup,
  getLoggedinUser,
  getUsers,
  getById,
  update,
};




async function getUsers() {
    try {

      let users =  await storageService.query('user');
      if(!users||users.length) users = JSON.parse(JSON.stringify(defaultUsers))
      return users
    //   return httpService.get(`user`)
    } catch (err) {
      console.log('Had error on userService: GETUSERS', err);
    }
  }
  
  async function getById(userId) {
    try {
      return await storageService.get('user', userId);
      //   return await httpService.get(`user/${userId}`)
    } catch (err) {
      console.log('Had error on userService: GETUSERBYID', err);
    }
  }
  
  async function update(user) {
    try {
        if(!getLoggedinUser().isAdmin) throw Error('Cant update when you are not admin')
      await storageService.put('user', user);
    //   user = await httpService.put(`user/${user._id}`, user)
    return _saveLocalUser(user);
    } catch (err) {
      console.log('Had error on userService: UPDATE', err);
    }
  }
  
  async function login(userCred) {
    try {
      const users = await storageService.query('user');
      const user = users.find((user) => (user.username === userCred.username)&&(user.password===userCred.password));
      if (user) return _saveLocalUser(user)
    //   const user = await httpService.post('auth/login', userCred)
    } catch (err) {
      console.log('Had error on userService: LOGIN', err);
    }
  }
  async function signup(userCred) {
    try {
        // Might need to change up the userCred here 
        const users = await storageService.query('user');
        if(users.find((user) => user.username === userCred.username)) throw Error('Username already taken')
         const user = await storageService.post('user', userCred);
         return _saveLocalUser(user);
      //   const user = await httpService.post('auth/signup', userCred)
    } catch (err) {
      console.log('Had error on userService: SIGNUP', err);
    }
  }
  async function logout() {
    try {
      sessionStorage.removeItem(STORAGE_KEY_LOGGEDIN_USER);
      return getLoggedinUser()
    //   return await httpService.post('auth/logout')
    } catch (err) {
      console.log('Had error on userService: LOGOUT', err);
    }
  }
  
  function _saveLocalUser(user) {
    sessionStorage.setItem(STORAGE_KEY_LOGGEDIN_USER, JSON.stringify(user));
    return user;
  }
  
  function getLoggedinUser() {
    return JSON.parse(
      sessionStorage.getItem(STORAGE_KEY_LOGGEDIN_USER) || 'null'
    );
  }