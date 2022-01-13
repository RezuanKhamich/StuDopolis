import React from "react";
import {styled, ToggleButton, ToggleButtonGroup} from "@mui/material";
import MainPageTitle from "../../components/MainPageTitle";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

const TableWrapper = styled(TableContainer)( () =>({
  width: '700px',
  margin: 'auto',
  marginTop: '40px',
}));

const ToogleWrapper = styled(ToggleButtonGroup)( () =>({
  display: 'flex',
  justifyContent: 'center',
}));

const Rating = props => {
  const [alignment, setAlignment] = React.useState('web');

  const handleChange = (event, newAlignment) => {
    setAlignment(newAlignment);
  };

  function createData(name, value) {
    return { name, value};
  }

  const rows = [
    createData('Иванов Вася Пупец', 159),
    createData('Иванов Вася Пупец', 159),
    createData('Иванов Вася Пупец', 159),
    createData('Иванов Вася Пупец', 159),
    createData('Иванов Вася Пупец', 159),
    createData('Иванов Вася Пупец', 159),
    createData('Иванов Вася Пупец', 159),
    createData('Иванов Вася Пупец', 159),
    createData('Иванов Вася Пупец', 159),
    createData('Иванов Вася Пупец', 159),
    createData('Иванов Вася Пупец', 159),
    createData('Иванов Вася Пупец', 159),
    createData('Иванов Вася Пупец', 159),
    createData('Иванов Вася Пупец', 159),
    createData('Иванов Вася Пупец', 159),
    createData('Иванов Вася Пупец', 159),
    createData('Иванов Вася Пупец', 159),
    createData('Иванов Вася Пупец', 159),
    createData('Иванов Вася Пупец', 159),
    createData('Иванов Вася Пупец', 159),
  ];
  return (
    <>
      <MainPageTitle>Рейтинг</MainPageTitle>
      <ToogleWrapper
          color="primary"
          value={alignment}
          exclusive
          onChange={handleChange}
        >
          <ToggleButton value="exp">Опыт</ToggleButton>
          <ToggleButton value="career">Карьера</ToggleButton>
          <ToggleButton value="goldCoin">GoldCoin</ToggleButton>
          <ToggleButton value="greenCoin">GreenCoin</ToggleButton>
      </ToogleWrapper>

      <TableWrapper component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell >Место</StyledTableCell>
              <StyledTableCell>ФИО ученика</StyledTableCell>
              <StyledTableCell align="right">Опыт</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, index) => (
              <StyledTableRow key={row.name}>
                <StyledTableCell >{index+1}</StyledTableCell>
                <StyledTableCell >
                  {row.name}
                </StyledTableCell>
                <StyledTableCell align="right">{row.value}</StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableWrapper>
    </>
  )
}

export default Rating