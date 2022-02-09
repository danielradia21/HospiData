import hero from '../../assets/img/hero.jpg';
import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { SignUp } from '../signup';


export function BtnModal({handleChangeModel}) {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);


    return ( 
        <div className='flex column hero-modal'>
                    <h1>Chosse a option</h1>
                    <button onClick={()=> handleChangeModel('patient')} className='main-btn'>Join as Patient</button>
                    <button onClick={()=> handleChangeModel('enterKey')} className='main-btn'>Join as Doctor</button>
         </div>
    );
}
