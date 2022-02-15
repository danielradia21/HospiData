import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  Stack,
  TextField,
} from '@mui/material'
import { useEffect, useState } from 'react'
import { DateTimePicker } from '@mui/lab'
import AdapterDateFns from '@mui/lab/AdapterDateFns'
import LocalizationProvider from '@mui/lab/LocalizationProvider'
import { Loader } from '../loader'

export function AppointmentModal({
  openNewApp,
  closeNewAppModal,
  makeAppointment,
  doctors,
  handleOpenSnackbar
}) {
  const [treatmentType, setTreatmentType] = useState('')
  const [doctorId, setDoctorId] = useState('')
  const [date, setDate] = useState(new Date())



  useEffect(()=>{
    if(!doctors||!doctors.length) {
      handleOpenSnackbar('error','No doctor\'s are avaiable right now')
      closeNewAppModal()
    }
  },[])

  

  const style = {
    position: 'absolute',
    top: '35%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    width:400
  }


  const handleChange = ({ target }) => {
    if (target.name === 'treatment') {
      setTreatmentType(target.value)
      if (target.value === '') setDoctorId('')
    } else {
      setDoctorId(target.value)
    }
  }

  const onAppointmentReq = async () => {
    try {
      makeAppointment(doctorId, treatmentType, date)
    } catch (err) {
      console.log(err)
    }
  }


  const treatmentOptions = [
    'Allergy and immunology',
    'Anesthesiology',
    'Dermatology',
    'Diagnostic radiology',
    'Emergency medicine',
    'Family medicine',
    'Internal medicine',
    'Medical genetics',
    'Neurology ',
  ]

  return (
    <div className="appointment-modal-container">
      {!doctors &&<Loader/>}
      {doctors && (
        <Modal
          open={openNewApp}
          onClose={closeNewAppModal}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style} className="delete">
            <div>
              <div className="modal-header">
                <p>Make an appointment</p>
                <button onClick={closeNewAppModal}>X</button>
              </div>
              <div className="modal-info-continer flex column justify-center align-center">
                <Box sx={{ minWidth: 400 }}>
                  <div className="appoint-modal-title">
                    <h2>Make an appointment</h2>{' '}
                  </div>
                  <div className="type-of-treatment-selector">
                    <FormControl fullWidth>
                      <InputLabel id="type-of-treatment">
                        Type of Treatment
                      </InputLabel>
                      <Select
                        labelId="type-of-treatment"
                        id="type-of-treatment"
                        value={treatmentType}
                        onChange={handleChange}
                        autoWidth
                        name="treatment"
                        label="Type of Treatment..."
                      >
                        <MenuItem value="">
                          <em>None</em>
                        </MenuItem>
                        {treatmentOptions.map((type) => (
                          <MenuItem key={type} value={type.toLowerCase()}>
                            {type}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </div>
                  <div className="to-doctor-selector">
                    <FormControl fullWidth disabled={!treatmentType}>
                      <InputLabel id="to-doctor">To</InputLabel>
                      <Select
                        labelId="to-doctor"
                        id="to-doctor"
                        value={doctorId}
                        onChange={handleChange}
                        autoWidth
                        name="to-doctor"
                        label="Choose A Doctor..."
                      >
                        <MenuItem value="">
                          <em>None</em>
                        </MenuItem>
                        {doctors.map((doc) => (
                          <MenuItem key={doc._id} value={doc._id}>
                            Dr. {doc.fullname}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </div>
                </Box>
                <div className="date-time-selector appointment-modal-date">
                  <p>Possible appointment times</p>
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <Stack spacing={3}>
                      <DateTimePicker
                        disabled={!treatmentType || !doctorId}
                        renderInput={(params) => <TextField {...params} />}
                        label="Ignore time in each day"
                        value={date}
                        onChange={(newValue) => {
                          setDate(newValue)
                        }}
                        minDate={new Date()}
                        minTime={new Date(0, 0, 0, 8)}
                        maxTime={new Date(0, 0, 0, 17, 46)}
                        minutesStep={5}
                      />
                    </Stack>
                  </LocalizationProvider>
                </div>
                <button
                  className="make-appointment-btn"
                  disabled={!treatmentType || !doctorId}
                  onClick={onAppointmentReq}
                >
                  Request an appointment
                </button>
              </div>
            </div>
          </Box>
        </Modal>
      )}
    </div>
  )
}
