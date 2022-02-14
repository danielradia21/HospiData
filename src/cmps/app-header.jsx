import { Link, NavLink } from 'react-router-dom';
import {routes} from '../routes';
import logo from '../assets/img/logo.png';
import * as React from 'react';
import Box from '@mui/material/Box';

import Modal from '@mui/material/Modal';
import { SignIn } from './login';
import { useSelector } from 'react-redux';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '500px',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

export function AppHeader() {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const handleSite = (type) => {
            if(type === 'doctor') window.location.href = '/doctor/meetings'
            else if(type === 'patient') window.location.href = '/patient/appointments'
    }
    const { user } = useSelector((state) => state.userModule);

    return (
        <header className="app-header">
            <Link className="img-container" to={'/'}>
                <img src={logo} alt="" />
            </Link>
            <div className="nav-links-container">
                <nav className="nav-links">
                <NavLink exact to={'/'}>Home</NavLink>
                {routes.map((route) => (
                    <NavLink exact key={route.path} to={route.path}>
                        {route.label}
                    </NavLink>
                ))}
                 <div> 
                       <button onClick={handleOpen} className="main-btn">
                            Login
                   </button>
                </div>
            </nav>
            </div>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style} className="check">
                    <SignIn onClose={handleClose} />
                </Box>
            </Modal>
        </header>
    );
}
