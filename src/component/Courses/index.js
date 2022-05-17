import React, {useEffect} from "react";
import {Link} from "react-router-dom";
import MainPageTitle from "../../containers/MainPageTitle";
import {Card, CardActions, CardContent, CardMedia, Grid, Typography} from "@mui/material";
import Button from '@mui/material/Button';
import styled from "styled-components";
import {coursesData} from "../../externalData";
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import BeenhereIcon from '@mui/icons-material/Beenhere';
import ListAltIcon from '@mui/icons-material/ListAlt';
import Zoom from '@mui/material/Zoom';
import Tooltip from '@mui/material/Tooltip';

import {
  getCourseProgress, useAllCoursesProgress,
  useCourseProgress,
  useModuleProgress
} from "../../utils/services/сalculationService/courseProgress";
import {useSelector} from "react-redux";

const InteractiveCard = styled(Card)`
  opacity: ${props => props.disabled ? '0.5' : '1'};
  max-width: 590px;
  height: 160px;
  position: relative;
  
  &:hover{
    transition: 0.5s;
    box-shadow: 0px 5px 5px -3px rgb(0 0 0 / 20%), 0px 8px 10px 1px rgb(0 0 0 / 14%), 0px 3px 14px 2px rgb(0 0 0 / 12%);
    cursor: pointer;
  }

  @media (max-width: 430px) {
    margin: auto;
    height: 305px;
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

const Courses = () => {
  const { innerWidth: width, innerHeight: height } = window;
  const courseData = useSelector(state => state.repos.courseData)
  const [completedLessons, totalCountLessons] = useAllCoursesProgress(courseData)

  return (
    <>
      <MainPageTitle>Выбери направление</MainPageTitle>

      <Grid style={{maxWidth: 1190, margin: "auto"}} container rowSpacing={5} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        {
          coursesData.map((elem, index) => (
            // <Grid item xs={ width > 500 ? 4 : 12 } key={index}>
            <Grid item xs={ 6 } key={index}>
              <Link to={`modules?courseId=${index}`}>
                <InteractiveCard sx={{ display: 'flex' }}>
                  <CardMedia
                    component="img"
                    // height={ width > 500 ? 200 : 150 }
                    sx={{ width: '230px', padding: '16px', borderRadius: '20px', height: '160px' }}
                    image={elem.iconURL}
                  />
                  <CardContent sx={{ padding: '16px 16px 16px 0' }}>
                    <Typography gutterBottom variant="h6" component="div" fontSize="18px">
                      {elem.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" fontSize="14px" height="52px">
                      {elem.description}
                    </Typography>
                    <CourseDetailsContainer>
                      <Tooltip TransitionComponent={Zoom} placement="top" arrow title="Количество домашних заданий и тестов">
                        <DetailsBox>
                            <ListAltIcon sx={{ marginRight: '4px', width: '20px' }} />{totalCountLessons[index]*3}
                        </DetailsBox>
                      </Tooltip>

                      <Tooltip TransitionComponent={Zoom} placement="top" arrow title="Прогресс по лекциям/Общее количество лекций">
                        <DetailsBox>
                            <BeenhereIcon sx={{ marginRight: '4px', width: '20px' }} />{completedLessons[index]}/{totalCountLessons[index]}
                        </DetailsBox>
                      </Tooltip>

                      <Tooltip TransitionComponent={Zoom} placement="top" arrow title="Время прохождения курса">
                        <DetailsBox>
                            <AccessTimeIcon sx={{ marginRight: '4px', width: '20px' }} />{elem.passingTime} месяца(ев)
                        </DetailsBox>
                      </Tooltip>
                    </CourseDetailsContainer>
                  </CardContent>
                </InteractiveCard>
              </Link>
            </Grid>
          ))
        }
      </Grid>
    </>
  )
}

export default Courses