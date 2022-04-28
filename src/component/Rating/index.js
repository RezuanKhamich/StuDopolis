import React from "react";
import {styled, ToggleButton, ToggleButtonGroup} from "@mui/material";
import MainPageTitle from "../../containers/MainPageTitle";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {userRatingData} from "../../externalData";

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

const TableWrapper = styled(TableContainer)( (props) =>({
  minWidth: props.width >= 500 ? '700px' : '100%',
  margin: 'auto',
  marginTop: '40px',
  width: props.width >= 500 ? 700 : '100%',
}));

const ToogleWrapper = styled(ToggleButtonGroup)( () =>({
  display: 'flex',
  justifyContent: 'center',
}));

const Rating = props => {
  const { innerWidth: width, innerHeight: height } = window;
  const [alignment, setAlignment] = React.useState('experience');

  const ratingFilterChange = (event, newAlignment) => {
    setAlignment(newAlignment);
  };

  const tableHeaders = {
    experience: 'Опыт',
    career: 'Карьера',
    goldCoin: 'goldCoin',
    greenCoin: 'greenCoin',
  }


  return (
    <>
      <MainPageTitle>Рейтинг</MainPageTitle>
      <ToogleWrapper
          color="primary"
          value={alignment}
          exclusive
          onChange={ratingFilterChange}
        >
          <ToggleButton value="experience">Опыт</ToggleButton>
          <ToggleButton value="career">Карьера</ToggleButton>
          <ToggleButton value="goldCoin">GoldCoin</ToggleButton>
          <ToggleButton value="greenCoin">GreenCoin</ToggleButton>
      </ToogleWrapper>

      <TableWrapper component={Paper} width={width}>
        <Table sx={{ minWidth: width >= 500 ? 700 : 'inherit' }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell >Место</StyledTableCell>
              <StyledTableCell>ФИО ученика</StyledTableCell>
              <StyledTableCell align="right">{tableHeaders[alignment]}</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {userRatingData.map((row, index) => (
              <StyledTableRow key={index}>
                <StyledTableCell >{index+1}</StyledTableCell>
                <StyledTableCell >
                  {row.user}
                </StyledTableCell>
                <StyledTableCell align="right">{row[alignment]}</StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableWrapper>
    </>
  )
}

export default Rating