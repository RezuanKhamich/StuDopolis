import React from "react";
import styled from "styled-components";
import {Card, CardContent, Grid, Typography} from "@mui/material";
import Timer from "../../Tools/Timer";
import LinearWithValueLabel from "../../LinearProgressBar";

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

const QuizQuestionsPage = ({ userAnswers, pageData, questionId, timerEndHandler, selectAnswerHandler  }) => {
  return (
    <QuizPageWrapper>
      <div style={{ padding: '10px' }} >
        <Typography gutterBottom variant="h5" component="div" color="gray">
          Тестирование
        </Typography>

        <Timer startValue={pageData.pageTest.length * 20} timeEndHandler={timerEndHandler} />

        <Typography style={{ fontSize: '3.5vw', overflowWrap: 'anywhere' }} gutterBottom variant="h3" component="div" height="150px" textAlign="center">
          {pageData.pageTest[questionId].question}
        </Typography>
      </div>
      <Grid style={{margin: "auto", width: '100%'}} container rowSpacing={2} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        {
          pageData.pageTest[questionId].answers.map((elem, index) => (
            <Grid style={{ padding: '10px' }} item xs={ 6 } key={index}>
              <InteractiveCard style={{ display: 'flex' }} onClick={() => selectAnswerHandler(index, userAnswers)} >
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {elem}
                  </Typography>
                </CardContent>
              </InteractiveCard>
            </Grid>
          ))
        }
      </Grid>
      <div style={{ padding: '10px' }}>
        <LinearWithValueLabel value={questionId} maxValue={pageData.pageTest.length} />
      </div>
    </QuizPageWrapper>
  )
}

export default QuizQuestionsPage;