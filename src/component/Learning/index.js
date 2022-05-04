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
  saveUsersAward,
  setDoneSectionCells,
  setEmptyPageCells,
  updateLectureProgress, updateQuizProgress,
} from "../../utils/services/learnPageService";
import Loader from "../Loader";
import {createDBArchitecture} from "../../utils/services/createCourseDBArchitecture";
import {useLecturesProgress} from "../../utils/services/сalculationService/courseProgress";
import {courseMaterials} from "../../data/courseData/FrontEnd";
import {useSearchParams} from "react-router-dom";
import MenuIcon from '@mui/icons-material/Menu';
import QuizComponent from "../QuizComponent";

const SectionsWrapper = styled('div')`
  background: ${mainColor};
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  width: 300px;
  z-index: 250;
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
  font-size: 16px;
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

const StudyPlatform = ({courseData, setCourseData, userData, setUserData}) => {
  const { innerWidth: width, innerHeight: height } = window;

  const [currentModuleId, setCurrentModuleId] = useSearchParams();
  const data = courseMaterials()[currentModuleId.get('id')];

  const lessonData = useLecturesProgress(courseData, 0, currentModuleId.get('id'))
  const [isUserAuthorized, setIsUserAuthorized] = useState(JSON.parse(localStorage.getItem('st_user_authorized')))
  const [currentSectionId, setCurrentSectionId] = useState(0)
  const [currentPageId, setCurrentPageId] = useState(0)
  const [donePage, setDonePage] = useState(setEmptyPageCells(data))
  const [showSectionTab, setShowSectionTab] = useState(false)

  const isDisabledEndButton = useMemo(() => lessonData.length && Number(lessonData[currentSectionId][currentPageId]), [currentPageId, currentSectionId, lessonData])
  const doneSections = useMemo(() => setDoneSectionCells(lessonData), [lessonData])

  const sectionJsonData = data[currentSectionId];
  const pageData = data[currentSectionId].pageFlow;
  let awardBtnDisabled = useMemo(() => courseData ? courseData[`course_${0}`][`modules`][`module_${0}`][`lectures`][`lecture_${currentPageId}`].isAwardReceived : null, [courseData])

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

  const completedPageHandler = async (isGoNextPage) => {
    let newDonePage = donePage.slice();
    newDonePage[currentSectionId][currentPageId] = 1;
    setDonePage(newDonePage)

    if(isGoNextPage) {
      if(currentPageId !== (data[currentSectionId].pageCount-1)){
        setCurrentPageId(prevState => lessonData.length-1 !== prevState ? ++prevState : prevState)
      }else{
        if(courseData[`course_${0}`][`modules`][`module_${0}`][`lectures`][`lecture_${currentPageId + 1}`].lectureAvailable){
          setCurrentSectionId(prevState => lessonData.length-1 !== prevState ? ++prevState : prevState)
          setCurrentPageId(0)
        }
      }
    }

    await updateLectureProgress(isUserAuthorized, 0, currentModuleId.get('id'), currentSectionId, currentPageId, courseData, setCourseData)
  }

  const updateTestProgressHandler = async (userAnswers) => await updateQuizProgress(isUserAuthorized, userAnswers, 0, currentModuleId.get('id'), currentSectionId, currentPageId, courseData, setCourseData)

  const saveUserAwardHandler = async (greenCoinCount, expCount, goldCoinCount) => {
    await saveUsersAward(isUserAuthorized, userData, setUserData, greenCoinCount, expCount, goldCoinCount, 0, currentModuleId.get('id'), currentSectionId, setCourseData)
  }

  const setCompletedStateForPageButton = (index) => {
    let state = 'null'
    if(lessonData[currentSectionId][index] === '1'){
      state = 'done'
    }
    return state
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
              <SectionTitle>{courseInfo.courseName}</SectionTitle>
              <Devider />
              {
                sectionsTitle.map((secTitle, index) => {
                  return <SectionButton
                    key={index}
                    sectionDone={doneSections[index] ? secondColor() : null}
                    active={index === currentSectionId ? hoverColor() : null}
                    onClick={changeCurrentSection.bind(this, index)}
                    disabled={courseData ? !courseData[`course_${0}`][`modules`][`module_${currentModuleId.get('id')}`][`lectures`][`lecture_${index}`].lectureAvailable : true}
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
                  sectionJsonData.pageType[currentPageId] === 'Т' ?
                    <QuizComponent
                      pageData={pageData[`page${currentPageId+1}`][0]}
                      doneBtnHandler={completedPageHandler}
                      currentPageIsDone={-lessonData[currentSectionId][currentPageId]}
                      updateTestProgressHandler={updateTestProgressHandler}
                      currentQuizAnswers={courseData[`course_${0}`][`modules`][`module_${0}`][`lectures`][`lecture_${currentSectionId}`].quizProgress}
                      saveUserAwardHandler={saveUserAwardHandler}
                      awardBtnDisabled={awardBtnDisabled}
                    />
                    :
                    <>
                      <ContentTextWrapper>
                        <PageContent pageData={pageData} currentPageId={currentPageId} currentSectionId={currentSectionId} />
                      </ContentTextWrapper>
                      {
                        courseData[`course_${0}`][`modules`][`module_${currentModuleId.get('id')}`][`lectures`][`lecture_0`].lectureAvailable ?
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