import React, {useEffect, useMemo, useState} from "react";
import styled from "styled-components";
import {Badge, createTheme} from "@mui/material";
import {useSelector} from "react-redux";
import {coursesData} from "../../../externalData";

const ListElem = styled('li')`
  position: relative;
`
const ListRef = styled('button')`
  display: block;
  background-color: transparent;
  width: 100%;
  border: none;
  padding: 0.5rem;
  &:hover{
    cursor: pointer;
    background-color: rgba(256,256,256, 0.2);
  }
  
  @media (max-width: 430px) {
    padding: 0 16px;
    height: 58px;
  }
`
const ListImg = styled('img')`
  width: 28px;
  height: 28px;
  margin: 0 auto 5px auto;
  &.logo{
    border-radius: 50%;
    width: 80px;
    height: 60px;
    margin: 0;
  }
  @media (max-width: 430px) {
    &.logo{
      width: 32px;
    }
    margin: 0;
  }
`
const ListText = styled('p')`
  color: white;
  text-align: center;
  font-size: 14px;
`

const NavElement = ({
  titleName, titleImg, titleMsg, isLogo,
}) => {
  const { innerWidth: width, innerHeight: height } = window;
  const freelanceData = useSelector(state => state.repos.freelanceData)
  const courseData = useSelector(state => state.repos.courseData)
  const [availableTasksCount, setAvailableTasksCount] = useState(0);

  const theme = createTheme({
    palette: {
      yellow: {
        light: '#eace49',
        main: '#eace49',
        dark: '#eace49',
        contrastText: '#212529',
      },
    },
  });

  useEffect(() => {
    setAvailableTasksCount(0)

    switch (titleMsg){
      case 'learn':
        let openedLectureCount = 0;
        for(let courseId in courseData){
          if(courseData[courseId].info.courseAvailable){
            for(let j = 0; j < Object.keys(courseData[courseId][`modules`]).length; j++){
              for(let i = 0; i < Object.keys(courseData[courseId][`modules`][j][`lectures`]).length; i++){
                if(courseData[courseId][`modules`][j][`lectures`][i].lectureAvailable && courseData[courseId][`modules`][j][`lectures`][i].pageProgress.includes('0'))
                  openedLectureCount++;
              }
            }
          }
        }

        setAvailableTasksCount(openedLectureCount)
        break;
      case 'freelance':
        for(let courseId in freelanceData){
          if(freelanceData[courseId].info.courseAvailable){
            const modulesData = freelanceData[courseId].modules
            for(let moduleId in modulesData) {
              for(let lectureId in modulesData[moduleId].lectures){
                if(modulesData[moduleId].lectures[lectureId]['task_0'].taskAvailable && !modulesData[moduleId].lectures[lectureId]['task_0'].isAwardReceived){
                  setAvailableTasksCount(prev => ++prev)
                }
                if(modulesData[moduleId].lectures[lectureId]['task_1'].taskAvailable && !modulesData[moduleId].lectures[lectureId]['task_1'].isAwardReceived){
                  setAvailableTasksCount(prev => ++prev)
                }
              }
            }
          }
        }
        break;
      default:
        setAvailableTasksCount(0)
        break;
    }
  }, [freelanceData, courseData])

  return(
    <ListElem>
      <ListRef>
        <Badge theme={theme} color="yellow" badgeContent={titleMsg ? availableTasksCount : null}>
          <ListImg className={isLogo ? "logo" : 'null'} src={titleImg} alt=""/>
        </Badge>
        { width > 520 ? <ListText>{titleName}</ListText> : null }
      </ListRef>
    </ListElem>
  )
}

export default NavElement