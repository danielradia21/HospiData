import {
    Box,
    Modal,
  } from '@mui/material'
  import { useEffect, useState } from 'react'
  
  export function HistoryAppointmentModal({
    appointment,
    closeAppointment,
    user
  }) {

  
  
  
    useEffect(()=>{
      if(!appointment) closeAppointment()
    },[])
  
    
  
    const style = {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width: '50%',
      height: '80%',
      bgcolor: 'background.paper',
      border: '2px solid #000',
      boxShadow: 24,
      // p: 4,
    }
  
    //   const handleChangeTreatment = (event) => {
    //     setTreatmentType(event.target.value)
    //   }
    //   const handleChangeDoctor = (event) => {
    //     setDoctor(event.target.value)
    //   }

    function downloadPDF(){

    }
    // const docTypeOptions = ['Allergists','Anesthesiologists','Cardiologists','Dermatologists','Endocrinologists','Family Physicians','Gastroenterologists','Hematologists','Internists']
  
    return (
      <div className="appointment-modal-container">
        {!appointment && <div>Loading...</div>}
        {appointment && (
          <Modal
            open={appointment}
            onClose={closeAppointment}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style} className="delete">
              <div>
              <div className="modal-header">
                <p>View appointment</p>
                <button onClick={closeAppointment}>X</button>
              </div>
                <div className="modal-info-continer flex column justify-center">
                  <Box sx={{ minWidth: 400 }}>
                      <div className="appointment-by-to flex">
                          <div className='appointment-by'>
                              <strong>Appointed By:</strong> 
                              <div className='appointment-by-name'>Dr. {appointment.doctor.fullname} , HospiData</div>
                          </div>
                          <div className='appointment-to'>
                              <strong>Appointed For: </strong>
                              <div className='appointment-to-name'>{user.fullname}</div>
                          </div>
                      </div>
                    <div className="appoint-modal-title">
                        
                        <span>Title : </span> {`${appointment.title}`}
                    </div>
                    <div className="to-doctor-selector">
                    </div>
                  </Box>
                  <button
                    className="download-button"
                    onClick={downloadPDF}
                  >
                    Download As PDF
                  </button>
                </div>
              </div>
            </Box>
          </Modal>
        )}
      </div>
    )
  }
  