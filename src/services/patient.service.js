import { storageService } from './async-storage.service';
import { httpService } from './http.service';
import { userService } from './user.service';
const STORAGE_KEY = 'user';

export const patientService = {
  query,
  getById,
  add,
  remove,
  getEmptyPatient,
  update
};


async function query(){
    try{
      let users = await userService.getUsers()
      return users.filter(user=>user.type==='patient')
    }catch(err){
        console.log('Had error bringing patients',err)
    }
}

async function getById(id){
  try{
    let users = await userService.getUsers()
    return users.filter(user=>user._id===id)
    return users.filter(user=>user._id===id&&user.type==='patient')
  }catch(err){
    console.log('couldn\'t find patient',err)
  }
}

async function add(patient){
  try{
    return await storageService.post(STORAGE_KEY,patient)
  }catch(err){
    console.log('couldn\'t add patient',err)
  }
}

async function update(patient){
  try{
    return await storageService.put(STORAGE_KEY,patient)
  }catch(err){
    console.log('couldn\'t update patient',err)
  }
}

async function remove(id){
  try{
    return await storageService.remove(STORAGE_KEY,id)
  }catch(err){
    console.log('couldn\'t remove patient',err)
  }
}


 function getEmptyPatient(){
  return {
      fullName: "",
      username: "",
      password: "",
      imgUrl: "",
      isAdmin: false,
      type: "patient",
      appointments: []
  }
}

