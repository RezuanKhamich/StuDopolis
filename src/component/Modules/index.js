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
import MainPageTitle from "../../containers/MainPageTitle";
import {useTheme} from "@emotion/react";
import SchoolIcon from '@mui/icons-material/School';
import Button from "@mui/material/Button";
import {Link} from "react-router-dom";
import PageWrapper from "../../containers/PageWrapper/PageWrapper";
import {modulesData} from "../../externalData";
import {useAllCoursesProgress, useModulesProgress} from "../../utils/services/сalculationService/courseProgress";

const InteractiveCard = styled(Card)`
  display: flex;
  opacity: ${props => props.disabled ? '0.5' : '1'};
  &:hover{
    transition: 0.5s;
    box-shadow: 0px 5px 5px -3px rgb(0 0 0 / 20%), 0px 8px 10px 1px rgb(0 0 0 / 14%), 0px 3px 14px 2px rgb(0 0 0 / 12%);
    cursor: pointer;
  }
`;

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


const Modules = ({courseData}) => {
  const theme = useTheme();
  const [progress, setProgress] = useState(100);
  const [completedLessons, totalCountLessons] = useModulesProgress(courseData, 0)
  console.log(completedLessons)
  console.log(totalCountLessons)

  const CardWrapper = ({ module, index, disabled }) => (
    <InteractiveCard
      disabled={disabled}
    >
      <CardMedia
        component="img"
        sx={{ width: 250 }}
        image={module.image}
        alt="Live from space album cover"
      />
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <CardContent sx={{ flex: '1 0 auto' }}>
          <Typography component="div" variant="h5">
            {index+1}. {module.name}
          </Typography>
          <Typography variant="subtitle1" color="text.secondary" component="div">
            Прогресс {completedLessons[index]}/{totalCountLessons[index]}
          </Typography>
        </CardContent>
      </Box>
    </InteractiveCard>
  )
  {console.log()}
  return(
    <>
      <MainPageTitle>Модули</MainPageTitle>

      <PageWrapper>
        {
          courseData ?
          modulesData.map((module, index) => (
            !courseData[`course_0`][`module_${index}`]?.moduleAvailable ?
              <>
                <CardWrapper module={module} disabled={!courseData[`course_0`][`module_${index}`].moduleAvailable} index={index} /> <br/>
              </>
              :
              <>
                <Link to="learn" key={index}>
                  <CardWrapper module={module} index={index} />
                </Link>
                <br/>
              </>
          ))
            : null
        }

        {
          // modulesData.map((elem, index) => (
          //   <Accordion>
          //     <AccordionSummary
          //       expandIcon={<ExpandMoreIcon />}
          //       aria-controls="panel1a-content"
          //       id="panel1a-header"
          //       disabled={elem.disabled}
          //     >
          //       <SchoolIcon color="secondary" style={{marginRight: 20}} />
          //       <Typography>{index+1}. {elem.name}</Typography>
          //       <Box sx={{ width: '50%' }} style={{marginLeft: 'auto', marginRight: 20}}>
          //         <LinearProgressWithLabel value={progress} />
          //       </Box>
          //     </AccordionSummary>
          //     <AccordionDetails style={{position: 'relative'}}>
          //
          //       <Typography>
          //         Описание
          //       </Typography>
          //       <br/>
          //       <Link to="learn" style={{position: 'absolute', right: 10}}>
          //         <Button size="small" variant="contained" style={{width: 220}}>Изучать модуль</Button>
          //       </Link>
          //       <br/>
          //       <h3>Выполнено: домашних заданий</h3>
          //       <Box sx={{ width: '100%' }}>
          //         <LinearProgressWithLabel value={progress} />
          //       </Box>
          //       <h3>Выполнено: тестов</h3>
          //       <Box sx={{ width: '100%' }}>
          //         <LinearProgressWithLabel value={progress} />
          //       </Box>
          //       <h3>Выполнено: лекций</h3>
          //       <Box sx={{ width: '100%' }}>
          //         <LinearProgressWithLabel value={progress} />
          //       </Box>
          //       <h3>Выполнено: домашних заданий</h3>
          //       <Box sx={{ width: '100%' }}>
          //         <LinearProgressWithLabel value={progress} />
          //       </Box>
          //     </AccordionDetails>
          //   </Accordion>
          // ))
        }
      </PageWrapper>
    </>
  )
}

export default Modules