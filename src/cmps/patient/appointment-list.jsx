import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getLoggedInUser } from '../../store/actions/user.actions'
import { AppointmentTable } from './appointment-table'
import { patientService } from '../../services/patient.service'
import { AppointmentModal } from './appointment-modal'
import { Alert, Snackbar } from '@mui/material'
import { Loader } from '../loader'

export function AppointmentList() {
  const { user } = useSelector((state) => state.userModule)

  const [appointments, setAppointments] = useState([])
  const [doctors, setDoctors] = useState([])
  const [filteredApps, setFilteredApps] = useState(null)
  const [openSnackbar, setOpenSnackbar] = useState({isOpen:false,msg:'',sev:'error'})

  const [open, setOpen] = useState(false)
  const [openId, setOpenId] = useState(null)
  const [openNewApp, setOpenNewApp] = useState(false)

  const dispatch = useDispatch()

  useEffect(() => {
    if (!user) dispatch(getLoggedInUser())
    if (user.appointments.length) {
      getAppointments()
    }
  }, [user])

  useEffect(async () => {
    getDoctors()
  }, [])

  function getAppointments() {
    // const futureAppointments = user.appointments.filter(
    //   (app) =>
    //     app.date > Date.now() && (app.status === 'pending' || app.status === 'approved')
    // )
    
    const futureAppointments = user.appointments.filter(
      (app) =>(app.status === 'pending' || app.status === 'approved')
    )
    // console.log(user.appointments)

    // console.log(futureAppointments)
    // const futureAppointments = user.appointments.filter(
    //   (app) => app.date > Date.now()
    // )
    setAppointments(
      (prevAppointments) => (prevAppointments = futureAppointments)
    )
  }

  async function getDoctors() {
    const doctors = await patientService.getPatientDoctors()
    setDoctors((prevDoctors) => (prevDoctors = doctors))
  }

  async function cancelAppointment() {
    try {
      if (!openId) return
      await patientService.cancelAppointment(user, openId)
      closeCancelModal()
      dispatch(getLoggedInUser())
    } catch (err) {
      console.log(err)
    }
  }

  const filterApps = ({ target }) => {
    const filteredApps = appointments.filter((app) =>
      app.doctor.fullname.toLowerCase().includes(target.value)
    )
    setFilteredApps((prev) => (prev = filteredApps))
  }

  function openCancelModal(id) {
    setOpen(() => true)
    setOpenId((prevOpenId) => (prevOpenId = id))
  }

  function closeCancelModal() {
    setOpen(() => false)
    setOpenId((prevOpenId) => (prevOpenId = null))
  }

  function openNewAppModal() {
    setOpenNewApp((prevOpenNewApp) => (prevOpenNewApp = true))
  }

  function closeNewAppModal() {
    setOpenNewApp((prevOpenNewApp) => (prevOpenNewApp = false))
  }

  const makeAppointment = async (doctorId, treatment, date) => {
    // treatment has no usage for now need to  think about how to add it
    try {
      date = date.getTime()
      if (Date.now() + 10 * 60 * 1000 >= date)
      throw new Error('Pick another date')
      await patientService.makeAppointment({ doctorId, date })
      dispatch(getLoggedInUser())
      await getDoctors()
      handleOpenSnackbar('success','Appointment sent for review')
      closeNewAppModal()
    } catch (err) {
      console.log('Pick a diffrent date')
      handleOpenSnackbar('error','Pick a diffrent date')
    }
  }

  function handleOpenSnackbar(sev,msg) {
    setOpenSnackbar((prev) => prev = {sev,msg,isOpen:true})
  }

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }

    setOpenSnackbar((prev)=>prev={isOpen:false,msg:'',sev:'error'})
  }

  return (
    <div className="appointments-content">
      <Snackbar
        open={openSnackbar.isOpen}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={openSnackbar.sev}
          sx={{ width: '100%' }}
        >
          {openSnackbar.msg}
        </Alert>
      </Snackbar>
      {!appointments&&<Loader/>}
      {/* {!appointments.length && <div>You have no appointments</div>} */}
      {/* {cancelAppointmentId&&<CancelAppointment closeCancelModal={closeCancelModal} cancelAppointment={cancelAppointment} open={open}/>} */}
      {appointments && (
        <>
          <div className="main-content-header">Appointments</div>
          <input
            onChange={filterApps}
            className="patient-search-input"
            type="text"
            placeholder="Serach Appointments..."
          />
          <AppointmentTable
            appointments={filteredApps || appointments}
            openId={openId}
            open={open}
            openCancelModal={openCancelModal}
            closeCancelModal={closeCancelModal}
            cancelAppointment={cancelAppointment}
          />
          <div className="appointments-btn-container">
            <button className="new-appointment" onClick={openNewAppModal}>
              Make an appointment
            </button>
          </div>
        </>
      )}
      {openNewApp && (
        <AppointmentModal
        handleOpenSnackbar={handleOpenSnackbar}
          openNewApp={openNewApp}
          closeNewAppModal={closeNewAppModal}
          makeAppointment={makeAppointment}
          openNewAppModal={openNewAppModal}
          doctors={doctors}
        />
      )}
    </div>
  )
}

{
  /* {appointments.map((appointment) => (
  <AppointmentPrev appointment={appointment} key={appointment._id} />
))} */
}
