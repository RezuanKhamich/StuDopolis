import React, {useEffect, useState} from "react";
import {styled, ToggleButton, ToggleButtonGroup} from "@mui/material";
import MainPageTitle from "../../containers/MainPageTitle";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {careersRang} from "../../externalData/index";
import playerHeadImg from '../../media/player-head.png';

import goldWreathSvg from '../../media/wreath_icon_gold.svg';
import silverWreathSvg from '../../media/wreath_icon_silver.svg';
import bronzeWreathSvg from '../../media/wreath_icon_bronze.svg';
import {collection, doc, getDoc} from "firebase/firestore";
import { query, orderBy, where, limit, onSnapshot } from "firebase/firestore";

import {db} from "../../firebase";
import Loader from "../Loader";
import WolfIcon from "../../media/wolf_photo.png";
import RacoonIcon from "../../media/racoon_photo.png";
import BearIcon from "../../media/bear_photo.png";
import FoxIcon from "../../media/fox_photo.png";
import TigerIcon from "../../media/tiger_photo.png";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: '#212529',
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

const UserIndex = styled('span')`
  position: relative;
  color: ${props => props.color || 'black'};
`;

const UserImage = styled('img')`
  width: 40px;
  margin-right: 8px;
`;

const Rating = props => {
  const { innerWidth: width, innerHeight: height } = window;
  const [isUserAuthorized, setIsUserAuthorized] = useState(JSON.parse(localStorage.getItem('st_user_authorized')))
  const tableHeaders = [
    {title: 'Опыт', baseName: 'experienceAmount'},
    // {title: 'Карьера', baseName: 'careerPosition'},
    // {title: 'GoldCoins', baseName: 'goldCoinAmount'},
    {title: 'GreenCoins', baseName: 'greenCoinAmount'},
  ]

  const userPhotos = [
    WolfIcon, RacoonIcon, BearIcon, FoxIcon, TigerIcon
  ]

  const [alignment, setAlignment] = useState(tableHeaders[0]);

  const wreathArray = [
    {index: 'I', color: '#EDAD0F', img: goldWreathSvg},
    {index: 'II', color: '#ADADA7', img: silverWreathSvg},
    {index: 'III', color: '#84440D', img: bronzeWreathSvg},
  ];

  const ratingFilterChange = (event, newAlignment) => {
    if(newAlignment) setAlignment(tableHeaders[+newAlignment]);
  };

  const [usersRate, setUsersRate] = useState([])


  useEffect(async () => {
    if (alignment) {
      const citiesRef = collection(db, "users");
      const q = await query(citiesRef, orderBy(`${alignment.baseName}`, "desc"), limit(20));
      onSnapshot(q, (snapshot => {
        setUsersRate([]);
        snapshot.docs.forEach((doc) => {
          setUsersRate(prevState => [...prevState, {... doc.data(), id: doc.id}])
        })
      }))
    }
  }, [alignment])

  return (
    <>
      <MainPageTitle>Рейтинг</MainPageTitle>
      <ToogleWrapper
          color="primary"
          value={alignment}
          exclusive
          onChange={ratingFilterChange}
        >
          <ToggleButton value="0">Опыт</ToggleButton>
          {/*<ToggleButton value="1">Карьера</ToggleButton>*/}
          {/*<ToggleButton value="2">GoldCoin</ToggleButton>*/}
          <ToggleButton value="1">GreenCoin</ToggleButton>
      </ToogleWrapper>

      { usersRate.length ?
          <TableWrapper component={Paper} width={width}>
            <Table sx={{ minWidth: width >= 500 ? 700 : 'inherit' }} aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell>Место</StyledTableCell>
                  <StyledTableCell>ФИО ученика</StyledTableCell>
                  <StyledTableCell style={{ width: '300px'}} align="right">{alignment.title}</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {usersRate.map((data, index) => (
                  <StyledTableRow key={index}>
                    <StyledTableCell>
                      {index < 3 ?
                        <div style={{ textAlign: 'center', width: '40px', position: 'relative' }}>
                          <img style={{ width: '40px', position: 'absolute' }} src={wreathArray[index].img} alt=""/>
                          <UserIndex color={wreathArray[index].color}>{wreathArray[index].index}</UserIndex>
                        </div>
                        : <UserIndex style={{left: '15px'}}>{index+1}</UserIndex>
                      }

                    </StyledTableCell>
                    <StyledTableCell>
                      <span style={{ display: 'flex', alignItems: 'center' }}>
                        <UserImage src={data?.photoIdRef ? userPhotos[data?.photoIdRef] : userPhotos[0]} alt=""/>
                        {data.firstName} {data.lastName}
                      </span>
                    </StyledTableCell>
                    <StyledTableCell align="right">{
                      alignment.baseName === 'careerPosition' ? careersRang[+data[alignment.baseName]].vacancy : data[alignment.baseName]
                    }</StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableWrapper>
        : <Loader />
      }
    </>
  )
}

export default Rating