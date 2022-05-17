import React, {useState} from "react";
import styled from "styled-components";
import {coursesData} from "../../externalData";
import {hoverColor, mainColor, secondColor, textColor2} from "../../constants/colors";
import MainPageTitle from "../../containers/MainPageTitle";
import {courseMaterials} from "../../data/courseData/FrontEnd";
import {useSearchParams} from "react-router-dom";
import QuizComponent from "../QuizComponent";
import {Card, CardContent, Chip, Typography} from "@mui/material";
import {useSelector} from "react-redux";

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

const ContentWrapper = styled('div')`
  padding-right: 320px;
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

const FreelanceTask = () => {
  const courseData = useSelector(state => state.repos.courseData)

  const [currentCourse, setCurrentCourse] = useState(0);
  const [currentModuleId, setCurrentModuleId] = useSearchParams();
  const [awardBtnDisabled, setAwardBtnDisabled] = useState(false);

  const data = courseMaterials()[currentModuleId.get('id')];

  const doneTaskHandler = () => {
    console.log('завершено')
  }

  const updateTestProgressHandler = () => {
    console.log('сохранили данные')
  }

  const saveUserAwardHandler = () => {
    console.log('Сохранили данные по награде')
  }

  return (
    <>
      <SectionsWrapper>
        <SectionTitle>Доступные направления</SectionTitle>
        <Devider />
        {
          coursesData.map((course, index) => {
            return <SectionButton
              key={index}
              sectionDone={course[index] ? secondColor() : null}
              active={index === currentCourse ? hoverColor() : null}
              disabled={course.disabled}
              // onClick={changeCurrentSection.bind(this, index)}
            >
              {index + 1}. {course.name}
            </SectionButton>
          })
        }
      </SectionsWrapper>
      <ContentWrapper>
        <MainPageTitle>FrontEnd - разработчик</MainPageTitle>

        <Card>
          <CardContent>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div>
                <Chip label="Сложность:" sx={{ marginRight: '8px' }}/>
                <Chip label="легко" color="success" sx={{ marginRight: '8px' }} />
                {/*<Chip label="средне" color="warning" />*/}
              </div>
            </div>
            <Typography variant="body2" color="text.secondary">
              Задача:
            </Typography>
            <Typography gutterBottom variant="h5" component="div">
              {data[0].freelanceTasks[0].mainTitle}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Описание
            </Typography>
            <Typography variant="p">
              {data[0].freelanceTasks[0].description}
            </Typography>
          </CardContent>
        </Card>
        <QuizComponent
          pageData={data[0].freelanceTasks[0]}
          doneBtnHandler={doneTaskHandler}
          currentPageIsDone={false}
          updateTestProgressHandler={updateTestProgressHandler}
          currentQuizAnswers={'0000000000'}
          saveUserAwardHandler={saveUserAwardHandler}
          awardBtnDisabled={awardBtnDisabled}
        />
      </ContentWrapper>
    </>
  );
};

export default FreelanceTask;