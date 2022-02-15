import React from 'react';
import PropTypes from 'prop-types';

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
import { patientService } from '../../services/patient.service';
import { ViewDetailsModal } from './patient/viewDetailsModal';

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
    {
        id: 'date',
        numeric: false,
        disablePadding: true,
        label: 'Date',
    },
    {
        id: 'time',
        numeric: true,
        disablePadding: false,
        label: 'Time',
    },
    {
        id: 'name',
        numeric: true,
        disablePadding: false,
        label: 'Name',
    },
    {
        id: 'done',
        numeric: true,
        disablePadding: false,
    },
    {
        id: 'cancel',
        numeric: true,
        disablePadding: false,
    },
];

function EnhancedTableHead(props) {
    const {
        order,
        orderBy,
        onRequestSort,
    } = props;
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
                        {headCell.id !== 'done' && headCell.id !== 'cancel' ? (
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

const timeConversion = (time) => {
    const newTime = new Date(+time);
    const mins = newTime.getMinutes();
    const hours = newTime.getHours();
    return `${hours} : ${mins}`;
};

const dateConvertion = (time) => {
    const newTime = new Date(+time);
    const Year = newTime.getFullYear();
    const Month = newTime.getMonth() + 1;
    const Day = newTime.getDate();
    return `${Day}/${Month}/${Year}`;
};

export function MeetingTable({ items, toggleModal, isHistory }) {
    const [order, setOrder] = React.useState('asc');
    const [orderBy, setOrderBy] = React.useState('calories');
    const [selected, setSelected] = React.useState([]);
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const handleClose = () => setOpen(false);
    const handleOpen = () => setOpen(true);
    const [open, setOpen] = React.useState(false);
    const [currApp, setCurrApp] = React.useState({});

    const dense = false

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

    const openDetalis = async (appId, id) => {
        const currApp = await patientService.getAppByAppId(appId, id);

        setCurrApp((prev) => (prev = currApp));
        handleOpen();
    };

    function createData(timestemp, name, id, patId, meet) {
        if (!isHistory) {
            const doneBtn = (
                <button
                    onClick={() => toggleModal('Approve', id)}
                    className="accept-btn"
                >
                    Approve
                </button>
            );
            const cancelBtn = (
                <button
                    onClick={() => toggleModal('Cancel', id)}
                    className="remove-btn"
                >
                    Deny
                </button>
            );
            const time = timeConversion(timestemp);
            const date = dateConvertion(timestemp);
            return {
                date,
                time,
                name,
                doneBtn,
                cancelBtn,
            };
        } else {
            const detailsBtn = (
                <button
                    disabled={meet.status === 'approved' ? true : false}
                    onClick={() => openDetalis(patId, id)}
                    className="sub-btn"
                >
                    View Detials
                </button>
            );
            const time = timeConversion(timestemp);
            const date = dateConvertion(timestemp);
            return {
                date,
                time,
                name,
                detailsBtn,
            };
        }
    }

    const rows = items.map((meet) =>
        createData(
            meet.date,
            meet.patient.fullname,
            meet._id,
            meet.patient._id,
            meet
        )
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

  

    const isSelected = (name) => selected.indexOf(name) !== -1;

    const emptyRows =
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

    return (
        <>
            <Box sx={{ width: '100%' }}>
                <Paper sx={{ width: '100%', mb: 2 }}>
                    <TableContainer>
                        <Table
                               sx={{minWidth:350,maxHeight:400 }}
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
                                                key={index}
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
                                                    {row.name}
                                                </TableCell>

                                                {isHistory ? (
                                                    <TableCell align="center">
                                                        {row.detailsBtn}
                                                    </TableCell>
                                                ) : (
                                                    <>
                                                        <TableCell align="center">
                                                            {row.doneBtn}
                                                        </TableCell>
                                                        <TableCell align="center">
                                                            {row.cancelBtn}
                                                        </TableCell>
                                                    </>
                                                )}
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
            <ViewDetailsModal
                currApp={currApp}
                open={open}
                handleClose={handleClose}
            />
        </>
    );
}
