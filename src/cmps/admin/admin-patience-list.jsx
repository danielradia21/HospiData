

import React, { useEffect, useState } from "react";
import { adminService } from "../../services/admin.service";
import Table from "./patience-table"
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import SearchIcon from '@mui/icons-material/Search';
import { patientService } from "../../services/patient.service";
import {Loader} from '../loader'

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
};


export function AdminPatienceList() {

    const [patience,setPatience] = useState(null)
    const [filter,setfilter] = useState(null)
    const [open, setOpen] =React.useState(false);
    const [active, setactive] =React.useState('delate');
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [isAdmin, setisAdmin] = useState(false);
    const [selctPatient,setSelctePatient] = useState({})

    useEffect( () => {
        getPatience();
    }, []);

    const getPatience = async () =>{
        const patience = await adminService.getPatience();
        setPatience(prevPatience => prevPatience = patience)
    }

    const handleSearch = (ev) => {
        const value = ev.target.value
        const filterPatience = patience.filter(patient => patient.fullname.toLocaleLowerCase().includes(value))
        setfilter(prev => prev = filterPatience)
    }

    const update = (patient) =>{
    setactive(prv=>prv ='update')
    handleOpen();
    const {isAdmin} = patient
    setSelctePatient(prev => prev = patient)
    setisAdmin(prev => prev = isAdmin)
}
const remove = (patient) =>{
    setactive(prv=>prv ='delete')
    handleOpen();
    setSelctePatient(prev => prev = patient)
}


const handleChange = (ev) => {
    const filed = ev.target.id
    const value = ev.target.value 
    const checked = ev.target.checked
    setisAdmin(prev => prev = checked)
    setSelctePatient(prev => prev = {...prev,[filed]:value,isAdmin:checked})
}

const sumbit =  async (ev) =>{
    ev.preventDefault()
    await patientService.update(selctPatient)
    await getPatience()
    handleClose()
}

const OnRemovePatient = async () =>{
    await patientService.remove(selctPatient)
    await getPatience()
    handleClose()
}



    if (!patience) return <Loader/>
    return  <>
    <div className="main-content-header">Patience List</div>
    <div className="search-input-continer"> 
    <input className="search-input" type="search" placeholder="Search..." onChange={handleSearch}/>
    <SearchIcon className="search-input-icon"/>
    </div>
    <div className="main-table-continer"><Table items={filter || patience} updateFunc={update} removeFunc={remove} /></div>
       <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                {active === 'update' ? 
                <Box sx={style} className='update'>
                     <div className="modal-header-update">
                    <button onClick={handleClose}>X</button>
                </div>
                <div>
                    <h1>updet Patient</h1>
                    <form className="flex column ">
                    <div className="input-continer">
                    <label>full name:</label>
                    <input id="fullName" type='text'  placeholder="full name" value={selctPatient.fullname} required onChange={handleChange}/>
                    </div>
                    <div className="input-continer">
                    <label>img url:</label>
                    <input id="imgUrl" type='url' placeholder="img url" value={selctPatient.imgUrl} required onChange={handleChange} />
                    </div>
                    <div className="input-continer">
                    <label>is admin:</label>
                    <input id="isAdmin" type='checkbox' checked={isAdmin} placeholder="is Admin" onChange={handleChange} />
                    </div>
                    <button className="sumbit" onClick={sumbit}>submit</button>
                    </form>
                </div>
            </Box>
            
            : <Box sx={style} className='delete'>
            <div>
                <div className="modal-header">
                    <p>Warning!</p>
                    <button onClick={handleClose}>X</button>
                </div>
                <div className=" modal-info-continer flex column justify-center align-center">
                <p>Are you sure want to remove this Doctor?</p>
                <button className="acspet" onClick={OnRemovePatient}>Remove Doctor</button>
                <button onClick={handleClose} className="Cancel">Cancel</button>
                </div>
            </div>
           </Box>
             }
            </Modal>
    </>;
}