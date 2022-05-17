import React, {useEffect, useState} from "react";
import styled from "styled-components";
import Button from "@mui/material/Button";
import MainPageTitle from "../../../containers/MainPageTitle";
import PageWrapper from "../../../containers/PageWrapper/PageWrapper";
import {Box, Card, CardContent, CardMedia, Chip, Grid, LinearProgress, Typography} from "@mui/material";
import playerHead from "../../../media/player-head.png";
import GameIcon from "../../../containers/GameIcon/GameIcon";
import {careersRang, coursesData} from "../../../externalData";
import {Link} from "react-router-dom";
import {useAllCoursesProgress} from "../../../utils/services/сalculationService/courseProgress";
import {useSelector} from "react-redux";

const InteractiveCard = styled(Card)`
  opacity: ${props => props.disabled ? '0.5' : '1'};
  &:hover{
    transition: 0.5s;
    box-shadow: 0px 5px 5px -3px rgb(0 0 0 / 20%), 0px 8px 10px 1px rgb(0 0 0 / 14%), 0px 3px 14px 2px rgb(0 0 0 / 12%);
    cursor: pointer;
  }
`;

const UserPhoto = styled('img')`
  width: 200px;
  border: 1px solid transparent;
  border-radius: 50%;
  margin-right: 20px;

  @media (max-width: 430px) {
    width: 80px;
  }
`;

const Text = styled(Typography)`
  @media (max-width: 430px) {
    font-size: 20px!important;
  }
`;

const Profile = ({setIsUserAuthorized}) => {
  const userData = useSelector(state => state.repos.userData)
  const courseData = useSelector(state => state.repos.courseData)

  const [completedLessons, totalCountLessons] = useAllCoursesProgress(courseData);
  const { innerWidth: width, innerHeight: height } = window;

  const [progress, setProgress] = useState(10);

  function LinearProgressWithLabel(props) {
    const completedLessons = props.completedLessons[props.index];
    const totalCountLessons = props.totalCountLessons[props.index];

    return (
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Box sx={{ width: '100%', mr: 1 }}>
          <LinearProgress color="secondary" variant="determinate" {...props} />
        </Box>
        <Box sx={{ minWidth: 35 }}>
          <Typography variant="body2" color="text.secondary">
            {`${completedLessons || '0'}/${totalCountLessons || '0'}`}
          </Typography>
        </Box>
      </Box>
    );
  }
  const exitProfileHandler = () => {
    localStorage.removeItem('st_user_authorized');
    setIsUserAuthorized(localStorage.getItem('st_user_authorized'))
  }

  const interactiveCard = (el, index) =>
    <InteractiveCard disabled={el.disabled}>
      <CardContent sx={{width: '100%'}}>
        <Typography sx={{display: 'flex'}} variant="subtitle1" color="text.secondary" component="div">
          <CardMedia
            component="img"
            sx={{width: 50, marginRight: 1}}
            image={el.iconURL}
            alt="Live from space album cover"
          />{el.name}
        </Typography>
        <Box sx={{width: '100%'}}>
          <LinearProgressWithLabel
            value={Math.round(completedLessons[index]/totalCountLessons[index]*100)}
            totalCountLessons={totalCountLessons}
            completedLessons={completedLessons}
            index={index}
          />
        </Box>
      </CardContent>
    </InteractiveCard>

  return(
    <>
      <PageWrapper>
        { width <= 500 ? <Button style={{ position: 'relative', left: '78%' }} variant="outlined"  onClick={exitProfileHandler}>Выйти</Button> : null }

        <div style={{display: 'flex', alignItems: 'center', marginBottom: 20 }}>
          <UserPhoto src={playerHead} alt=""/>
          <Box style={{display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', width: '100%'}}>
            <Box>
              <Text sx={{fontSize: '32px!important'}} variant="h3">{userData?.firstName} {userData?.lastName}</Text>
              <Text sx={{display: 'flex', marginBottom: 3}} color="text.secondary" variant="h5">
                Должность:
                <Text sx={{marginLeft: 1 }} color="black" variant="h5">{careersRang[userData?.careerPosition]?.vacancy}</Text>
              </Text>
            </Box>
            { width >= 500 ? <Button variant="outlined" onClick={exitProfileHandler}>Выйти</Button> : null }
          </Box>
        </div>
        <Card sx={{marginBottom: 5}}>
          <CardContent sx={{ width: '100%' }}>
            <Box sx={{display: 'flex', justifyContent: 'space-around'}}>
              <Box>
                <Text variant="p" color="text.secondary">Опыт:</Text>
                <Text variant="h5">
                  <GameIcon mobileWidth={35} width={80} icon="0" /> {userData?.experienceAmount}
                </Text>
              </Box>
              {/*<Box>*/}
              {/*  <Text variant="p" color="text.secondary">GoldCoin:</Text>*/}
              {/*  <Text variant="h5">*/}
              {/*    <GameIcon mobileWidth={35} width={80} icon="1" /> {userData?.goldCoinAmount}*/}
              {/*  </Text>*/}
              {/*</Box>*/}
              <Box>
                <Text variant="p" color="text.secondary">GreenCoin:</Text>
                <Text variant="h5">
                  <GameIcon mobileWidth={35} width={80} icon="2" /> {userData?.greenCoinAmount}
                </Text>
              </Box>
            </Box>
          </CardContent>
        </Card>
        <Typography sx={{marginBottom: 2, textAlign: 'center'}} variant="h5" color="text.secondary">Мои курсы</Typography>
        <Grid container spacing={2}>
          {
            coursesData.map((el, index) => (
              <Grid item md={6} sx={{width: '100%'}} key={index}>
                <Link to={!el.disabled ? "courses/modules" : "" }>
                  {interactiveCard(el, index)}
                </Link>
              </Grid>
            ))
          }
        </Grid>
      </PageWrapper>
    </>
  )
}

export default Profile