import React, {useEffect} from "react";
import {Card, CardContent, Grid, Icon, Typography} from "@mui/material";
import {giveUserAwards} from "../../../utils/services";
import styled from "styled-components";
import GameIcon from "../../../containers/GameIcon/GameIcon";
import {doc, getDoc, updateDoc} from "firebase/firestore";
import {db} from "../../../firebase";

const InteractiveCard = styled(Card)`
  opacity: ${props => props.disabled ? '0.5' : '1'};
  max-width: 100%;
  height: 110px;
  position: relative;
  background: ${props => props.bgColor || 'white'}!important;
  display: flex;
  
  &:hover{
    transition: 0.5s;
    box-shadow: 0px 5px 5px -3px rgb(0 0 0 / 20%), 0px 8px 10px 1px rgb(0 0 0 / 14%), 0px 3px 14px 2px rgb(0 0 0 / 12%);
    cursor: pointer;
  }

  @media (max-width: 430px) {
    margin: auto;
    height: 305px;
  }
`;

const QuizPageWrapper = styled.div`
  border: 1px solid rgba(128, 128, 128, 0.3);
  border-radius: 25px;
  margin-top: 20px;
  padding: 20px;
  width: 100%;
  min-height: 400px;
`;

const AwardWrapper = styled.div`
  display: flex;
  align-items: center;
  margin: 40px 0;
`;

const QuizResultPage = ({userAnswers, pageData, currentQuizAnswers, saveUserAwardHandler, awardBtnDisabled, awardRatio = [300, 100]}) => {

  const getRightAnswersCoef = (userAnswers, currentQuizAnswers, dataAnswers) => {
    let rightAnswerCount = 0;
    dataAnswers.forEach((elem, index) => {
      if(userAnswers[index] === elem.rightAnswerId || currentQuizAnswers[index] == elem.rightAnswerId) ++rightAnswerCount;
      else rightAnswerCount += 0.5;
    })
    return rightAnswerCount;
  }

  const getRightAnswerCount = (userAnswers, currentQuizAnswers, dataAnswers) => {
    let rightAnswerCount = 0;
    dataAnswers.forEach((elem, index) => {
      if(userAnswers[index] === elem.rightAnswerId || currentQuizAnswers[index] == elem.rightAnswerId) ++rightAnswerCount;
    })
    return rightAnswerCount;
  }

  const getCorrectAnswer = (elem, index) => {
    if (userAnswers.length)
       return userAnswers[index] == elem.rightAnswerId;
    else
      return currentQuizAnswers.split('')[index] == elem.rightAnswerId
  }

  return (
    <QuizPageWrapper>
      <div style={{ padding: '10px' }} >
        <Typography gutterBottom variant="h5" component="div" color="gray">
          Тест
        </Typography>
        <Typography gutterBottom variant="h3" component="div" textAlign="center">
          Результат: {Math.floor(getRightAnswerCount(userAnswers, currentQuizAnswers.split(''), pageData.pageTest))}/{pageData.pageTest.length}
        </Typography>
        <AwardWrapper>
          <Typography marginRight="10px" gutterBottom variant="h5" component="div" textAlign="center" display="flex" alignItems="center">
            Награда:
          </Typography>
          <Typography marginRight="10px" gutterBottom variant="h5" component="div" textAlign="center" display="flex" alignItems="center">
            +{Math.floor(getRightAnswersCoef(userAnswers, currentQuizAnswers.split(''), pageData.pageTest) * awardRatio[1] / pageData.pageTest.length)}<GameIcon mobileWidth={35} width={50} icon="2" />
          </Typography>
          <Typography gutterBottom variant="h5" component="div" textAlign="center" display="flex" alignItems="center">
            +{Math.floor(getRightAnswersCoef(userAnswers, currentQuizAnswers.split(''), pageData.pageTest) * awardRatio[0] / pageData.pageTest.length)}<GameIcon mobileWidth={35} width={50} icon="0" />
          </Typography>
        </AwardWrapper>
      </div>
      <Grid style={{margin: "auto", width: '100%'}} rowSpacing={2} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        {
          pageData.pageTest.map((elem, index) => (
            <Grid style={{ padding: '10px' }} item xs={ 12 } key={index}>
              <InteractiveCard
                style={{ height: '80px' }}
                bgColor={ getCorrectAnswer(elem, index) ? "#67E667" : "#FF7373"}
              >
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {index+1}. {userAnswers.length ? elem.answers[userAnswers[index]-1] : elem.answers[currentQuizAnswers.split('')[index]-1]}
                  </Typography>
                </CardContent>
              </InteractiveCard>
            </Grid>
          ))
        }
      </Grid>
      {
        giveUserAwards(
          awardBtnDisabled,
          saveUserAwardHandler,
          awardRatio[1] * getRightAnswersCoef(userAnswers, currentQuizAnswers.split(''), pageData.pageTest) / pageData.pageTest.length,
          awardRatio[0] * getRightAnswersCoef(userAnswers, currentQuizAnswers.split(''), pageData.pageTest) / pageData.pageTest.length,
      )}
    </QuizPageWrapper>
  )
}

export default QuizResultPage;