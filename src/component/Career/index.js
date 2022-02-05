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

const TableWrapper = styledMUI(TableContainer)( () =>({
  width: '700px',
  margin: 'auto',
  marginTop: '40px',
}));

const Career = () => {
  const experience = 24000

  return(
    <>
      <MainPageTitle>Карьера</MainPageTitle>
      <ExperienceCount>
        Мой опыт: {experience} <GameIcon icon="0" />
      </ExperienceCount>
      <ExperienceCount>
        Моя должность: Младший разработчик (Junior)
      </ExperienceCount>

      <TableWrapper component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
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
                  <StyledTableCell align="right">{row.requiredExp} {row.requiredExp !== '-' ? <GameIcon icon="0" /> : null}</StyledTableCell>
                  <StyledTableCell >+{row.rewardGoldCoin} {row.rewardGoldCoin !== '-' ? <GameIcon icon="1" /> : null}<br/>+{row.rewardGreenCoin} <GameIcon icon="2" /></StyledTableCell>
                  <StyledTableCell align="right">+{row.rewardGreenCoin} <GameIcon icon="2" /></StyledTableCell>
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