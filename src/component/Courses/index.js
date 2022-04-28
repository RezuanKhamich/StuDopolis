import React, {useEffect} from "react";
import {Link} from "react-router-dom";
import MainPageTitle from "../../containers/MainPageTitle";
import {Card, CardActions, CardContent, CardMedia, Grid, Typography} from "@mui/material";
import Button from '@mui/material/Button';
import styled from "styled-components";
import {coursesData} from "../../externalData";
import {
  getCourseProgress, useAllCoursesProgress,
  useCourseProgress,
  useModuleProgress
} from "../../utils/services/сalculationService/courseProgress";

const InteractiveCard = styled(Card)`
  opacity: ${props => props.disabled ? '0.5' : '1'};
  max-width: 345px;
  height: 380px;
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

const Courses = ({courseData}) => {
  const { innerWidth: width, innerHeight: height } = window;
  const [completedLessons, totalCountLessons] = useAllCoursesProgress(courseData)

  return (
    <>
      <MainPageTitle>Выбери направление</MainPageTitle>

      <Grid style={{maxWidth: 1190, margin: "auto"}} container rowSpacing={5} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        {
          coursesData.map((elem, index) => (
            <Grid item xs={ width > 500 ? 4 : 12 } key={index}>
              <InteractiveCard disabled={elem.disabled}>
                <CardMedia
                  component="img"
                  height={ width > 500 ? 200 : 150 }
                  image={elem.iconURL}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {elem.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {/*{elem.description}*/}
                    Прогресс {completedLessons[index]}/{totalCountLessons[index]}
                  </Typography>
                </CardContent>
                <CardActions style={{textAlign: 'center', position: 'absolute', bottom: 0, right: 0}}>
                  {
                    !elem.disabled ?
                      <Link to="modules">
                        <Button size="small">Смотреть</Button>
                      </Link>
                      :
                      <Button size="small" disabled>Смотреть</Button>
                  }
                </CardActions>
              </InteractiveCard>
            </Grid>
          ))
        }
      </Grid>
    </>
  )
}

export default Courses