import testPic from '../../assets/img/p-imgs/p1.jpg';
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

export function Patients() {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    return (
        <div>
            {/* <div className="patients">
                <div className="patient">
                    <div className="img-container">
                        <img src={testPic} alt="" />
                    </div>
                    <div>Full Name : bala beli</div>
                </div>
            </div>

            <div className="patients-btns-wrapper">
                <button className="main-btn" onClick={handleOpen}>
                    Create New Patient
                </button>
            </div>

            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style} className="check">
                    <SignUp onClose={handleClose} />
                </Box>
            </Modal> */}
        </div>
    );
}
