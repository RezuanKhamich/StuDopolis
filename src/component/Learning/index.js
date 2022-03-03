import React, {useEffect, useMemo, useState} from "react";
import styled from "styled-components";
import PageContent from "../../containers/PageContent";
import {backColor, hoverColor, mainColor, textColor2} from "../../constants/colors";
import {secondColor} from "../../constants/colors";
import {Button, CircularProgress} from "@mui/material";
import {doc, getDoc, updateDoc} from "firebase/firestore";
import { db } from '../../firebase'

import courseInfo from "../../externalData/FrontEnd/courseInfo.json"
import FrontEnd1 from "../../externalData/FrontEnd/FrontEnd_1/FrontEnd_s1.json"
import FrontEnd2 from "../../externalData/FrontEnd/FrontEnd_1/FrontEnd_s2.json"
import FrontEnd3 from "../../externalData/FrontEnd/FrontEnd_1/FrontEnd_s3.json"
import FrontEnd4 from "../../externalData/FrontEnd/FrontEnd_1/FrontEnd_s4.json"
import FrontEnd5 from "../../externalData/FrontEnd/FrontEnd_1/FrontEnd_s5.json"
import Quiz from "../Quiz";
import Layout from "../../hoc/Layout";
import MainPageTitle from "../../containers/MainPageTitle";
import {
  setDoneSectionCells,
  setEmptyPageCells,
  updateLectureProgress,
} from "../../utils/services/learnPageService";
import Loader from "../Loader";
import {createDBArchitecture} from "../../utils/services/ createCourseDBArchitecture";
import {useLecturesProgress} from "../../utils/services/сalculationService/courseProgress";

const SectionsWrapper = styled('div')`
  background: ${mainColor};
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  width: 300px;
  z-index: 250;
  color: white;
`
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

const StudyPlatform = ({courseData, setCourseData}) => {
  const data = [
    FrontEnd1, FrontEnd2, FrontEnd3, FrontEnd4, FrontEnd5,
  ]
  const lessonData = useLecturesProgress(courseData, 0, 0)
  const [isUserAuthorized, setIsUserAuthorized] = useState(JSON.parse(localStorage.getItem('st_user_authorized')))
  const [currentSectionId, setCurrentSectionId] = useState(0)
  const [currentPageId, setCurrentPageId] = useState(0)
  const [donePage, setDonePage] = useState(setEmptyPageCells(data))
  console.log(currentSectionId)
  console.log()
  const isDisabledEndButton = useMemo(() => lessonData.length && Number(lessonData[currentSectionId][currentPageId]), [currentPageId, currentSectionId, lessonData])
  const doneSections = useMemo(() => setDoneSectionCells(lessonData), [lessonData])

  const sectionJsonData = data[currentSectionId];
  const pageData = data[currentSectionId].pageFlow;
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

  const completedPageHandler = async () => {
    let newDonePage = donePage.slice();
    newDonePage[currentSectionId][currentPageId] = 1;
    setDonePage(newDonePage)

    if(currentPageId !== (data[currentSectionId].pageCount-1)){
      setCurrentPageId(prevState => lessonData.length-1 !== prevState ? ++prevState : prevState)
    }else{
      if(courseData[`course_${0}`][`modules`][`module_${0}`][`lectures`][`lecture_${currentPageId + 1}`].lectureAvailable){
        setCurrentSectionId(prevState => lessonData.length-1 !== prevState ? ++prevState : prevState)
        setCurrentPageId(0)
      }
    }

    await updateLectureProgress(isUserAuthorized, 0, 0, currentSectionId, currentPageId, courseData, setCourseData)
  }

  const setCompletedStateForPageButton = (index) => {
    let state = 'null'
    if(lessonData[currentSectionId][index] === '1'){
      state = 'done'
    }
    return state
  }

  useEffect(() => {
    console.log(courseData)
  },[courseData])


  return(
      <>
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
                disabled={courseData ? !courseData[`course_${0}`][`modules`][`module_${0}`][`lectures`][`lecture_${index}`].lectureAvailable : true}
              >
                {index + 1}. {secTitle}
              </SectionButton>
            })
          }
        </SectionsWrapper>
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
                <ContentTextWrapper>
                  <PageContent pageData={pageData} currentPageId={currentPageId} currentSectionId={currentSectionId} />
                </ContentTextWrapper>
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
              </>
            :
              <Loader />
          }
        </ContentWrapper>
      </>
  )
}

export default StudyPlatform