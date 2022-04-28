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
  position: relative;
  &:hover{
    transition: 0.5s;
    box-shadow: 0px 5px 5px -3px rgb(0 0 0 / 20%), 0px 8px 10px 1px rgb(0 0 0 / 14%), 0px 3px 14px 2px rgb(0 0 0 / 12%);
    cursor: pointer;
  }
  &.completed{
    &:after{
      position: absolute;
      content: '';
      display: inline-block;
      width: 100%;
      height: 151px;
      background: rgba(255, 215, 0, 0.7)
    }
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


const Modules = ({courseData, setCurrentModuleId}) => {
  const theme = useTheme();
  const { innerWidth: width, innerHeight: height } = window;
  const [progress, setProgress] = useState(100);
  const [completedLessons, totalCountLessons] = useModulesProgress(courseData, 0)

  const CardWrapper = ({ module, index, disabled }) => (
    <InteractiveCard
      disabled={disabled}
      className={completedLessons[index] === totalCountLessons[index] ? 'completed' : null}
    >
      <CardMedia
        component="img"
        sx={{width: width >= 500 ? 250 : 150, height: width >= 500 ? '100%' : 90 }}
        image={module.image}
        alt="Live from space album cover"
      />
      <Box sx={{display: 'flex', flexDirection: 'column'}}>
        <CardContent sx={{flex: '1 0 auto'}}>
          <Typography component="div" variant="h5" sx={{fontSize: width >= 500 ? '1.5em' : '0.9em'}}>
            {index + 1}. {module.name}
          </Typography>
          <Typography variant="subtitle1" color="text.secondary" component="div" sx={{fontSize: width >= 500 ? '1em' : '0.7em'}}>
            Прогресс {completedLessons[index]}/{totalCountLessons[index]}
          </Typography>
        </CardContent>
      </Box>
    </InteractiveCard>
  )

  return(
    <>
      <MainPageTitle>Модули</MainPageTitle>

      <PageWrapper>
        {
          courseData ?
          modulesData.map((module, index) => {
            return (
              <>
                <Link to={`learn?id=${index}`} key={index}>
                  <CardWrapper module={module} index={index} />
                </Link>
                <br/>
              </>
            )})
            : null
        }
      </PageWrapper>
    </>
  )
}

export default Modules