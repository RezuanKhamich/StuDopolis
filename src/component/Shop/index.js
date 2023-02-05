import React, {useState} from "react";
import {hoverColor, mainColor, secondColor, textColor2} from "../../constants/colors";
import styled from "styled-components";
import {coursesData} from "../../externalData";
import MainPageTitle from "../../containers/MainPageTitle";
import {
  Alert,
  Box,
  Card,
  CardContent,
  CardMedia,
  Grid,
  ToggleButton,
  ToggleButtonGroup,
  Typography
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import {Link} from "react-router-dom";
import CustomBadge from "../CustomBadge";
import Tooltip from "@mui/material/Tooltip";
import Zoom from "@mui/material/Zoom";
import GamePointsBadge from "../GamePointsBadge";
import {getMaxCourseAward} from "../../utils/services/ServiceEconomics";
import {
  getFullLessonCountInCourse,
  getFullModuleCountInCourse
} from "../../utils/services/сalculationService/courseProgress";
import BeenhereIcon from "@mui/icons-material/Beenhere";
import Button from "@mui/material/Button";
import item_1 from "../../media/csharp_module.png";
import item_2 from "../../media/asset.png";
import item_3 from "../../media/apk.png";
import item_4 from "../../media/unity_ai.png";
import {useDispatch, useSelector} from "react-redux";
import Loader from "../Loader";
import {doc, getDoc, updateDoc} from "firebase/firestore";
import {db} from "../../firebase";
import {setShopData, setUserData} from "../../utils/reducers/repoReducer";

const SectionsWrapper = styled('div')`
  background: ${mainColor};
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  width: 300px;
  z-index: 200;
  color: white;
`
const ToogleWrapper = styled(ToggleButtonGroup)( () =>({
  display: 'block!important',
  textAlign: 'center',
}));
const SectionTitle = styled('h1')`
  text-align: center;
  font-size: 20px;
  padding: 5px;
  margin: 20px 0;
`
const Devider = styled('hr')`
  background-color: #6c757d;
  height: 1px;
  border: none;
  margin: 0;
`

const SectionBurgerButton = styled(`Button`)`
  position: absolute;
  right: 20px;
  top: -15px;
  z-index: 300;
  border: none;
  background: none;
  color: ${props => props.showSectionTab ? 'white' : mainColor}}
`;
const SectionButton = styled('button')`
  border: none;
  background: ${props => props.active || "none"};
  color: white;
  width: 100%;
  text-align: left;
  padding: 5px;
  font-size: 14px;
  border-bottom: 1px solid ${props => props.sectionDone || textColor2()};
  padding-top: 10px;
  &:hover{
    cursor: pointer;
    background-color: ${hoverColor()};
  }
`
const ContentWrapper = styled('div')`
  padding-right: 320px;

  @media (max-width: 430px) {
    padding: 0 10px;
  }
`

const TypographyMobile = styled(Typography)`
  @media (max-width: 430px) {
    ${props => props.mobileSize ? `font-size: ${props.mobileSize}rem!important;` : null}
  }
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

const Shop = () => {
  const { innerWidth: width, innerHeight: height } = window;
  const [currentCourseId, setCurrentCourseId] = useState(0);
  const [showSectionTab, setShowSectionTab] = useState(false)
  const dispatch = useDispatch();
  const shopData = useSelector(state => state.repos.shopData);
  const userData = useSelector(state => state.repos.userData)
  const [isUserAuthorized, setIsUserAuthorized] = useState(JSON.parse(localStorage.getItem('st_user_authorized')))

  const tableHeaders = [
    {title: 'Заказы', isDoneTask: false},
    {title: 'Выполнено', isDoneTask: true},
    {title: 'Приобретено', isDoneTask: true},
  ]

  const shopItems = [
    {name: 'Игра: RocketC', img: item_3, price: 4900},
    {name: 'Продвинутый курс по C#', img: item_1, price: 43000},
    {name: 'Ассет для 2D игры', img: item_2, price: 9700},
    {name: 'Курс по Unity AI', img: item_4, price: 28800},
  ]

  const [alignment, setAlignment] = useState(tableHeaders[0]);

  const openSectionTab = () => setShowSectionTab(prevState => !prevState)

  const changeCurrentSection = (sectionId) => {
    setAlignment(tableHeaders[0]);
    setCurrentCourseId(sectionId)
  }

  const shopFilterChange = (event, newAlignment) => {
    if(newAlignment) {
      setAlignment(tableHeaders.find(el => el.title === newAlignment));
    }
  };

  const buyItem = async (index) => {
    const shopDocRef = doc(db, "shop", isUserAuthorized.uid);
    const userDocRef = doc(db, "users", isUserAuthorized.uid);

    let currentGreenCoinCount = userData.greenCoinAmount - shopData.items[index].price;

    await updateDoc(userDocRef, {
      greenCoinAmount: currentGreenCoinCount,
    });

    const tempShopdata = {...shopData}
    tempShopdata.items[index].isSold = true;

    await updateDoc(shopDocRef, {
      items: {
        ...tempShopdata.items
      },
    });
    dispatch(setUserData({ ...userData, greenCoinAmount: currentGreenCoinCount }))
    dispatch(setShopData({ ...tempShopdata }))
  }


  //   let currentQuizProgress = freelanceData[`course_${courseId}`][`modules`][moduleId][`lectures`][lectureId][`task_${taskId}`].taskProgress.split('')
  //   userAnswers.forEach((elem, index) => {
  //     currentQuizProgress[index] = elem
  //   })
  //   let resultPageProgress = currentQuizProgress.join('')
  //
  //   await updateDoc(freelanceDocRef, {
  //     [`course_${courseId}.modules.${moduleId}.lectures.${lectureId}.task_${taskId}.taskProgress`]: `${resultPageProgress}`,
  //   });
  //
  //   const freelanceDataNew = await getDoc(freelanceDocRef);
  //   if (freelanceDataNew.exists()) {
  //     setFreelanceData(freelanceDataNew.data())
  //   } else {
  //     console.log("No such document!");
  //   }
  // }

  return(
    <>
      {
        width <= 500 ?
          <SectionBurgerButton onClick={openSectionTab} showSectionTab={showSectionTab}>
            <MenuIcon/>
          </SectionBurgerButton>
          : null
      }
      {
        width >= 500 || showSectionTab ?
          <SectionsWrapper>
            <SectionTitle>Направления</SectionTitle>
            <Devider />
            {
              coursesData.map((course, index) =>
                <SectionButton
                  key={index}
                  sectionDone={course[index] ? secondColor() : null}
                  active={index === currentCourseId ? hoverColor() : null}
                  onClick={changeCurrentSection.bind(this, index)}
                >
                  {index + 1}. {course.name}
                </SectionButton>
              )
            }
          </SectionsWrapper>
          : null
      }
      <ContentWrapper>
        <MainPageTitle>G-Pay</MainPageTitle>
        <ToogleWrapper
          color="success"
          value={alignment.title}
          exclusive
          onChange={shopFilterChange}
        >
          <ToggleButton value="Заказы">Все</ToggleButton>
          <ToggleButton value="Выполнено">Доступные</ToggleButton>
          <ToggleButton value="Приобретено">Приобретенные</ToggleButton>
        </ToogleWrapper>
        {/*<div style={{ maxWidth: '980px', margin: 'auto' }}>*/}
          <Grid container spacing={2} marginBottom={10} marginTop={4}>
            {
              shopData?.items ? shopItems.map((el, index) => (
                <Grid item xs={6} key={index}>
                  <Card disabled={shopData.items[index].isAvailable}>
                    <div style={{ display: 'flex' }}>
                      <CardMediaMobile
                        component="img"
                        sx={{ width: '268px', padding: '16px', borderRadius: '20px', height: '185px' }}
                        image={el.img}
                        disabled={shopData.items[index].isAvailable}
                      />
                      <CardContent sx={{ flex: '1' }}>
                        <TypographyMobile gutterBottom variant="h6" component="div" fontSize="18px" mobileSize={1}>
                          {el.name}
                        </TypographyMobile>
                        {/*<TypographyMobile mobileSize={0.7} sx={{ marginTop: '6px'}} variant="body2" color="text.secondary" fontSize="14px" height="52px">*/}
                        {/*  asd*/}
                        {/*</TypographyMobile>*/}
                        <Button
                          variant="contained"
                          color='success'
                          size="large"
                          onClick={() => buyItem(index)}
                          disabled={!shopData.items[index].isAvailable || userData.greenCoinAmount < shopData.items[index].price}
                        >
                          { shopData.items[index].isSold ? 'Куплено' : `${el.price} GCoin` }

                        </Button>
                        {
                          shopData.items[index].isSold ?
                            <a style={{ display: 'block', marginTop: '20px' }} href="https://drive.google.com/file/d/1zze3OO4UKy6x7wgol3OU8_lCTqEDeey-/view?usp=sharing">Скачать игру</a> : null
                        }
                      </CardContent>
                    </div>
                  </Card>
                </Grid>
              )) : <Loader/>
            }
          </Grid>
          {/*<Alert variant="outlined" severity="info" sx={{ marginTop: '20px' }}>Приобретай за GreenCoins новые проекты и особые фриланс задачи!</Alert>*/}
        {/*</div>*/}
      </ContentWrapper>
    </>
  )
}

export default Shop;