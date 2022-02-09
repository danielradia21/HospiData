import {
    Box,
    Modal,
  } from '@mui/material'
  import { useEffect, useState } from 'react'
  import logo from '../../assets/img/logo.png';
  export function HistoryAppointmentModal({
    appointment,
    closeAppointment,
    user,
    open
  }) {

  function isRecommendation(){
      return appointment.drugs.legnth || appointment.referrals
  }

  function getDate() {
    let date = new Date(+appointment.date)
    const day = date.getDate()
    const month = date.getMonth() + 1
    const year = date.getFullYear()
    const hour = date.getHours() < 10 ? '0' + date.getHours() : date.getHours()
    const minute = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()
    return <span> &nbsp;{day}/{month}/{year} &nbsp; {hour}:{minute}</span>
  }
  
  
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
            open={open}
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
                      <img src={logo} alt='HospiData' className='appointment-modal-logo'/>
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
                      <div className="appointment-modal-info">
                    <div className="appointment-modal-title">
                        <strong>Title : </strong> {`${appointment.title}`}
                    </div>
                    <div className="appointment-modal-desc">
                        <strong>Description : </strong> {appointment.description}
                    </div>
                   
                        {isRecommendation&&<div className='appointment-modal-recommendation'>
                            <div>
                            <strong>Recommendation : </strong>
                            </div>
                             {appointment.referrals&&<div className='appointment-modal-referrals'>
                            <strong>Referrals : </strong> {appointment.referrals.title}</div>
                            }
                            {appointment.drugs.length&&<div className='appointment-modal-drugs'>
                                    <strong>Drugs : </strong> 
                                    {appointment.drugs.map((drug,idx)=><div key={idx}>{`${idx+1}. ${drug}`}</div>)}
                                </div>}
                            </div>}
                    </div>
                    <div className='appointment-modal-btns'>
                    <button
                    className="download-btn"
                    onClick={downloadPDF}
                  >
                    Download As PDF
                  </button>
                    </div>
                    <div className='appointment-modal-bottom'>
                            <strong>Printed on : {getDate()} </strong> 
                    </div>

                  </Box>

                </div>
              </div>
            </Box>
          </Modal>
        )}
      </div>
    )
  }
  