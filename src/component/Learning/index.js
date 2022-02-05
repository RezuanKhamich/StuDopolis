import React, {useEffect, useState} from "react";
import styled from "styled-components";
import PageContent from "../../containers/PageContent";
import {backColor, hoverColor, mainColor, textColor2} from "../../constants/colors";
import {secondColor} from "../../constants/colors";
import {Button} from "@mui/material";

import courseInfo from "../../externalData/FrontEnd/courseInfo.json"
import FrontEnd1 from "../../externalData/FrontEnd/FrontEnd_1/FrontEnd_s1.json"
import FrontEnd2 from "../../externalData/FrontEnd/FrontEnd_1/FrontEnd_s2.json"
import FrontEnd3 from "../../externalData/FrontEnd/FrontEnd_1/FrontEnd_s3.json"
import FrontEnd4 from "../../externalData/FrontEnd/FrontEnd_1/FrontEnd_s4.json"
import FrontEnd5 from "../../externalData/FrontEnd/FrontEnd_1/FrontEnd_s5.json"
import Quiz from "../Quiz";
import Layout from "../../hoc/Layout";
import MainPageTitle from "../../containers/MainPageTitle";

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
  &:hover{
    cursor: pointer;
    background-color: ${hoverColor()};
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
const setEmptyPageCells = (data) => {
  let resultPageArray = [];
  for(let section in data){
    resultPageArray[section] = []
    for(let page = 0; page < data[section].pageCount; page++){
      resultPageArray[section][page] = ''
    }
  }
  return resultPageArray
}

const setEmptySectionCells = (data) => {
  let resultSectionArray = []
  for(let i = 0; i < data.length; i++){
    resultSectionArray[i] = 0
  }
  return resultSectionArray
}

const StudyPlatform = () => {
  const data = [
    FrontEnd1, FrontEnd2, FrontEnd3, FrontEnd4, FrontEnd5,
  ]
  const [currentSectionId, setCurrentSectionId] = useState(0)
  const [currentPageId, setCurrentPageId] = useState(0)
  const [donePage, setDonePage] = useState(setEmptyPageCells(data))
  const [doneSections, setDoneSections] = useState(setEmptySectionCells(data))

  const sectionJsonData = data[currentSectionId];
  const pageData = data[currentSectionId].pageFlow;
  const sectionsTitle = data.map((el)=>{
    return el.sectionName
  })

  useEffect(()=>{
    let donePageTemp = donePage.slice()
    setDonePage(donePageTemp)
  }, [])


  const pageBtnHandler = (pageId) => {
    setCurrentPageId(pageId)
  }

  const changeCurrentSection = (sectionId) => {
    setCurrentSectionId(sectionId)
    setCurrentPageId(0)
  }

  const setDoneCurrentPage = () => {
    let newDonePage = donePage.slice();
    newDonePage[currentSectionId][currentPageId] = 1;
    setDonePage(newDonePage)
    setDoneSection(currentSectionId, donePage)
    if(currentPageId !== (data[currentSectionId].pageCount-1)){
      setCurrentPageId(prevState => ++prevState)
    }else{
      setCurrentSectionId(prevState => ++prevState)
      setCurrentPageId(0)
    }

  }

  const setDoneSection = (index, donePage) => {
      console.log(donePage[currentSectionId].reduce((sum, el) => sum + el))
      let sumOfDonePages = donePage[currentSectionId].reduce((sum, el) => sum + el)

      if(sumOfDonePages == donePage[currentSectionId].length - 1) {
        let temp = doneSections.slice()
        console.log(temp)
        temp[index] = 1
        setDoneSections(temp)
      }
  }

  return(
      <>
        {/*<Layout>*/}
        {/*  <Quiz/>*/}
        {/*</Layout>*/}
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
              >
                {index + 1}. {secTitle}
              </SectionButton>
            })
          }
        </SectionsWrapper>
        <ContentWrapper>
          <MainPageTitle>{sectionJsonData.sectionName}</MainPageTitle>
          <PageButtonContainer>
            {

              sectionJsonData.pageType.map((btnType, index) => {
                return <PageButton
                  className={donePage[currentSectionId][index] === 1 ? "done" : "null"}
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
            <Button variant="contained" color='warning' onClick={setDoneCurrentPage}>Понятно</Button>
          </ButtonWrapper>
        </ContentWrapper>

      </>
  )
}

export default StudyPlatform