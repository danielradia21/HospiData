import { storageService } from './async-storage.service'
import { httpService } from './http.service'
import { userService } from './user.service'
import { utilService } from './util.service'
const STORAGE_KEY = 'user'

export const patientService = {
  query,
  getById,
  add,
  remove,
  getEmptyPatient,
  update,
  updateSelfPatient,
  getDoctors,
  makeAppointment
}

async function query() {
  try {
    let users = await userService.getUsers()
    return users.filter((user) => user.type === 'patient')
  } catch (err) {
    console.log('Had error bringing patients', err)
  }
}

async function getById(id) {
  try {
    let users = await userService.getUsers()
    return users.filter((user) => user._id === id)
    return users.filter((user) => user._id === id && user.type === 'patient')
  } catch (err) {
    console.log("couldn't find patient", err)
  }
}

async function updateSelfPatient(user) {
  try {
    return await userService.updateLoggedInUser(user)
  } catch (err) {
    console.log(err)
  }
}

async function makeAppointment({doctorId,date}){
  try{
      let loggedInUser  = await userService.getLoggedinUser()
      const randomId = 'a' + utilService.makeId()
      const meeting = {
        _id:randomId,
        status:'pending',
        patient:{_id:loggedInUser._id,UID:loggedInUser.UID,fullname:loggedInUser.fullName,imgUrl:loggedInUser.imgUrl},
        date:date
      }
      let doctor = await userService.getById(doctorId)
      doctor.meetings.push(meeting)
      await userService.update(doctor)
      // const appointment = getEmptyAppointment()
      // appointment._id = randomId
      // appointment.doctor = {_id:doctor._id,fullname:doctor.fullName,imgUrl:doctor.imgUrl}
      // appointment.date = date
      const miniDoc = {_id:doctor._id,fullname:doctor.fullName,imgUrl:doctor.imgUrl}
      const appointment = makePatientAppointment(randomId,miniDoc,date)
      loggedInUser.appointments.push(appointment)
     await userService.updateLoggedInUser(loggedInUser)
  }catch(err){
    console.log(err)
  }
}

async function getDoctors() {
  try {
    let users = await userService.getUsers()
    return users.reduce((acc, user) => {
      if (user.type === 'doctor')
        acc.push({ fullname: user.fullName, _id: user._id })
        return acc
    }, [])
  } catch (err) {
    console.log(err)
  }
}

async function add(patient) {
  try {
    return await storageService.post(STORAGE_KEY, patient)
  } catch (err) {
    console.log("couldn't add patient", err)
  }
}

async function update(patient) {
  try {
    return await storageService.put(STORAGE_KEY, patient)
  } catch (err) {
    console.log("couldn't update patient", err)
  }
}

async function remove(id) {
  try {
    return await storageService.remove(STORAGE_KEY, id)
  } catch (err) {
    console.log("couldn't remove patient", err)
  }
}

function makePatientAppointment(_id,doctor,date){
  return {
  _id,
  title: '',
  description: '',
  date,
  status: "pending",
  doctor
  }
}

function getEmptyAppointment(){
 return {
    _id: '',
    title: '',
    description: '',
    date: 0,
    status: "pending",
    doctor: {}
}
}

function getEmptyPatient() {
  return {
    fullName: '',
    username: '',
    password: '',
    imgUrl: '',
    isAdmin: false,
    type: 'patient',
    appointments: [],
  }
}
