import { Box, Modal } from '@mui/material'
import { useEffect } from 'react'
import logo from '../../assets/img/logo.png'
import { jsPDF } from 'jspdf'
import { Loader } from '../loader'
export function HistoryAppointmentModal({
  appointment,
  closeAppointment,
  user,
  open,
}) {


  function isRecommendation() {
    return appointment.drugs.legnth || appointment.referrals
  }


  const doc = new jsPDF();
  doc.addImage(logo,"PNG",20,20,60,13)
  doc.text('Appointed By:',20,50)
  doc.text(`Dr. ${appointment.doctor.fullname}, HospiData`,20,60)
  doc.text(`Appointed For:`,120,50)
  doc.text(`${user.fullname}`,120,60)
  doc.text(`Title: ${appointment.title}`,20,85)
  doc.text(`Description: ${appointment.description}`,20,95)
  if(appointment.referrals||appointment.drugs.length)doc.text('Recommendation: ',20,120)
  if(appointment.referrals)doc.text(`Referrals: ${appointment.referrals.title}`,20,135)
  if(appointment.drugs.length) doc.text(`Drugs: ${appointment.drugs.map((drug,idx)=>`${drug.title.charAt(0).toUpperCase()+drug.title.substring(1,drug.title.length)}`)}`,20,145)
  doc.text(`Printed on: ${getPDFDate(new Date())}`,10,290)


  function savePDF(){
      doc.save(`${user.fullname}-appointment-${appointment.date}.pdf`)
  }


  function getPDFDate(date){
    const day = date.getDate()
    const month = date.getMonth() + 1
    const year = date.getFullYear()
    const hour = date.getHours() < 10 ? '0' + date.getHours() : date.getHours()
    const minute =
      date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()
      return `${day}/${month}/${year} ${hour}:${minute}`
  }

  function getDate() {
    let date = new Date(+appointment.date)
    const day = date.getDate()
    const month = date.getMonth() + 1
    const year = date.getFullYear()
    const hour = date.getHours() < 10 ? '0' + date.getHours() : date.getHours()
    const minute =
      date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()
    return (
      <span>
        {' '}
        &nbsp;{day}/{month}/{year} &nbsp; {hour}:{minute}
      </span>
    )
  }

  useEffect(() => {
    if (!appointment) closeAppointment()
  }, [])

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '500px',
    
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
 
  }



  

  return (
    <div className="appointment-modal-container">
      {!appointment&&<Loader/>}
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
                  <img
                    src={logo}
                    alt="HospiData"
                    className="appointment-modal-logo"
                  />
                  <div className="appointment-by-to flex">
                    <div className="appointment-by">
                      <strong>Appointed By:</strong>
                      <div className="appointment-by-name">
                        Dr. {appointment.doctor.fullname} , HospiData
                      </div>
                    </div>
                    <div className="appointment-to">
                      <strong>Appointed For: </strong>
                      <div className="appointment-to-name">{user.fullname}</div>
                    </div>
                  </div>
                  <div className="appointment-modal-info">
                    <div className="appointment-modal-title">
                      <strong>Title : </strong> {`${appointment.title}`}
                    </div>
                    <div className="appointment-modal-desc">
                      <strong>Description : </strong> {appointment.description}
                    </div>

                    {isRecommendation && (
                      <div className="appointment-modal-recommendation">
                        <div>
                          <strong>Recommendation : </strong>
                        </div>
                        {appointment.referrals && (
                          <div className="appointment-modal-referrals">
                            <strong>Referrals : </strong>{' '}
                            {appointment.referrals.title}
                          </div>
                        )}
                        {appointment.drugs.length && (
                          <div className="appointment-modal-drugs">
                            <strong>Drugs : </strong>
                            {appointment.drugs.map((drug, idx) => (
                              <div className="appointment-modal-drug" key={idx}>
                               <span>&nbsp;{`${drug.title}`}&nbsp;</span> 
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                  <div className="appointment-modal-bottom">
                    <strong>Printed on : {getDate()} </strong>

                    <button className="download-btn appointment-modal-btn" onClick={savePDF}>
                      Download As PDF
                    </button>
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
