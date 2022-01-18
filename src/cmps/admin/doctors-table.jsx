
import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import DeleteIcon from '@mui/icons-material/Delete';
import CreateIcon from '@mui/icons-material/Create';


export default function StickyHeadTable({items}) {


  const columns = [
    { id: 'id', label: 'Id', minWidth: 100 },
    { id: 'name', label: 'Full Name', minWidth: 100 },
    {
      id: 'image',
      label: 'Image',
      minWidth: 100,
      align: 'center',
    },
    {
      id: 'admin',
      label: 'isAdmin',
      minWidth: 100,
      align: 'center',
    },
    {
      id: 'update',
      label: 'Update',
      minWidth: 100,
      align: 'right',
    },
    {
      id: 'remove',
      label: 'Delete',
      minWidth: 100,
      align: 'right',
    },
  ];
  
  function createData(id, name, img, isAdmin) {
    const update = <button className='updateBtn'><CreateIcon/></button>
    const remove = <button className='deleteBtn'><DeleteIcon/></button>
    const image = <img src={img} alt='img.png' style={{width:'80px',height:'80px',objectFit:'cover',objectPosition: 'top'}}/>
    const admin = isAdmin ? 'true' : 'false' 
    return { id, name, image, admin,update, remove};
  }
  
  const rows = items.map(item => createData(item._id,item.fullName,item.imgUrl,item.isAdmin ) );






  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
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
            {rows
              .map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.format && typeof value === 'number'
                            ? column.format(value)
                            : value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}