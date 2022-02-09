import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getLoggedInUser } from '../../store/actions/user.actions'
import { AppointmentPrev } from './appointment-prev'
import { AppointmentTable } from './appointment-table'
import { patientService } from '../../services/patient.service'
import { CancelAppointment } from './cancel-appointment'
import {AppointmentModal} from './appointment-modal'

export function AppointmentList() {
  const { user } = useSelector((state) => state.userModule)
  const [appointments, setAppointments] = useState([])
  const [doctors,setDoctors] = useState([])

  const [openId, setOpenId] = useState(null)
  const [openNewApp,setOpenNewApp] = useState(false)

  const dispatch = useDispatch()

  useEffect(() => {
    if (!user) dispatch(getLoggedInUser())
    if (user) {
      getAppointments()
      // console.log(user.appointments,appointments)
    }
  }, [user])

  useEffect(async ()=>{
    let doctors = await patientService.getDoctors()
    setDoctors((prevDoctors=>prevDoctors = doctors))
  },[])
 
  function getAppointments() {
    // const futureAppointments = user.appointments.filter((app)=>app.date>Date.now()&&app.status==='pending')
    const futureAppointments = user.appointments.filter(
      (app) => app.date < Date.now()
    )
    setAppointments(
      (prevAppointments) => (prevAppointments = futureAppointments)
    )
  
  }

  async function cancelAppointment() {
    try {
      if (!openId) return
      let appIdx = user.appointments.findIndex((app) => app._id == openId)
      let modifiedUser = { ...user }
      if (appIdx > -1) {
        setOpenId((prevOpenId) => (prevOpenId = null))
        modifiedUser.appointments[appIdx].status = 'cancelled'
        await patientService.updateSelfPatient(modifiedUser)
        
      }
    } catch (err) {
      console.log(err)
    }
  }

  function openCancelModal(id) {
    setOpenId((prevOpenId) => (prevOpenId = id))
  }

  function closeCancelModal() {
    setOpenId((prevOpenId) => (prevOpenId = null))
  }

  function openNewAppModal(){
    setOpenNewApp((prevOpenNewApp)=>prevOpenNewApp=true)
  }

  function closeNewAppModal(){
    setOpenNewApp((prevOpenNewApp)=>prevOpenNewApp=false)
  }

  const makeAppointment=async (doctorId,treatment,date)=>{
    // treatment has no usage for now need to  think about how to add it
    date = date.getTime()
   await patientService.makeAppointment({doctorId,date})
    console.log(doctorId,treatment,date)
  }

  
  return (
    <div className="appointments-content">
      {/* {!appointments&&<div>Loading...</div>} */}
      {!appointments.length && <div>You have no appointments</div>}
      {/* {cancelAppointmentId&&<CancelAppointment closeCancelModal={closeCancelModal} cancelAppointment={cancelAppointment} open={open}/>} */}
      {appointments.length && (
        <>
          <div className="main-content-header">Appointments</div>
          <AppointmentTable
            appointments={appointments}
            openId={openId}
            openCancelModal={openCancelModal}
            closeCancelModal={closeCancelModal}
            cancelAppointment={cancelAppointment}
          />
          <button className='new-appointment' onClick={openNewAppModal}>Make an appointment</button>
        </>
      )}
      {openNewApp&&<AppointmentModal openNewApp={openNewApp} closeNewAppModal={closeNewAppModal} makeAppointment={makeAppointment} openNewAppModal={openNewAppModal} doctors={doctors}/>}
    </div>
  )
}

{
  /* {appointments.map((appointment) => (
  <AppointmentPrev appointment={appointment} key={appointment._id} />
))} */
}
