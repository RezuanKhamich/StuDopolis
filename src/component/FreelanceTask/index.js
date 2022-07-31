import React, {useMemo, useState} from "react";
import styled from "styled-components";
import {hoverColor, mainColor, secondColor, textColor2} from "../../constants/colors";
import MainPageTitle from "../../containers/MainPageTitle";
import {materialCollection} from "../../data/courseData/index";
import {useSearchParams} from "react-router-dom";
import QuizComponent from "../QuizComponent";
import {Card, CardContent, Chip, Typography} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {
  saveUsersAward,
  saveUsersAwardDB,
  updateLectureProgress,
  updateQuizProgress
} from "../../utils/services/learnPageService";
import {doc, getDoc, updateDoc} from "firebase/firestore";
import {db} from "../../firebase";
import {setFreelanceData, setUserData} from "../../utils/reducers/repoReducer";
import {serviceEconomics} from "../../utils/services/ServiceEconomics";

const ContentWrapper = styled('div')`
  max-width: 1190px;
  margin: auto;
`

const FreelanceTask = () => {
  const dispatch = useDispatch();
  const freelanceData = useSelector(state => state.repos.freelanceData)
  const userData = useSelector(state => state.repos.userData)
  const [isUserAuthorized, setIsUserAuthorized] = useState(JSON.parse(localStorage.getItem('st_user_authorized')))
  const [urlParametersId, setUrlParametersId] = useSearchParams();
  const courseId = urlParametersId.get('courseId');
  const moduleId = urlParametersId.get('moduleId');
  const lectureId = urlParametersId.get('lectureId');
  const taskId = urlParametersId.get('taskId');
  let awardBtnDisabled = useMemo(() => freelanceData[`course_${courseId}`] ? freelanceData[`course_${courseId}`][`modules`][moduleId][`lectures`][lectureId][`task_${taskId}`].isAwardReceived: null, [freelanceData]);
  const data = materialCollection()[courseId][moduleId][lectureId].freelanceTasks[taskId]

  const doneTaskHandler = async () => {
    console.log('завершено')
  }

  const updateTestProgressHandler = async (userAnswers) => await updateTaskProgress(isUserAuthorized, userAnswers, courseId, moduleId, lectureId, taskId, freelanceData, setFreelanceDataHandler)

  const setUserDataHandler = (payload) => {
    dispatch(setUserData(payload))
  }

  const setFreelanceDataHandler = (payload) => {
    dispatch(setFreelanceData(payload))
  }

  const getAwardRatio = () => {
    const taskDifficult = freelanceData[`course_${courseId}`][`modules`][moduleId][`lectures`][lectureId][`task_${taskId}`].difficult;

    if(taskDifficult === 0){
      return [serviceEconomics().easyFreelanceTaskDone.exp, serviceEconomics().easyFreelanceTaskDone.greenCoin]
    }
    return [serviceEconomics().hardFreelanceTaskDone.exp, serviceEconomics().hardFreelanceTaskDone.greenCoin]
  }

  const saveUserAwardHandler = async (greenCoinCount, expCount, goldCoinCount) => {
    await saveTaskAward(isUserAuthorized, userData, setUserDataHandler, greenCoinCount, expCount, goldCoinCount, courseId, moduleId, lectureId, taskId, setFreelanceDataHandler)
  }

  const saveTaskAward = async (isUserAuthorized, userData, setUserData, greenCoinCount, expCount, goldCoinCount, courseId, moduleId, lectureId, taskId, setFreelanceData) => {
    const freelanceDocRef = doc(db, "freelance", isUserAuthorized.uid);

    await updateDoc(freelanceDocRef, {
      [`course_${courseId}.modules.${moduleId}.lectures.${lectureId}.task_${taskId}.isAwardReceived`]: true,
    });

    const freelanceDocNew = await getDoc(freelanceDocRef);
    if (freelanceDocNew.exists()) {
      setFreelanceData(freelanceDocNew.data())
    } else {
      console.log("No such document!");
    }

    await saveUsersAwardDB(isUserAuthorized, userData, setUserData, greenCoinCount, expCount, goldCoinCount)
  }

  const updateTaskProgress = async (isUserAuthorized, userAnswers, courseId, moduleId, lectureId, taskId, freelanceData, setFreelanceData) => {
    const freelanceDocRef = doc(db, "freelance", isUserAuthorized.uid);

    let currentQuizProgress = freelanceData[`course_${courseId}`][`modules`][moduleId][`lectures`][lectureId][`task_${taskId}`].taskProgress.split('')
    userAnswers.forEach((elem, index) => {
      currentQuizProgress[index] = elem
    })
    let resultPageProgress = currentQuizProgress.join('')

    await updateDoc(freelanceDocRef, {
      [`course_${courseId}.modules.${moduleId}.lectures.${lectureId}.task_${taskId}.taskProgress`]: `${resultPageProgress}`,
    });

    const freelanceDataNew = await getDoc(freelanceDocRef);
    if (freelanceDataNew.exists()) {
      setFreelanceData(freelanceDataNew.data())
    } else {
      console.log("No such document!");
    }
  }

  return (
    <>
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
              {data.mainTitle}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Описание
            </Typography>
            <Typography variant="p">
              {data.description}
            </Typography>
          </CardContent>
        </Card>
        <QuizComponent
          pageData={data}
          doneBtnHandler={doneTaskHandler}
          currentPageIsDone={awardBtnDisabled}
          updateTestProgressHandler={updateTestProgressHandler}
          currentQuizAnswers={freelanceData[`course_${courseId}`] ? freelanceData[`course_${courseId}`][`modules`][moduleId][`lectures`][lectureId][`task_${taskId}`].taskProgress : null}
          saveUserAwardHandler={saveUserAwardHandler}
          awardBtnDisabled={awardBtnDisabled}
          awardRatio={getAwardRatio()}
        />
      </ContentWrapper>
    </>
  );
};

export default FreelanceTask;