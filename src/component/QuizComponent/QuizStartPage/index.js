import React from "react";
import styled from "styled-components";
import {Button, Icon, Typography} from "@mui/material";
import GameIcon from "../../../containers/GameIcon/GameIcon";

const QuizPageWrapper = styled.div`
  border: 1px solid rgba(128, 128, 128, 0.3);
  border-radius: 25px;
  margin-top: 20px;
  padding: 20px;
  width: 100%;
  min-height: 400px;
`;

const QuizDetails = styled.div`
  display: flex;
  justify-content: space-between;
  width: 600px;
  align-items: center;
  margin: 60px auto;
`;

const ButtonWrapper = styled.div`
  text-align: center;
`;

const QuizStartPage = ({ startQuizHandler, pageData }) => {

  return(
    <>
      <QuizPageWrapper>
        <Typography gutterBottom variant="h5" component="div" color="rgba(128, 128, 128, 0.5)" marginBottom="60px">
          Тестирование
        </Typography>
        <Typography gutterBottom variant="h3" component="div" textAlign="center">
          Типы данных в Javascript
        </Typography>
        <Typography gutterBottom variant="p" component="div" textAlign="center" color="rgba(128, 128, 128, 0.5)">
          Ниже указана награда за прохождение теста на 100%. За каждый неправильный ответ можно получить только 50% от
          стоимости вопроса. Тест на время, помни об этом и удачи!
        </Typography>

        <QuizDetails>
          <Typography gutterBottom variant="h5" component="div" textAlign="center" display="flex" alignItems="center">
            <Icon color="warning">timer</Icon> {pageData * 20} c.
          </Typography>
          <Typography gutterBottom variant="h5" component="div" textAlign="center" display="flex" alignItems="center">
            +{pageData * 100}<GameIcon mobileWidth={35} width={50} icon="2" />
          </Typography>
          <Typography gutterBottom variant="h5" component="div" textAlign="center" display="flex" alignItems="center">
            +{pageData * 300}<GameIcon mobileWidth={35} width={50} icon="0" />
          </Typography>
        </QuizDetails>

        <ButtonWrapper>
          <Button
            variant="contained"
            color='success'
            onClick={startQuizHandler}
          >
            Начать тест
          </Button>
        </ButtonWrapper>
      </QuizPageWrapper>
    </>
  )
}

export default QuizStartPage;