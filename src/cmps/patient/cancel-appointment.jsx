import { Box, Modal } from "@mui/material";

export function CancelAppointment({open,closeCancelModal,cancelAppointment,openId}) {



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

  return (
    <Modal
    open={open}
    onClose={closeCancelModal}
    aria-labelledby="modal-modal-title"
    aria-describedby="modal-modal-description"
>
<Box sx={style} className='delete'>
<div>
    <div className="modal-header">
        <p>Warning!</p>
        <button onClick={closeCancelModal}>X</button>
    </div>
    <div className=" modal-info-continer flex column justify-center align-center">
    <p>Are you sure you want to cancel the appointment?</p>
    <button onClick={cancelAppointment} className="acspet">Cancel the appointment</button>
    <button onClick={closeCancelModal} className="Cancel">Don't cancel the appointment</button>
    </div>
</div>
</Box>
</Modal>
  )
}
