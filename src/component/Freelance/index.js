import React, {useState} from "react";
import MainPageTitle from "../../containers/MainPageTitle";
import {hoverColor, mainColor, secondColor, textColor2} from "../../constants/colors";
import styled from "styled-components";
import {
  Alert,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Chip,
  Grid,
  ToggleButton,
  ToggleButtonGroup,
  Typography
} from "@mui/material";
import {Link} from "react-router-dom";
import Button from "@mui/material/Button";
import {coursesData} from "../../externalData";
import GameIcon from "../../containers/GameIcon/GameIcon";
import Tooltip from "@mui/material/Tooltip";
import Zoom from "@mui/material/Zoom";
import GamePointsBadge from "../GamePointsBadge";
import CustomBadge from "../CustomBadge";
import {useSelector} from "react-redux";
import _ from 'lodash';
import {materialCollection} from "../../data/courseData/index";
import MenuIcon from "@mui/icons-material/Menu";
import courseInfo from "../../externalData/FrontEnd/courseInfo.json";
import {serviceEconomics} from "../../utils/services/ServiceEconomics";

const ToogleWrapper = styled(ToggleButtonGroup)( () =>({
  display: 'block!important',
  textAlign: 'center',
}));

const SectionsWrapper = styled('div')`
  background: ${mainColor};
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  width: 300px;
  z-index: 200;
  color: white;

  &::-webkit-scrollbar {
    width: 0.4em;
    background-color: #C4C4C4;
  }
  &::-webkit-scrollbar-track {
    box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.00);
    webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.00);
  };
  &::-webkit-scrollbar-thumb {
    border: 1px solid rgba(136, 136, 136, 0.5);
    border-radius: 20px;
  }
`
const SectionTitle = styled('h1')`
  text-align: center;
  font-size: 20px;
  padding: 5px;
  margin: 20px 0;
  @media (max-width: 430px) {
    margin: 50px 0 20px 0;
  }
`
const Devider = styled('hr')`
  background-color: #6c757d;
  height: 1px;
  border: none;
  margin: 0;
`
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

const InteractiveCard = styled(Card)`
  position: relative;
  &:hover{
    transition: 0.5s;
    box-shadow: 0px 5px 5px -3px rgb(0 0 0 / 20%), 0px 8px 10px 1px rgb(0 0 0 / 14%), 0px 3px 14px 2px rgb(0 0 0 / 12%);
    cursor: pointer;
  }
`;

const TypographyMobile = styled(Typography)`
  @media (max-width: 430px) {
    ${props => props.mobileSize ? `font-size: ${props.mobileSize}rem!important;` : null}
  }
`

const AwardStats = styled('div')`
  padding: 16px;
  display: flex;

  @media (max-width: 430px) {
    padding: 8px;
  }
`;

const DetailsBox = styled('span')`
  display: flex;
  align-items: center;
  font-weight: 500;
  font-size: 14px;
`;

const SectionBurgerButton = styled(`Button`)`
  position: absolute;
  right: 20px;
  top: -15px;
  z-index: 300;
  border: none;
  background: none;
  color: ${props => props.showSectionTab ? 'white' : mainColor}}
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

const Freelance = () => {
  const { innerWidth: width, innerHeight: height } = window;
  const courseData = useSelector(state => state.repos.courseData)
  const freelanceData = useSelector(state => state.repos.freelanceData)
  const [currentCourseId, setCurrentCourseId] = useState(0);
  const [showSectionTab, setShowSectionTab] = useState(false)

  const tableHeaders = [
    {title: 'Заказы', isDoneTask: false},
    {title: 'Выполнено', isDoneTask: true},
  ]

  const [alignment, setAlignment] = useState(tableHeaders[0]);

  const freelanceFilterChange = (event, newAlignment) => {
    if(newAlignment) {
      setAlignment(tableHeaders.find(el => el.title === newAlignment));
    }
  };

  const openSectionTab = () => setShowSectionTab(prevState => !prevState)

  const getAvailableTasks = (courseId) => {
    const availableTasks = [];

    if(freelanceData[`course_${courseId}`]){
      const modulesData = freelanceData[`course_${courseId}`].modules

      for(let moduleId in modulesData) {
        for(let lectureId in modulesData[moduleId].lectures){
          const data = modulesData[moduleId].lectures[lectureId];
          const firstTaskIsDone = alignment.isDoneTask ? data['task_0'].isAwardReceived : !data['task_0'].isAwardReceived
          const secondTaskIsDone = alignment.isDoneTask ? data['task_1'].isAwardReceived : !data['task_1'].isAwardReceived

          if(data['task_0'].taskAvailable && firstTaskIsDone){
            availableTasks.push({courseId: courseId, moduleId: moduleId, lectureId: lectureId, taskId: 0, data: data[`task_0`]})
          }
          if(data['task_1'].taskAvailable && secondTaskIsDone){
            availableTasks.push({courseId: courseId, moduleId: moduleId, lectureId: lectureId, taskId: 1, data: data[`task_1`]})
          }
        }
      }
    }

    return availableTasks
  }

  const changeCurrentSection = (sectionId) => {
    setAlignment(tableHeaders[0]);
    setCurrentCourseId(sectionId)
  }

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
            <SectionTitle>Доступные направления</SectionTitle>
            <Devider />
            {
              coursesData.map((course, index) =>
                courseData[`course_${index}`]?.info?.courseAvailable ?
                  <SectionButton
                    key={index}
                    sectionDone={course[index] ? secondColor() : null}
                    active={index === currentCourseId ? hoverColor() : null}
                    onClick={changeCurrentSection.bind(this, index)}
                  >
                    {index + 1}. {course.name}
                  </SectionButton>
                  : null
              )
            }
          </SectionsWrapper>
          : null
      }
      <ContentWrapper>
        <MainPageTitle>Мой фриланс</MainPageTitle>
        <ToogleWrapper
          color="success"
          value={alignment.title}
          exclusive
          onChange={freelanceFilterChange}
        >
          <ToggleButton value="Заказы">Заказы</ToggleButton>
          <ToggleButton value="Выполнено">Выполнено</ToggleButton>
        </ToogleWrapper>
        <Grid style={{maxWidth: 1190, margin: "auto"}} container rowSpacing={5} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          {
            getAvailableTasks(currentCourseId).map((elem, index) => {
              const externalData = materialCollection()[elem.courseId][elem.moduleId][elem.lectureId].freelanceTasks[elem.taskId]

              return (
                <Grid item xs={ width > 500 ? 6 : 12 } key={index}>
                  <Link to={`task?courseId=${elem.courseId}&moduleId=${elem.moduleId}&lectureId=${elem.lectureId}&taskId=${elem.taskId}`} key={index}>
                    <InteractiveCard
                      sx={{maxWidth: 520}}
                    >
                      <div style={{display: 'flex', justifyContent: 'space-between'}}>
                        <AwardStats>
                          <Tooltip TransitionComponent={Zoom} placement="top" arrow title="Награда в виде опыта">
                            <DetailsBox style={{marginRight: '6px'}}>
                              <GamePointsBadge count={`+${elem.data.difficult === 0 ? serviceEconomics().easyFreelanceTaskDone.exp : serviceEconomics().hardFreelanceTaskDone.exp}`} pointType="1" small rectangular/>
                            </DetailsBox>
                          </Tooltip>

                          <Tooltip TransitionComponent={Zoom} placement="top" arrow title="Награда в виде GreenCoin">
                            <DetailsBox>
                              <GamePointsBadge count={`+${elem.data.difficult === 0 ? serviceEconomics().easyFreelanceTaskDone.greenCoin : serviceEconomics().hardFreelanceTaskDone.greenCoin}`} pointType="0" small rectangular/>
                            </DetailsBox>
                          </Tooltip>
                        </AwardStats>

                        <CardMediaMobile
                          component="img"
                          height="50"
                          sx={{
                            width: '280px',
                            marginLeft: 'auto',
                            borderBottomLeftRadius: '11px',
                          }}
                          image={coursesData[elem.courseId].iconURL}
                        />
                      </div>

                      <CardContent sx={{padding: width >= 500 ? '6px 16px 0 16px' : '10px!important'}}>
                        <TypographyMobile gutterBottom variant="h6" component="div" fontSize="18px" mobileSize={0.7}>
                          {externalData.mainTitle.length > 48 ? `${externalData.mainTitle.slice(0, 48)}...` : externalData.mainTitle}
                        </TypographyMobile>
                        <CustomBadge sx={{marginRight: '8px'}} message="Сложность:" colorType={0} small/>
                        {
                          elem.data.difficult === 0 ?
                            <CustomBadge sx={{marginRight: '8px'}} message="легко" colorType={1} small/>
                            :
                            <CustomBadge sx={{ marginRight: '8px' }} message="сложно" colorType={2} small />
                        }
                        {/*<CustomBadge sx={{ marginRight: '8px' }} message="очень сложно" colorType={3} small />*/}
                        <TypographyMobile sx={{marginTop: '6px'}} variant="body2" color="text.secondary" fontSize="14px"
                                    height="52px" mobileSize={0.6}>
                          {externalData.description}
                        </TypographyMobile>
                      </CardContent>
                      {/*<CardActions style={{textAlign: 'center', position: 'absolute', bottom: 0, right: 0}}>*/}
                      {/*  {*/}
                      {/*    !elem.disabled ?*/}
                      {/*      <Link to="modules">*/}
                      {/*        <Button size="small">Выполнить</Button>*/}
                      {/*      </Link>*/}
                      {/*      :*/}
                      {/*      <Button size="small" disabled>Выполнить</Button>*/}
                      {/*  }*/}

                      {/*</CardActions>*/}
                    </InteractiveCard>
                  </Link>
                </Grid>
              )
            })
          }
          {
            !getAvailableTasks(currentCourseId).length ?
              <div style={{ maxWidth: '670px', margin: 'auto' }}>
                <Alert variant="outlined" severity="info" sx={{ marginTop: '20px', display: 'flex' }}>Доступных фриланс-задач нет. Заверши лекцию и получи 2 задачи!</Alert>
              </div>
            : null
          }
        </Grid>
      </ContentWrapper>
    </>
  )
}

export default Freelance