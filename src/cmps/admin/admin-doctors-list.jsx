import Table from './doctors-table';
import { adminService } from '../../services/admin.service';
import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import SearchIcon from '@mui/icons-material/Search';
import { doctorService } from "../../services/doctor.service";
import {Loader} from '../loader'
import { userService } from '../../services/user.service';

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

export function AdminDoctorsList() {
    const [doctors, setDoctors] = useState(null);
    const [filter, setfilter] = useState(null);
    const [selcteDcotor, setSelcteDcotor] = useState({});
    const [isAdmin, setisAdmin] = useState(false);
    const [open, setOpen] = React.useState(false);
    const [active, setactive] = React.useState('delate');
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    useEffect(() => {
        getDoctors();
    }, []);

    const getDoctors = async () => {
        const doctors = await adminService.getDoctors();
        setDoctors((prevDoctors) => (prevDoctors = doctors));
    };

    const update = (doctor) => {
        setactive((prv) => (prv = 'update'));
        handleOpen();
        setSelcteDcotor((prev) => (prev = doctor));
        setisAdmin((prev) => (prev = isAdmin));
    };



const remove = (doctor) =>{
    setactive(prv=>prv ='delete')
    handleOpen();
    setSelcteDcotor(prev => prev = doctor)
}

    const handleChange = (ev) => {
        const filed = ev.target.id;
        const value = ev.target.value;
        const checked = ev.target.checked;
        setisAdmin((prev) => (prev = checked));
        setSelcteDcotor(
            (prev) => (prev = { ...prev, [filed]: value, isAdmin: checked })
        );
    };

    const handleSearch = (ev) => {
        const value = ev.target.value;
        const filterDoctors = doctors.filter((doctor) =>
            doctor.fullname.toLocaleLowerCase().includes(value)
        );
        setfilter((prev) => (prev = filterDoctors));
    };

    const sumbit = async (ev) => {
        ev.preventDefault();
        await doctorService.updateDoctor(selcteDcotor);
        await getDoctors();
        handleClose();
    };

    const OnRemoveDoctor = async () => {
        await userService.remove(selcteDcotor._id);
        await getDoctors();
        handleClose();
    };


  if (!doctors ) return <Loader/>
    return <>
        <div className="main-content-header">Doctors List</div>
        <div className="search-input-continer"> 
        <input className="search-input" type="search" placeholder="Search..." onChange={handleSearch}/>
        <SearchIcon className="search-input-icon"/>
        </div>
        <div className="main-table-continer"><Table items={filter || doctors} updateFunc={update} removeFunc={remove}/></div>
        <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                {active === 'update' ? (
                    <Box sx={style} className="update">
                        <div className="modal-header-update">
                            <button onClick={handleClose}>X</button>
                        </div>
                        <div>
                            <h1>updet Doctor</h1>
                            <form className="flex column ">
                                <div className="input-continer">
                                    <label>full name:</label>
                                    <input
                                        id="fullName"
                                        type="text"
                                        placeholder="full name"
                                        value={selcteDcotor.fullname}
                                        required
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="input-continer">
                                    <label>img url:</label>
                                    <input
                                        id="imgUrl"
                                        type="url"
                                        placeholder="img url"
                                        value={selcteDcotor.imgUrl}
                                        required
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="input-continer">
                                    <label>is admin:</label>
                                    <input
                                        id="isAdmin"
                                        type="checkbox"
                                        checked={isAdmin}
                                        placeholder="is Admin"
                                        onChange={handleChange}
                                    />
                                </div>
                                <button className="sumbit" onClick={sumbit}>
                                    submit
                                </button>
                            </form>
                        </div>
                    </Box>
                ) : (
                    <Box sx={style} className="delete">
                        <div>
                            <div className="modal-header">
                                <p>Warning!</p>
                                <button onClick={handleClose}>X</button>
                            </div>
                            <div className=" modal-info-continer flex column justify-center align-center">
                                <p>Are you sure want to remove this Doctor?</p>
                                <button
                                    className="acspet"
                                    onClick={OnRemoveDoctor}
                                >
                                    Remove Doctor
                                </button>
                                <button
                                    onClick={handleClose}
                                    className="Cancel"
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </Box>
                )}
            </Modal>
        </>
    
}
