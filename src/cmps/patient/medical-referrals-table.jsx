import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material'

export function MedicalReferralsTable({ referrals }) {
  const columns = [
    { id: 'date', label: 'Date', minWidth: 100 },
    { id: 'time', label: 'Time', minWidth: 100 },
    { id: 'title', label: 'Title', minWidth: 100, align: 'center' },
    { id: 'download', label: 'Download', minWidth: 100, align: 'center' },
  ]

  function createData(title, timestamp) {
    const {date,time} = getDate(timestamp)
    const viewDetails = (
      <button key={timestamp} className="view-details-btn">
        View Details{' '}
      </button>
    )
    return { date,time, title, viewDetails }
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

  const rows = referrals.map((res) => createData(res.title, +res.date))

  return (
    <TableContainer component={Paper}>
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
              <TableRow hover role="checkbox" tabIndex={-1} key={row.date}>
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
