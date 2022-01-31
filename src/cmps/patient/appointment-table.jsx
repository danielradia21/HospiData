import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material'

import { CancelAppointment } from './cancel-appointment'

export function AppointmentTable({ appointments,cancelAppointment,openCancelModal,closeCancelModal,openId }) {

  const columns = [
    { id: 'date', label: 'Date', minWidth: 100 },
    { id: 'time', label: 'Time', minWidth: 100 },
    { id: 'to', label: 'To', minWidth: 100, align: 'center' },
    { id: 'cancel', label: 'Cancel', minWidth: 100, align: 'center' },
  ]

  function createData(id, timestamp, name) {
    const { date, time } = getDate(timestamp)
    const to = `Dr.${name}`
    const cancel =  <button key={id} className="cancel-btn" onClick={()=>openCancelModal(id)}>Cancel </button>
    return { date, time, to, cancel }
  }

  function getDate(timestamp) {
      let date = new Date(timestamp)
    const day = date.getDate()
    const month = date.getMonth() + 1
    const year = date.getFullYear()
    const hour = date.getHours()
    const minute = date.getMinutes()
    return { date: `${day}/${month}/${year}`, time: `${hour}:${minute}` }
  }

  const rows = appointments.map((appointment) => createData(appointment._id, +appointment.date, appointment.doctor.fullname))

  return (
    <TableContainer component={Paper}>
          {openId&&<CancelAppointment closeCancelModal={closeCancelModal} cancelAppointment={cancelAppointment} openId={openId}/>}
      <Table sx={{ maxHeight: 440 }} stickyHeader aria-label="sticky table">
        <TableHead>
          <TableRow>
            {columns.map((column) => (
              <TableCell
                key={column.id}
                align={column.align}
                style={{ minWidth: column.minWidth }}
              >
                {column.label}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => {
            return (
              <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                {columns.map((column) => {
                  const value = row[column.id]
                  return (
                    <TableCell key={column.id} align={column.align}>
                      {value}
                    </TableCell>
                  )
                })}
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
