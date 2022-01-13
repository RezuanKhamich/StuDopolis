import React, {useEffect, useState} from "react";
import styled from "styled-components";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Card,
  CardContent, CardMedia,
  IconButton, LinearProgress,
  Typography
} from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MainPageTitle from "../../components/MainPageTitle";
import {useTheme} from "@emotion/react";
import ModuleImage from './media/courseWallpaper/wallpaperJS.png'
import SchoolIcon from '@mui/icons-material/School';
import Button from "@mui/material/Button";
import {Link} from "react-router-dom";

const ContentWrapper = styled('div')`
  width: 980px;
  margin: auto;
`


function LinearProgressWithLabel(props) {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <Box sx={{ width: '100%', mr: 1 }}>
        <LinearProgress color="secondary" variant="determinate" {...props} />
      </Box>
      <Box sx={{ minWidth: 35 }}>
        <Typography variant="body2" color="text.secondary">{`${Math.round(
          props.value,
        )}/100`}</Typography>
      </Box>
    </Box>
  );
}


const Modules = () => {
  const theme = useTheme();
  const [progress, setProgress] = useState(100);

  const modulesData = [
    {name: 'Изучаем HTML5', disabled: false},
    {name: 'Основы CSS/CSS3', disabled: false},
    {name: 'JavaScript ES6+', disabled: true},
    {name: 'Основы React.js', disabled: true},
    {name: 'Redux + бонус', disabled: true},
  ]

  return(
    <>
      <MainPageTitle>Модули</MainPageTitle>

      <ContentWrapper>
        <Card sx={{ display: 'flex' }}>
          <CardMedia
            component="img"
            sx={{ width: 250 }}
            image={ModuleImage}
            alt="Live from space album cover"
          />
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <CardContent sx={{ flex: '1 0 auto' }}>
              <Typography component="div" variant="h5">
                Web-разработка
              </Typography>
              <Typography variant="subtitle1" color="text.secondary" component="div">
                Описание
              </Typography>
            </CardContent>
          </Box>
        </Card>
        <br/><br/>
        {
          modulesData.map((elem, index) => (
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
                disabled={elem.disabled}
              >
                <SchoolIcon color="secondary" style={{marginRight: 20}} />
                <Typography>{index+1}. {elem.name}</Typography>
                <Box sx={{ width: '50%' }} style={{marginLeft: 'auto', marginRight: 20}}>
                  <LinearProgressWithLabel value={progress} />
                </Box>
              </AccordionSummary>
              <AccordionDetails style={{position: 'relative'}}>

                <Typography>
                  Описание
                </Typography>
                <br/>
                <Link to="learn" style={{position: 'absolute', right: 10}}>
                  <Button size="small" variant="contained" style={{width: 220}}>Изучать модуль</Button>
                </Link>
                <br/>
                <h3>Выполнено: домашних заданий</h3>
                <Box sx={{ width: '100%' }}>
                  <LinearProgressWithLabel value={progress} />
                </Box>
                <h3>Выполнено: тестов</h3>
                <Box sx={{ width: '100%' }}>
                  <LinearProgressWithLabel value={progress} />
                </Box>
                <h3>Выполнено: лекций</h3>
                <Box sx={{ width: '100%' }}>
                  <LinearProgressWithLabel value={progress} />
                </Box>
                <h3>Выполнено: домашних заданий</h3>
                <Box sx={{ width: '100%' }}>
                  <LinearProgressWithLabel value={progress} />
                </Box>
              </AccordionDetails>
            </Accordion>
          ))
        }

      </ContentWrapper>

    </>
  )
}

export default Modules