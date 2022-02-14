// import {
//   Paper,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
// } from '@mui/material'

// export function MedicalHistoryTable({ history }) {
//   const columns = [
//     { id: 'date', label: 'Date', minWidth: 100 },
//     { id: 'time', label: 'Time', minWidth: 100 },
//     { id: 'title', label: 'Title', minWidth: 100, align: 'center' },
//     { id: 'viewDetails', label: 'View Details', minWidth: 100, align: 'center' },
//   ]

// function createData(title, timestamp,id) {
//   const {date,time} = getDate(timestamp)
//   const viewDetails = (
//     <button key={timestamp} className="view-details-btn">
//       View Details{' '}
//     </button>
//   )
//   return { date,time, title, viewDetails,id }
// }

//   function getDate(timestamp) {
//     let date = new Date(timestamp)
//   const day = date.getDate()
//   const month = date.getMonth() + 1
//   const year = date.getFullYear()
//   const hour = date.getHours() < 10 ? '0' + date.getHours()  : date.getHours()
//   const minute = date.getMinutes()  < 10 ? '0' + date.getMinutes() : date.getMinutes()
//   return { date: `${day}/${month}/${year}`, time: `${hour}:${minute}` }
// }

//   const rows = history.map((res) => createData(res.title, +res.date,res._id))

//   return (
//     <TableContainer component={Paper}>
//       <Table sx={{ maxHeight: 440 }} stickyHeader aria-label="sticky table">
//         <TableHead>
//           <TableRow>
//             {columns.map((column) => (
//               <TableCell
//                 key={column.label}
//                 align={column.align}
//                 style={{ minWidth: column.minWidth }}
//               >
//                 {column.label}
//               </TableCell>
//             ))}
//           </TableRow>
//         </TableHead>
//         <TableBody>
//           {rows.map((row) => {
//             return (
//               <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
//                 {columns.map((column) => {
//                   const value = row[column.id]
//                   return (
//                     <TableCell key={column.id} align={column.align}>
//                       {value}
//                     </TableCell>
//                   )
//                 })}
//               </TableRow>
//             )
//           })}
//         </TableBody>
//       </Table>
//     </TableContainer>
//   )
// }

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Paper from '@mui/material/Paper';
import { visuallyHidden } from '@mui/utils';
import { CancelAppointment } from './cancel-appointment';
import { HistoryAppointmentModal } from './history-appointment-modal';

function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

function getComparator(order, orderBy) {
    return order === 'desc'
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) {
            return order;
        }
        return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
}

const headCells = [
    { id: 'date', label: 'Date', numeric: false, disablePadding: false },
    { id: 'time', label: 'Time', numeric: false, disablePadding: false },
    { id: 'title', label: 'Title', numeric: false, disablePadding: false },
    {
        id: 'viewDetails',
        label: 'View Details',
        disablePadding: false,
        numeric: false,
    },
];
function EnhancedTableHead(props) {
    const { order, orderBy, onRequestSort } = props;
    const createSortHandler = (property) => (event) => {
        onRequestSort(event, property);
    };

    return (
        <TableHead>
            <TableRow>
                <TableCell padding="checkbox"></TableCell>
                {headCells.map((headCell) => (
                    <TableCell
                        key={headCell.id}
                        align={'center'}
                        padding={headCell.disablePadding ? 'none' : 'normal'}
                        sortDirection={orderBy === headCell.id ? order : false}
                    >
                        {headCell.id !== 'viewDetails' ? (
                            <TableSortLabel
                                active={orderBy === headCell.id}
                                direction={
                                    orderBy === headCell.id ? order : 'asc'
                                }
                                onClick={createSortHandler(headCell.id)}
                            >
                                {headCell.label}
                                {orderBy === headCell.id ? (
                                    <Box component="span" sx={visuallyHidden}>
                                        {order === 'desc'
                                            ? 'sorted descending'
                                            : 'sorted ascending'}
                                    </Box>
                                ) : null}
                            </TableSortLabel>
                        ) : null}
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
}

EnhancedTableHead.propTypes = {
    numSelected: PropTypes.number.isRequired,
    onRequestSort: PropTypes.func.isRequired,
    onSelectAllClick: PropTypes.func.isRequired,
    order: PropTypes.oneOf(['asc', 'desc']).isRequired,
    orderBy: PropTypes.string.isRequired,
    rowCount: PropTypes.number.isRequired,
};

export function MedicalHistoryTable({ history, openAppointment }) {
    const [order, setOrder] = useState('asc');
    const [orderBy, setOrderBy] = useState('calories');
    const [selected, setSelected] = useState([]);
    const [page, setPage] = useState(0);
    const [dense, setDense] = useState(false);
    const [rowsPerPage, setRowsPerPage] = useState(4);

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleSelectAllClick = (event) => {
        if (event.target.checked) {
            const newSelecteds = rows.map((n) => n.name);
            setSelected(newSelecteds);
            return;
        }
        setSelected([]);
    };

    function getDate(timestamp) {
        let date = new Date(timestamp);
        const day = date.getDate();
        const month = date.getMonth() + 1;
        const year = date.getFullYear();
        const hour =
            date.getHours() < 10 ? '0' + date.getHours() : date.getHours();
        const minute =
            date.getMinutes() < 10
                ? '0' + date.getMinutes()
                : date.getMinutes();
        return { date: `${day}/${month}/${year}`, time: `${hour}:${minute}` };
    }

    function createData(title, timestamp, id, app) {
        const { date, time } = getDate(timestamp);
        const viewDetails = (
            <button
                key={id}
                onClick={() => openAppointment(app)}
                className="view-details-btn"
            >
                View Details{' '}
            </button>
        );
        return { date, time, title, viewDetails, id };
    }

    const rows = history.map((res) =>
        createData(res.title, +res.date, res._id, res)
    );

    const handleClick = (event, name) => {
        const selectedIndex = selected.indexOf(name);
        let newSelected = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, name);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1)
            );
        }

        setSelected(newSelected);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleChangeDense = (event) => {
        setDense(event.target.checked);
    };

    const isSelected = (name) => selected.indexOf(name) !== -1;

    // Avoid a layout jump when reaching the last page with empty rows.
    const emptyRows =
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

    return (
        <>
            <Box sx={{ width: '100%' }}>
                <Paper sx={{ width: '100%', mb: 2 }}>
                    <TableContainer>
                        <Table
                            sx={{
                                minWidth: 400,
                                minHeight: 400,
                                maxWidth: 750,
                            }}
                            aria-labelledby="tableTitle"
                            size={dense ? 'small' : 'medium'}
                        >
                            <EnhancedTableHead
                                numSelected={selected.length}
                                order={order}
                                orderBy={orderBy}
                                onSelectAllClick={handleSelectAllClick}
                                onRequestSort={handleRequestSort}
                                rowCount={rows.length}
                            />
                            <TableBody>
                                {stableSort(rows, getComparator(order, orderBy))
                                    .slice(
                                        page * rowsPerPage,
                                        page * rowsPerPage + rowsPerPage
                                    )
                                    .map((row, index) => {
                                        const isItemSelected = isSelected(
                                            row.date
                                        );
                                        const labelId = `enhanced-table-checkbox-${index}`;
                                        return (
                                            <TableRow
                                                hover
                                                onClick={(event) =>
                                                    handleClick(event, row.name)
                                                }
                                                role="checkbox"
                                                aria-checked={isItemSelected}
                                                tabIndex={-1}
                                                key={row.date}
                                                selected={isItemSelected}
                                            >
                                                <TableCell padding="checkbox"></TableCell>
                                                <TableCell
                                                    component="th"
                                                    id={labelId}
                                                    scope="row"
                                                    align="center"
                                                >
                                                    {row.date}
                                                </TableCell>
                                                <TableCell align="center">
                                                    {row.time}
                                                </TableCell>
                                                <TableCell align="center">
                                                    {row.title}
                                                </TableCell>

                                                <TableCell align="center">
                                                    {row.viewDetails}
                                                </TableCell>
                                            </TableRow>
                                        );
                                    })}
                                {emptyRows > 0 && (
                                    <TableRow
                                        style={{
                                            height:
                                                (dense ? 33 : 53) * emptyRows,
                                        }}
                                    >
                                        <TableCell colSpan={6} />
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <TablePagination
                        className="table-pagination"
                        rowsPerPageOptions={[]}
                        component="div"
                        count={rows.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                </Paper>
            </Box>
        </>
    );
}
