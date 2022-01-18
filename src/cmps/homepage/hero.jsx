import hero from '../../assets/img/hero.jpg';
import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { SignUp } from '../signup';

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

export function Hero() {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    return (
        <div className="main-hero full">
            <img src={hero} alt="Hospital" />
            <div className="main-content">
                <p>let's make your life happier</p>
                <h1>Healthy Living</h1>
                <button onClick={handleOpen} className="main-btn">
                    Register Today
                </button>
            </div>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style} className='check'>
                    <SignUp onClose={handleClose} />
                </Box>
            </Modal>
        </div>
    );
}
