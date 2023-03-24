import React, {useEffect, useState} from "react";
import styled from "styled-components";
import Button from "@mui/material/Button";
import MainPageTitle from "../../../containers/MainPageTitle";
import PageWrapper from "../../../containers/PageWrapper/PageWrapper";
import {Alert, Box, Card, CardContent, CardMedia, Chip, Grid, LinearProgress, Typography} from "@mui/material";
import playerHead from "../../../media/player-head.png";
import GameIcon from "../../../containers/GameIcon/GameIcon";
import {careersRang, coursesData} from "../../../externalData";
import {Link} from "react-router-dom";
import {
  getFullLectureQuestionCount,
  getFullLessonCountInCourse, getFullModuleCountInCourse,
  useAllCoursesProgress,
  useModulesProgress
} from "../../../utils/services/сalculationService/courseProgress";
import {useDispatch, useSelector} from "react-redux";
import GamePointsBadge from "../../GamePointsBadge";
import CustomBadge from "../../CustomBadge";
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import BeenhereIcon from '@mui/icons-material/Beenhere';
import ListAltIcon from '@mui/icons-material/ListAlt';
import Zoom from '@mui/material/Zoom';
import Tooltip from '@mui/material/Tooltip';

import WolfIcon from "../../../media/wolf_photo.png";
import RacoonIcon from "../../../media/racoon_photo.png";
import BearIcon from "../../../media/bear_photo.png";
import FoxIcon from "../../../media/fox_photo.png";
import TigerIcon from "../../../media/tiger_photo.png";
import JuniorIcon from "../../../media/bronze_3.png";
import MiddleIcon from "../../../media/silver_2.png";
import SeniorIcon from "../../../media/gold_1.png";
import {getMaxCourseAward} from "../../../utils/services/ServiceEconomics";
import LinearWithValueLabel from "../../LinearProgressBar";
import {saveUsersAwardDB, updateLectureProgress} from "../../../utils/services/learnPageService";
import {setUserData, setUsersAuthData} from "../../../utils/reducers/repoReducer";
import {doc, getDoc, serverTimestamp, updateDoc} from 'firebase/firestore'
import { Timestamp } from 'firebase/firestore'
import {db} from "../../../firebase";

const InteractiveCard = styled(Card)`
  opacity: ${props => props.disabled ? '0.5' : '1'};
  position: relative;
  &:hover{
    transition: 0.5s;
    box-shadow: 0px 5px 5px -3px rgb(0 0 0 / 20%), 0px 8px 10px 1px rgb(0 0 0 / 14%), 0px 3px 14px 2px rgb(0 0 0 / 12%);
    cursor: pointer;
  }
`;

const UserPhoto = styled('img')`
  width: 200px;
  border: 1px solid transparent;
  margin-right: 20px;

  @media (max-width: 430px) {
    width: 80px;
    height: 80px;
  }
`;

const Text = styled(Typography)`
  @media (max-width: 430px) {
    font-size: 20px!important;
  }
`;

const TypographyMobile = styled(Typography)`
  @media (max-width: 430px) {
    ${props => props.mobileSize ? `font-size: ${props.mobileSize}rem!important;` : null}
  }
`

const AwardStats = styled('div')`
  display: flex;
`;

const CardMediaMobile = styled(CardMedia)`
  @media (max-width: 430px) {
    position: absolute!important;
    width: 100px!important;
    height: 41px!important;
    border-radius: 0 0px 0px 15px!important;
    right: 0!important;
    top: 0!important;
    padding: 0!important;
  }
`;

const DetailsBox = styled('span')`
  display: flex;
  align-items: center;
  font-weight: 500;
  font-size: 14px;
`;

const GridUsefulMobile = styled(Grid)`
  @media (max-width: 430px) {
    flex-direction: column-reverse !important;
    & > div {
      max-width: 100% !important;
    }
  }
`;

const Profile = () => {
  const userData = useSelector(state => state.repos.userData);
  const courseData = useSelector(state => state.repos.courseData);
  const userAuthData = useSelector(state => state.repos.userAuthData);
  const [disableCareerAwardBtn, setDisableCareerAwardBtn] = useState();
  const dispatch = useDispatch();
  const career = [
    { name: 'Junior', salary: 1000, img: JuniorIcon, isActive: true, requirements: null },
    { name: 'Middle', salary: 1800, img: MiddleIcon, isActive: false, requirements: 20000 },
    { name: 'Senior', salary: 2400, img: SeniorIcon, isActive: false, requirements: 50000 },
  ]

  const studiosStats = [
    { name: 'GingerPack', gCoins: 23000 },
    { name: 'ProUnity', gCoins: 21800 },
    { name: 'RockSlaves', gCoins: 12400 },
    { name: 'FutureInc', gCoins: 11500 },
  ]
  const [completedLessons, totalCountLessons] = useAllCoursesProgress(courseData);

  const { innerWidth: width, innerHeight: height } = window;

  const userPhotos = [
    WolfIcon, RacoonIcon, BearIcon, FoxIcon, TigerIcon
  ]

  useEffect(async () => {
    if (userData && userData.careerAccumulatedAmount) {
      const serverDate = Timestamp.fromDate(new Date())
      const currentDate = new Date(serverDate * 1000)
      const awardDate = new Date(userData.careerAwardDate)
      if (awardDate < currentDate) {
        const userDocRef = doc(db, "users", userAuthData.uid);
        await updateDoc(userDocRef, {
          careerAccumulatedAmount: 0,
        });
        dispatch(setUserData({...userData, careerAccumulatedAmount: 0}))
      }
    }
  }, [userData])

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

  function LinearCommandsProgress(props) {
    return (
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Box sx={{ width: '100%', mr: 1 }}>
          <LinearProgress color="secondary" variant="determinate" {...props} />
        </Box>
        <Box style={{ width: '100px' }}>
          <GamePointsBadge count={props.gCoins} pointType="0" small rectangular/>
        </Box>
      </Box>
    );
  }

  const exitProfileHandler = () => {
    localStorage.removeItem('st_user_authorized');
    dispatch(setUsersAuthData(JSON.parse(localStorage.getItem('st_user_authorized'))));
  }

  const interactiveCard = (el, index) =>
    <InteractiveCard disabled={el.disabled}>
      <CardContent sx={{width: '100%'}}>
        <Typography sx={{display: 'flex'}} variant="subtitle1" color="text.secondary" component="div">
          <CardMediaMobile
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

  const setUserDataHandler = payload => {
    dispatch(setUserData(payload))
  }

  const getDailySalary = async (salary) => {
    const userDocRef = doc(db, "users", userAuthData.uid);
    const serverDate = Timestamp.fromDate(new Date())
    const nextDate = new Date(serverDate*1000 + 24 * 3600 * 1000);
    const nextAwardDate = new Date(
      nextDate.getUTCFullYear(),
      nextDate.getMonth(),
      nextDate.getDate(),
      0,
      0,
      0,
    );

    await updateDoc(userDocRef, {
      careerAccumulatedAmount: 1,
      greenCoinAmount: +userData.greenCoinAmount + salary,
      careerAwardDate: nextAwardDate.getTime(),
    });

    const userDataNew = await getDoc(userDocRef);
    if (userDataNew.exists()) {
      dispatch(setUserData(userDataNew.data()))
    } else {
      console.log("No such document!");
    }
  }

  return(
    <>
      <PageWrapper>
        { width <= 500 ? <Button style={{ position: 'relative', left: '78%' }} variant="outlined"  onClick={exitProfileHandler}>Выйти</Button> : null }
        <div style={{display: 'flex', alignItems: 'center', marginBottom: 30 }}>
          <UserPhoto src={userData?.photoIdRef ? userPhotos[userData?.photoIdRef] : userPhotos[0]} alt=""/>
          <Box style={{display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', width: '100%'}}>
            <Box>
              <TypographyMobile mobileSize={1} gutterBottom variant="h5" component="div" color="text.secondary">Разработчик</TypographyMobile>
              <TypographyMobile mobileSize={1.5} gutterBottom variant="h3" component="div">{userData?.firstName} {userData?.lastName}</TypographyMobile>
              <Text sx={{display: 'flex', alignItems: 'center', marginBottom: 3}} color="text.secondary" variant="h5">
                Должность:
                <img style={{ margin: '0 10px', width: 20, height: 20 }} src={career[userData?.careerPosition]?.img} alt=""/>
                <Text color="black" variant="h5">
                  {career[userData?.careerPosition]?.name}
                </Text>
              </Text>
              <AwardStats>
                <Tooltip TransitionComponent={Zoom} placement="top" arrow title="Мой опыт">
                  <DetailsBox style={{ marginRight: '6px' }}>
                    <GamePointsBadge count={Math.floor(userData?.experienceAmount)} pointType="1" rectangular/>
                  </DetailsBox>
                </Tooltip>

                <Tooltip TransitionComponent={Zoom} placement="top" arrow title="Мои GreenCoin">
                  <DetailsBox>
                    <GamePointsBadge count={Math.floor(userData?.greenCoinAmount)} pointType="0" rectangular/>
                  </DetailsBox>
                </Tooltip>
              </AwardStats>
            </Box>
            { width >= 500 ? <Button variant="outlined" onClick={exitProfileHandler}>Выйти</Button> : null }
          </Box>
        </div>
        {/*<Card sx={{marginBottom: 5}}>*/}
        {/*  <CardContent sx={{ width: '100%' }}>*/}
        {/*    <Box sx={{display: 'flex', justifyContent: 'space-around'}}>*/}
        {/*      /!*<Box>*!/*/}
        {/*      /!*  <Text variant="p" color="text.secondary">Опыт:</Text>*!/*/}
        {/*      /!*  <Text variant="h5">*!/*/}
        {/*      /!*    <GameIcon mobileWidth={35} width={80} icon="0" /> {userData?.experienceAmount}*!/*/}
        {/*      /!*  </Text>*!/*/}
        {/*      /!*</Box>*!/*/}
        {/*      /!*<Box>*!/*/}
        {/*      /!*  <Text variant="p" color="text.secondary">GoldCoin:</Text>*!/*/}
        {/*      /!*  <Text variant="h5">*!/*/}
        {/*      /!*    <GameIcon mobileWidth={35} width={80} icon="1" /> {userData?.goldCoinAmount}*!/*/}
        {/*      /!*  </Text>*!/*/}
        {/*      /!*</Box>*!/*/}
        {/*      /!*<Box>*!/*/}
        {/*      /!*  <Text variant="p" color="text.secondary">GreenCoin:</Text>*!/*/}
        {/*      /!*  <Text variant="h5">*!/*/}
        {/*      /!*    <GameIcon mobileWidth={35} width={80} icon="2" /> {userData?.greenCoinAmount}*!/*/}
        {/*      /!*  </Text>*!/*/}
        {/*      /!*</Box>*!/*/}
        {/*    </Box>*/}
        {/*  </CardContent>*/}
        {/*</Card>*/}

        <TypographyMobile mobileSize={1} sx={{marginBottom: 4, textAlign: 'center'}} variant="h5" color="text.secondary">Мои курсы</TypographyMobile>
        <Grid container spacing={2} marginBottom={10}>
          {
            coursesData.map((elem, index) => (
              courseData[`course_${index}`]?.info?.courseAvailable ?
              <Grid item xs={12} key={index}>
                <Link to={`courses/modules?courseId=${index}`} key={index}>
                  <InteractiveCard
                    sx={{ maxWidth: '100%' }}
                  >
                    <div style={{ display: 'flex' }}>
                      <CardMediaMobile
                        component="img"
                        sx={{ width: '268px', padding: '16px', borderRadius: '20px', height: '185' }}
                        image={elem.iconURL}
                      />
                      <CardContent sx={{ flex: '1' }}>
                        <TypographyMobile gutterBottom variant="h6" component="div" fontSize="22px" mobileSize={1}>
                          {elem.name}
                        </TypographyMobile>
                        <TypographyMobile mobileSize={0.7} sx={{ marginTop: '6px'}} variant="body2" color="text.secondary" fontSize="14px" height="52px">
                          {elem.description}
                        </TypographyMobile>
                        <AwardStats>
                          <CustomBadge sx={{ marginRight: '8px' }} message="Награда:" colorType={0} small />
                          <Tooltip TransitionComponent={Zoom} placement="top" arrow title="Награда в виде опыта">
                            <DetailsBox style={{ marginRight: '6px' }}>
                              <GamePointsBadge
                                count={`+${getMaxCourseAward(getFullLessonCountInCourse(courseData[`course_${index}`]), getFullModuleCountInCourse(courseData[`course_${index}`]))[0]}`}
                                pointType="1" small rectangular/>
                            </DetailsBox>
                          </Tooltip>

                          <Tooltip TransitionComponent={Zoom} placement="top" arrow title="Награда в виде GreenCoin">
                            <DetailsBox>
                              <GamePointsBadge
                                count={`+${getMaxCourseAward(getFullLessonCountInCourse(courseData[`course_${index}`]), getFullModuleCountInCourse(courseData[`course_${index}`]))[1]}`}
                                pointType="0" small rectangular/>
                            </DetailsBox>
                          </Tooltip>
                        </AwardStats>
                        {/*<CustomBadge sx={{ marginRight: '8px' }} message="Сложность:" colorType={0} small />*/}
                        {/*<CustomBadge sx={{ marginRight: '8px' }} message="легко" colorType={1} small />*/}

                        <div style={{ display: 'flex', marginTop: '10px', alignItems: 'center' }}>
                          <Tooltip TransitionComponent={Zoom} placement="top" arrow title="Количество лекций">
                            <BeenhereIcon sx={{ marginRight: '4px', width: '20px' }} />
                          </Tooltip>
                            <Box sx={{width: '100%'}}>
                              <LinearProgressWithLabel
                                value={Math.round(completedLessons[index]/totalCountLessons[index]*100)}
                                totalCountLessons={totalCountLessons}
                                completedLessons={completedLessons}
                                index={index}
                              />
                            </Box>
                        </div>
                      </CardContent>
                    </div>
                  </InteractiveCard>
                </Link>
              </Grid>
                : null
            ))
          }
          {
            !Object.values(courseData).find(el => el?.info?.courseAvailable) ?
              <div style={{ maxWidth: '625px', margin: 'auto' }}>
                <Alert variant="outlined" severity="info" sx={{ marginTop: '20px', display: 'flex' }}>Совсем скоро преподаватель откроет доступ к лекциям и здесь появится твой первый курс!</Alert>
              </div>
              : null
          }
        </Grid>

        <TypographyMobile mobileSize={1} sx={{marginBottom: 4, textAlign: 'center'}} variant="h5" color="text.secondary">Полезное</TypographyMobile>
        <GridUsefulMobile container spacing={2} marginBottom={4}>
          <Grid item xs={8} key="0">
            <Card style={{ padding: '10px', height: '100%' }}>
              <TypographyMobile mobileSize={1} sx={{marginBottom: 4, textAlign: 'center'}} variant="h5" color="text.secondary">Результаты студий</TypographyMobile>
              <div>
                {
                  studiosStats.map((el, index) => (
                    <div style={{ marginBottom: '28px' }} key={index}>
                      <TypographyMobile variant="h5" color="text.secondary" fontSize={18} marginBottom={1}>
                        {index+1}. Студия: "{el.name}"
                      </TypographyMobile>
                      <Box sx={{width: '100%'}}>
                        <LinearCommandsProgress
                          value={el.gCoins / 1000}
                          gCoins={el.gCoins}
                          index={0}
                        />
                      </Box>
                    </div>
                  ))
                }
              </div>
            </Card>
          </Grid>
          <Grid item xs={4} key="0" textAlign="center">
            {
              career.map((el, index) => (
                <Grid item xs={12} marginBottom={2}  key={index}>
                  <Card style={{ padding: '10px', display: 'flex', alignItems: 'center' }}>
                    <img style={{ marginRight: 10 }} src={el.img} alt=""/>
                    <div>
                      <TypographyMobile variant="h3" fontSize="30px" component="div">{index+1}. {el.name}</TypographyMobile>
                      <TypographyMobile variant="p" color="text.secondary" fontSize="14px">+{el.salary} GCoin</TypographyMobile>
                    </div>
                  </Card>
                </Grid>
              ))
            }
            <Button
              variant="contained"
              color='success'
              size="large"
              disabled={!(userData && userData.careerAccumulatedAmount === 0)}
              onClick={() => userData && getDailySalary(career[userData?.careerPosition]?.salary)}
            >
              Получить +{userData && career[userData?.careerPosition]?.salary} GCoin
            </Button>
            <TypographyMobile mobileSize={0.5} sx={{ marginTop: '6px', fontSize: '10px'}} variant="body2" color="text.secondary">
              Получить следующую награду можно после 00:00
            </TypographyMobile>
          </Grid>
        </GridUsefulMobile>
      </PageWrapper>
    </>
  )
}

export default Profile