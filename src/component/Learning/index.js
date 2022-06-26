import React, {useEffect, useMemo, useState} from "react";
import styled from "styled-components";
import PageContent from "../../containers/PageContent";
import {backColor, hoverColor, mainColor, textColor2} from "../../constants/colors";
import {secondColor} from "../../constants/colors";
import {Button, CircularProgress} from "@mui/material";
import {doc, getDoc, updateDoc} from "firebase/firestore";
import { db } from '../../firebase'

import courseInfo from "../../externalData/FrontEnd/courseInfo.json"

import Quiz from "../Quiz";
import Layout from "../../hoc/Layout";
import MainPageTitle from "../../containers/MainPageTitle";
import {
  saveUsersAward, saveUsersAwardDB,
  setDoneSectionCells,
  setEmptyPageCells, updateFreelanceAvailableTasks,
  updateLectureProgress, updateQuizProgress,
} from "../../utils/services/learnPageService";
import Loader from "../Loader";
import {createDBArchitecture} from "../../utils/services/createCourseDBArchitecture";
import {useLecturesProgress, useModulesProgress} from "../../utils/services/сalculationService/courseProgress";
import {materialCollection} from "../../data/courseData/index";
import {useSearchParams} from "react-router-dom";
import MenuIcon from '@mui/icons-material/Menu';
import QuizComponent from "../QuizComponent";
import {useDispatch, useSelector} from "react-redux";
import {setCourseData, setFreelanceData, setUserData} from "../../utils/reducers/repoReducer";
import {giveUserAwards} from "../../utils/services";

const SectionsWrapper = styled('div')`
  background: ${mainColor};
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  width: 300px;
  z-index: 200;
  color: white;
  overflow-y: auto;
  padding-bottom: 40px;
  
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

const SectionBurgerButton = styled(`Button`)`
  position: absolute;
  right: 20px;
  top: -15px;
  z-index: 300;
  border: none;
  background: none;
  color: ${props => props.showSectionTab ? 'white' : mainColor}}
`;

const Devider = styled('hr')`
  background-color: #d7d9da;
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
  opacity: ${props => props.disabled ? 0.3 : 1};
  &:hover{
    cursor: pointer;
    background-color: ${hoverColor()};
  }
}
`
const ContentWrapper = styled('div')`
  padding-right: 320px;
  
  @media (max-width: 430px) {
    padding: 0 10px;
  }
`
const PageButtonContainer = styled('div')`
  display: flex;
  margin-bottom: 20px;
`
const ContentTextWrapper = styled('div')`
  
`
const ButtonWrapper = styled('div')`
  margin-top: 20px;
  text-align: center;
`
const PageButton = styled('button')`
  color: #6c757d;
  border: 1px solid #6c757d;
  background: none;
  margin: 0 2px;
  border-radius: 2px;
  width: 30px;
  height: 30px;
  &:hover{
    cursor: pointer;
    background-color: #6c757d;
    color: white;
  }
  &.done{
    background-color: green;
    color: white;
  }
`

const StudyPlatform = () => {
  const { innerWidth: width, innerHeight: height } = window;
  const dispatch = useDispatch()
  const courseData = useSelector(state => state.repos.courseData)
  const userData = useSelector(state => state.repos.userData)
  const freelanceData = useSelector(state => state.repos.freelanceData)

  const [urlParametersId, setUrlParametersId] = useSearchParams();
  const data = materialCollection()[[urlParametersId.get('courseId')]][urlParametersId.get('moduleId')];

  const lessonData = useLecturesProgress(courseData, urlParametersId.get('courseId'), urlParametersId.get('moduleId'))
  const [isUserAuthorized, setIsUserAuthorized] = useState(JSON.parse(localStorage.getItem('st_user_authorized')))
  const [currentSectionId, setCurrentSectionId] = useState(0)
  const [currentPageId, setCurrentPageId] = useState(0)
  const [donePage, setDonePage] = useState(setEmptyPageCells(data))
  const [showSectionTab, setShowSectionTab] = useState(false)

  const isDisabledEndButton = useMemo(() => lessonData.length && Number(lessonData[currentSectionId][currentPageId]), [currentPageId, currentSectionId, lessonData])
  const doneSections = useMemo(() => setDoneSectionCells(lessonData), [lessonData])

  const sectionJsonData = data[currentSectionId];
  const pageData = data[currentSectionId].pageFlow;

  let awardBtnDisabled = useMemo(() => courseData[`course_${urlParametersId.get('courseId')}`] ? courseData[`course_${urlParametersId.get('courseId')}`][`modules`][urlParametersId.get('moduleId')][`lectures`][currentSectionId].isAwardReceived: null, [courseData, currentPageId]);

  const sectionsTitle = data.map((el)=>{
    return el.sectionName
  })

  const pageBtnHandler = (pageId) => {
    setCurrentPageId(pageId)
  }

  const changeCurrentSection = (sectionId) => {
    setCurrentSectionId(sectionId)
    setCurrentPageId(0)
  }

  const openSectionTab = () => setShowSectionTab(prevState => !prevState)

  const setCourseDataHandler = payload => {
    dispatch(setCourseData(payload))
  }

  const setUserDataHandler = payload => {
    dispatch(setUserData(payload))
  }

  const completedPageHandler = async (isGoNextPage) => {
    let newDonePage = donePage.slice();
    newDonePage[currentSectionId][currentPageId] = 1;
    setDonePage(newDonePage)

    if(lessonData[currentSectionId].filter(el => el === '0').length === 1){
      await saveUsersAwardDB(isUserAuthorized, userData, setUserDataHandler, 450, 850)
    }

    if(isGoNextPage) {
      if(currentPageId !== (data[currentSectionId].pageCount-1)){
        setCurrentPageId(prevState => lessonData.length-1 !== prevState ? ++prevState : prevState)
      }else{
        if(courseData[`course_${urlParametersId.get('courseId')}`][`modules`][urlParametersId.get('moduleId')][`lectures`][currentPageId + 1].lectureAvailable){
          setCurrentSectionId(prevState => lessonData.length-1 !== prevState ? ++prevState : prevState)
          setCurrentPageId(0)
        }
      }
    }

    await updateLectureProgress(isUserAuthorized, urlParametersId.get('courseId'), urlParametersId.get('moduleId'), currentSectionId, currentPageId, courseData, setCourseDataHandler)
  }

  const updateTestProgressHandler = async (userAnswers) => await updateQuizProgress(isUserAuthorized, userAnswers, urlParametersId.get('courseId'), urlParametersId.get('moduleId'), currentSectionId, currentPageId, courseData, setCourseDataHandler)

  const saveUserAwardHandler = async (greenCoinCount, expCount, goldCoinCount) => {
    await saveUsersAward(isUserAuthorized, userData, setUserDataHandler, greenCoinCount, expCount, goldCoinCount, urlParametersId.get('courseId'), urlParametersId.get('moduleId'), currentSectionId, setCourseDataHandler)
  }

  const setCompletedStateForPageButton = (index) => {
    let state = 'null'
    if(lessonData[currentSectionId][index] === '1'){
      state = 'done'
    }
    return state
  }

  const isLectureDone = () => lessonData[currentSectionId].find(page => page !== '0')

  useEffect(() => {
    const taskIsAvailable = freelanceData[`course_${urlParametersId.get('courseId')}`] ? freelanceData[`course_${urlParametersId.get('courseId')}`].modules[urlParametersId.get('moduleId')].lectures[currentSectionId]['task_0'].taskAvailable : true;
    if(!taskIsAvailable && isLectureDone()){
      console.log('задачи получена')
      const updatedFreelanceData = updateFreelanceAvailableTasks(isUserAuthorized, urlParametersId.get('courseId'), urlParametersId.get('moduleId'), currentSectionId, dispatch, setFreelanceData);

    }
  }, [courseData, freelanceData, currentSectionId])

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
              <SectionTitle>{courseInfo.courseName}</SectionTitle>
              <Devider />
              {
                sectionsTitle.map((secTitle, index) => {
                  return <SectionButton
                    key={index}
                    sectionDone={doneSections[index] ? secondColor() : null}
                    active={index === currentSectionId ? hoverColor() : null}
                    onClick={changeCurrentSection.bind(this, index)}
                    disabled={courseData[`course_${urlParametersId.get('courseId')}`] ? !courseData[`course_${urlParametersId.get('courseId')}`][`modules`][urlParametersId.get('moduleId')][`lectures`][index].lectureAvailable : true}
                  >
                    {index + 1}. {secTitle}
                  </SectionButton>
                })
              }
            </SectionsWrapper>
            : null
        }
        <ContentWrapper>
          {
            lessonData.length ?
              <>
                <MainPageTitle>{sectionJsonData.sectionName}</MainPageTitle>
                <PageButtonContainer>
                  {
                    sectionJsonData.pageType.map((btnType, index) => {
                      return <PageButton
                        className={setCompletedStateForPageButton(index)}
                        key={index}
                        onClick={pageBtnHandler.bind(this, index)}
                      >
                        {btnType}
                      </PageButton>
                    })
                  }
                </PageButtonContainer>
                <Devider />
                {
                  sectionJsonData.pageType[currentPageId] === 'Т' || sectionJsonData.pageType[currentPageId] === 'К' ?
                    <QuizComponent
                      pageData={pageData[`page${currentPageId+1}`][0]}
                      doneBtnHandler={completedPageHandler}
                      currentPageIsDone={-lessonData[currentSectionId][currentPageId]}
                      updateTestProgressHandler={updateTestProgressHandler}
                      currentQuizAnswers={courseData[`course_${urlParametersId.get('courseId')}`][`modules`][urlParametersId.get('moduleId')][`lectures`][currentSectionId].quizProgress}
                      saveUserAwardHandler={saveUserAwardHandler}
                      awardBtnDisabled={awardBtnDisabled}
                      testBtnDisabled={!courseData[`course_${urlParametersId.get('courseId')}`][`modules`][urlParametersId.get('moduleId')][`lectures`][currentSectionId].lectureAvailable}
                    />
                    :
                    <>
                      {
                        Object.keys(pageData).length > 1 ?
                          <ContentTextWrapper>
                            <PageContent pageData={pageData} currentPageId={currentPageId} currentSectionId={currentSectionId} />
                          </ContentTextWrapper>
                          : null
                      }

                      {
                        courseData[`course_${urlParametersId.get('courseId')}`][`modules`][urlParametersId.get('moduleId')][`lectures`][currentSectionId].lectureAvailable ?
                          <ButtonWrapper>
                            <Button
                              variant="contained"
                              color='success'
                              disabled={isDisabledEndButton}
                              onClick={completedPageHandler}
                            >
                              Завершить
                            </Button>
                          </ButtonWrapper>
                          : null
                      }
                    </>
                }
              </>
            :
              <Loader />
          }
        </ContentWrapper>
      </>
  )
}

export default StudyPlatform