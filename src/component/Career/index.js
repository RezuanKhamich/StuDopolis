import React from "react";
import MainPageTitle from "../../containers/MainPageTitle";
import styled from "styled-components";
import {styled as styledMUI, ToggleButton, ToggleButtonGroup} from "@mui/material";

import './style.css'
import GameIcon from "../../containers/GameIcon/GameIcon";
import { collection, addDoc } from "firebase/firestore";
import {db} from "../../firebase";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableCell, {tableCellClasses} from "@mui/material/TableCell";
import {careersRang} from "../../externalData";

const ExperienceCount = styled('p')`
  margin: 20px;
  font-size: 30px;
  text-align: center;
  color: ${props => props.secondText ? '#757575' : 'black'};
  
  @media (max-width: 430px) {
    font-size: ${props => props.secondText ? '15px!important' : '20px!important'};
    margin: 5px;
  }
`

//TODO: перевести на styled-components
const StyledTableCell = styledMUI(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styledMUI(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

const TableWrapper = styledMUI(TableContainer)( (props) =>({
  margin: 'auto',
  marginTop: '40px',
  minWidth: props.width >= 500 ? '700px' : '100%',
  width: props.width >= 500 ? 700 : '100%',
}));

const Career = () => {
  const { innerWidth: width, innerHeight: height } = window;
  const experience = 24000

  return(
    <>
      <MainPageTitle>Карьера</MainPageTitle>
      <ExperienceCount>
        Опыт: {experience} <GameIcon icon="0" />
      </ExperienceCount>
      <ExperienceCount secondText>
        Должность: Младший разработчик (Junior)
      </ExperienceCount>

      <TableWrapper component={Paper}>
        <Table sx={{ minWidth: width >= 500 ? 700 : 'inherit' }} aria-label="customized table">
          <TableHead sx={{ padding: width >= 500 ? '16px' : '2px' }}>
            <TableRow>
              <StyledTableCell>Должность</StyledTableCell>
              <StyledTableCell>Условие получения</StyledTableCell>
              <StyledTableCell align="right">Награда</StyledTableCell>
              <StyledTableCell align="right">Доход в неделю</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {
              careersRang.map((row, index) => (
                <StyledTableRow key={row.vacancy}>
                  <StyledTableCell >{index+1}. {row.vacancy}</StyledTableCell>
                  <StyledTableCell align="right">{row.requiredExp} {row.requiredExp !== '-' ? <GameIcon mobileWidth={18} icon="0" /> : null}</StyledTableCell>
                  <StyledTableCell >+{row.rewardGoldCoin} {row.rewardGoldCoin !== '-' ? <GameIcon mobileWidth={18} icon="1" /> : null}<br/>+{row.rewardGreenCoin} <GameIcon icon="2" /></StyledTableCell>
                  <StyledTableCell align="right">+{row.rewardGreenCoin} <GameIcon mobileWidth={18} icon="2" /></StyledTableCell>
                </StyledTableRow>
              ))
            }
          </TableBody>
        </Table>
      </TableWrapper>

    </>
  )
}

export default Career