
import Table from "./doctors-table"
import {adminService} from "../../services/admin.service"
import React, { useEffect, useState } from "react";
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { SignIn } from '../../cmps/login';


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

export function AdminDoctorsList() {

  const [doctors,setDoctors] = useState(null)
  const [selcteDcotor,setSelcteDcotor] = useState({
      fullName : '',
      imgUrl : '',
  })
  const [isAdmin, setisAdmin] = useState(false);
  const [open, setOpen] =React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect( () => {
      getDoctors();
   }, []);

  const getDoctors = async () =>{
      const doctors = await adminService.getDoctors();
      setDoctors(prevDoctors => prevDoctors = doctors)
  }

  const update = (doctor) =>{
    handleOpen();
    const {fullName,imgUrl,isAdmin} = doctor
    setSelcteDcotor(prev => prev = {fullName,imgUrl})
    setisAdmin(prev => prev = isAdmin)
}

    const hedle = (ev) => {
        const filed = ev.target.id
        const value = ev.target.value 
        const checked = ev.target.checked
        setisAdmin(prev => prev = checked)
        setSelcteDcotor(prev => prev = {...prev,[filed]:value,isAdmin:checked})
    }


  if (!doctors) return <div>lodinng...</div>
  console.log(selcteDcotor);
  console.log(isAdmin);
    return <>
        <div className="main-content-header">Doctors List</div>
        <input placeholder="serch..."/>
        <Table items={doctors} updateFunc={update}/>
        <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style} className='check'>
                    <div>
                        <h1>updet User</h1>
                        <label>full name</label>
                        <input id="fullName" type='text' placeholder="full name" value={selcteDcotor.fullName} onChange={hedle}/>
                        <label>img url</label>
                        <input id="imgUrl" type='url' placeholder="img url" value={selcteDcotor.imgUrl} onChange={hedle} />
                        <label>is admin</label>
                        <input id="isAdmin" type='checkbox' checked={isAdmin} placeholder="is Admin" onChange={hedle} />
                    </div>
                </Box>
            </Modal>
    </>;
}
