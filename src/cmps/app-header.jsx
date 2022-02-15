import { Link, NavLink } from 'react-router-dom';
import {
    routes,
    adminNestedRoutes,
    patientNestedRoutes,
    doctorNestedRoutes,
} from '../routes';
import logo from '../assets/img/logo.png';
import * as React from 'react';
import Box from '@mui/material/Box';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import Modal from '@mui/material/Modal';
import { SignIn } from './login';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { onLogout } from '../store/actions/user.actions';

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
    const { user } = useSelector((state) => state.userModule);
    const [menuOpen, setMenuOpen] = React.useState(false);
    const [open, setOpen] = React.useState(false);
    const [openProfile, setOpenProfile] = React.useState(true);
    const [openAdmin, setOpenAdmin] = React.useState(false);

    const dispatch = useDispatch();

    const handleOpenType = (type) => {
        switch (type) {
            case 'profile':
                setOpenProfile((prevOpen) => (prevOpen = true));
                setOpenAdmin((prevOpen) => (prevOpen = false));
                break;
            case 'admin':
                setOpenProfile((prevOpen) => (prevOpen = false));
                setOpenAdmin((prevOpen) => (prevOpen = true));
                break;
        }
    };

    const handleUserType = () => {
        switch (user.type) {
            case 'patient':
                window.location.href = '/patient/appointments';
                break;
            case 'doctor':
                window.location.href = '/doctor/meetings';
                break;
        }
    };

    const handleOpen = () => {
        closeMenu();
        setOpen(true);
    };
    const handleClose = () => setOpen(false);

    const openMenu = () => {
        setMenuOpen((prev) => (prev = true));
    };
    const closeMenu = () => {
        setMenuOpen((prev) => (prev = false));
    };

    const onLogOut = () => {
        window.location.href = '/';
        dispatch(onLogout());
    };
    return (
        <header className="app-header">
            <Link className="img-container" to={'/'}>
                <img src={logo} alt="" />
            </Link>
            <div className="nav-links-container">
                <nav className="nav-links">
                    <NavLink exact to={'/'}>
                        Home
                    </NavLink>
                    {routes.map((route) => (
                        <NavLink exact key={route.path} to={route.path}>
                            {route.label}
                        </NavLink>
                    ))}
                    {!user && (
                        <div>
                            <button onClick={handleOpen} className="main-btn">
                                Login
                            </button>
                        </div>
                    )}
                    {user && (
                        <div>
                            <button
                                onClick={handleUserType}
                                className="main-btn"
                            >
                                Profile
                            </button>
                        </div>
                    )}
                </nav>
                <nav className="burger-container">
                    <div>
                        <div className="burger-sign" onClick={openMenu}>
                            <MenuIcon />
                        </div>
                    </div>
                    <div
                        className={`blackscreen ${
                            menuOpen ? 'open-blackscreen' : 'close-blackscreen'
                        }`}
                        onClick={closeMenu}
                    ></div>
                    <div
                        className={`float-menu ${menuOpen ? 'open' : 'close'}`}
                    >
                        <div className="main-container">
                            <nav className="nav-links ">
                                <div className="x-btn" onClick={closeMenu}>
                                    <CloseIcon />
                                </div>
                                <NavLink exact to={'/'}>
                                    Home
                                </NavLink>
                                {routes.map((route) => (
                                    <NavLink
                                        exact
                                        key={route.path}
                                        to={route.path}
                                        onClick={closeMenu}
                                    >
                                        {route.label}
                                    </NavLink>
                                ))}
                                {!user && (
                                    <div>
                                        <button
                                            onClick={handleOpen}
                                            className="main-btn"
                                        >
                                            Login
                                        </button>
                                    </div>
                                )}
                                {user && (
                                    <div>
                                        <button
                                            className="main-btn"
                                            onClick={onLogOut}
                                        >
                                            Logout
                                        </button>
                                    </div>
                                )}

                                {user?.type === 'patient' && (
                                    <>
                                        <div
                                            className="navbar-line-seperator"
                                            onClick={() =>
                                                handleOpenType('profile')
                                            }
                                        >
                                            <h2>Profile</h2>
                                        </div>
                                        {openProfile &&
                                            patientNestedRoutes.map((route) => (
                                                <NavLink
                                                    exact
                                                    key={route.path}
                                                    to={route.path}
                                                    onClick={closeMenu}
                                                >
                                                    {route.label}
                                                </NavLink>
                                            ))}
                                    </>
                                )}
                                {user?.type === 'doctor' && (
                                    <>
                                        <div
                                            className="navbar-line-seperator"
                                            onClick={() =>
                                                handleOpenType('profile')
                                            }
                                        >
                                            <h2>Profile</h2>
                                        </div>
                                        {openProfile &&
                                            doctorNestedRoutes.map((route) => (
                                                <NavLink
                                                    exact
                                                    key={route.path}
                                                    to={route.path}
                                                    onClick={closeMenu}
                                                >
                                                    {route.label}
                                                </NavLink>
                                            ))}
                                    </>
                                )}
                                {user?.isAdmin && (
                                    <>
                                        <div
                                            className="navbar-line-seperator"
                                            onClick={() =>
                                                handleOpenType('admin')
                                            }
                                        >
                                            <h2>Admin</h2>
                                        </div>
                                        {openAdmin &&
                                            adminNestedRoutes.map((route) => (
                                                <NavLink
                                                    exact
                                                    key={route.path}
                                                    to={route.path}
                                                    onClick={closeMenu}
                                                >
                                                    {route.label}
                                                </NavLink>
                                            ))}
                                    </>
                                )}
                            </nav>
                        </div>
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
