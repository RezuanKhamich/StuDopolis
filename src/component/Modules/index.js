import React, {useEffect, useState} from "react";
import styled from "styled-components";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Card,
  CardContent, CardMedia, Grid,
  IconButton, LinearProgress,
  Typography
} from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MainPageTitle from "../../containers/MainPageTitle";
import {useTheme} from "@emotion/react";
import SchoolIcon from '@mui/icons-material/School';
import Button from "@mui/material/Button";
import {Link, useSearchParams} from "react-router-dom";
import PageWrapper from "../../containers/PageWrapper/PageWrapper";
import {coursesData, modulesData} from "../../externalData";
import {useAllCoursesProgress, useModulesProgress} from "../../utils/services/сalculationService/courseProgress";
import {useSelector} from "react-redux";
import {courseMaterials} from "../../data/courseData/FrontEnd";
import Tooltip from "@mui/material/Tooltip";
import Zoom from "@mui/material/Zoom";
import ListAltIcon from "@mui/icons-material/ListAlt";
import BeenhereIcon from "@mui/icons-material/Beenhere";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import GamePointsBadge from "../GamePointsBadge";

const CourseCard = styled(Card)`
  display: flex;
  position: relative;
  margin-bottom: 30px;
`;

const InteractiveCard = styled(Card)`
  display: flex;
  opacity: ${props => props.disabled ? '0.5' : '1'};
  margin-right: ${props => props.rightCard ? '0px' : '30px'};
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

const CourseDetailsContainer = styled('div')`
  display: flex;
  justify-content: space-between;
  color: #212529;
  margin-top: 10px;
`;

const DetailsBox = styled('span')`
  display: flex;
  align-items: center;
  font-weight: 500;
  font-size: 14px;
`;

const AwardStats = styled('div')`
  padding: 16px;
  position: absolute;
  top: 0px;
  right: 0px;
  margin-left: auto;
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


const Modules = ({setCurrentModuleId}) => {
  const theme = useTheme();
  const courseData = useSelector(state => state.repos.courseData)
  const { innerWidth: width, innerHeight: height } = window;
  const [progress, setProgress] = useState(100);
  const [currentCourseId, setCurrentCourseId] = useSearchParams();

  const [completedLessons, totalCountLessons] = useModulesProgress(courseData, 0)

  const CardWrapper = ({ moduleName, index, disabled, rightCard }) => (
    <InteractiveCard
      disabled={disabled}
      className={completedLessons[index] === totalCountLessons[index] ? 'completed' : null}
      rightCard={rightCard}
    >
      <CardMedia
        component="img"
        sx={{ width: '206px', padding: '16px', borderRadius: '20px', height: '142px' }}
        image={modulesData[index].image}
      />
      <CardContent sx={{ maxWidth: '280px', padding: '16px 16px 16px 0' }}>
        <Typography gutterBottom variant="h6" component="div" fontSize="16px">
          {index + 1}. {moduleName}
        </Typography>
        <Typography variant="body2" color="text.secondary" fontSize="14px" height="42px">
          {coursesData[currentCourseId.get('courseId')].description}
        </Typography>
        <CourseDetailsContainer>
          <Tooltip TransitionComponent={Zoom} placement="top" arrow title="Количество домашних заданий и тестов">
            <DetailsBox>
              <ListAltIcon sx={{ marginRight: '4px', width: '20px' }} />25
            </DetailsBox>
          </Tooltip>

          <Tooltip TransitionComponent={Zoom} placement="top" arrow title="Прогресс по лекциям/Общее количество лекций">
            <DetailsBox>
              <BeenhereIcon sx={{ marginRight: '4px', width: '20px' }} />7
            </DetailsBox>
          </Tooltip>

          <Tooltip TransitionComponent={Zoom} placement="top" arrow title="Прогресс по лекциям/Общее количество лекций">
            <DetailsBox>
              <BeenhereIcon sx={{ marginRight: '4px', width: '20px' }} />7
            </DetailsBox>
          </Tooltip>
        </CourseDetailsContainer>
      </CardContent>

      <AwardStats>
        <Tooltip TransitionComponent={Zoom} placement="top" arrow title="Награда в виде опыта">
          <DetailsBox style={{ justifyContent: 'end', marginBottom: '10px' }}>
            <GamePointsBadge count="2810" pointType="1" small/>
          </DetailsBox>
        </Tooltip>

        <Tooltip TransitionComponent={Zoom} placement="top" arrow title="Награда в виде GreenCoin">
          <DetailsBox style={{ justifyContent: 'end' }}>
            <GamePointsBadge count="2460" pointType="0" small/>
          </DetailsBox>
        </Tooltip>
      </AwardStats>
    </InteractiveCard>
  )
  return(
    <>
      <MainPageTitle>Модули</MainPageTitle>

      <Grid style={{maxWidth: 1190, margin: "auto"}} rowSpacing={5} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        <CourseCard sx={{ display: 'flex' }}>
          <CardMedia
            component="img"
            // height={ width > 500 ? 200 : 150 }
            sx={{ width: '230px', padding: '16px', borderRadius: '20px', height: '160px' }}
            image={coursesData[currentCourseId.get('courseId')].iconURL}
          />
          <CardContent sx={{ maxWidth: '550px', padding: '16px 16px 16px 0' }}>
            <Typography gutterBottom variant="h6" component="div" fontSize="18px">
              {coursesData[currentCourseId.get('courseId')].name}
            </Typography>
            <Typography variant="body2" color="text.secondary" fontSize="14px" height="52px">
              {coursesData[currentCourseId.get('courseId')].description}
            </Typography>
            <CourseDetailsContainer>
              <Tooltip TransitionComponent={Zoom} placement="top" arrow title="Количество домашних заданий и тестов">
                <DetailsBox>
                  <ListAltIcon sx={{ marginRight: '4px', width: '20px' }} />sd
                </DetailsBox>
              </Tooltip>

              <Tooltip TransitionComponent={Zoom} placement="top" arrow title="Прогресс по лекциям/Общее количество лекций">
                <DetailsBox>
                  <BeenhereIcon sx={{ marginRight: '4px', width: '20px' }} />sd
                </DetailsBox>
              </Tooltip>

              <Tooltip TransitionComponent={Zoom} placement="top" arrow title="Время прохождения курса">
                <DetailsBox>
                  <AccessTimeIcon sx={{ marginRight: '4px', width: '20px' }} />{coursesData[currentCourseId.get('courseId')].passingTime} месяца(ев)
                </DetailsBox>
              </Tooltip>
            </CourseDetailsContainer>
          </CardContent>
          <AwardStats>
            <Tooltip TransitionComponent={Zoom} placement="top" arrow title="Время прохождения курса">
              <DetailsBox style={{ justifyContent: 'end', marginBottom: '10px' }}>
                <GamePointsBadge count="14050" pointType="1"/>
              </DetailsBox>
            </Tooltip>

            <Tooltip TransitionComponent={Zoom} placement="top" arrow title="Время прохождения курса" >
              <DetailsBox style={{ justifyContent: 'end' }}>
                <GamePointsBadge count="12300" pointType="0"/>
              </DetailsBox>
            </Tooltip>
          </AwardStats>
        </CourseCard>
      </Grid>
      <Grid style={{maxWidth: 1190, margin: "auto"}} container rowSpacing={3}>
        {
          courseData[`course_${currentCourseId.get('courseId')}`] ?
            courseData[`course_${currentCourseId.get('courseId')}`].info.modulesName.map((name, index) => {
              return (
                <Grid item xs={ 6 } key={index}>
                  <Link to={`learn?courseId=${currentCourseId.get('courseId')}&moduleId=${index}`} key={index}>
                    <CardWrapper moduleName={name} img="" index={index} rightCard={index % 2 !== 0} />
                  </Link>
                </Grid>
              )})
            : null
        }
      </Grid>
    </>
  )
}

export default Modules