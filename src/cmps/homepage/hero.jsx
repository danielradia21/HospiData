import hero from '../../assets/img/hero.jpg';
import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { SignUp } from '../signup';
import { BtnModal } from './btn-modal';
import { EnterKey } from './enter-key';



export function Hero() {
    const [open, setOpen] = React.useState(false);
    const [modals,setmodals] = React.useState('');
    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        setOpen(false);
        handleChangeModel('')
    }
    const handleChangeModel = (stus) =>  setmodals(stus)

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
                    {modals === 'patient' ? <SignUp onClose={handleClose} userSatus={modals} /> 
                    : modals === 'enterKey' ? <EnterKey onClose={handleClose} handleChangeModel={handleChangeModel} userSatus={modals}/>
                    : modals === 'doctor' ?<SignUp onClose={handleClose} userSatus={modals}/>
                    :<BtnModal handleChangeModel={handleChangeModel}/>
                     }
                </Box>
            </Modal>
        </div>
    );
}
