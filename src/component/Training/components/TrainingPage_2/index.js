import {Button, Card, Grid, Typography} from "@mui/material";
import styled from "styled-components";

import React, { useState } from "react";

const AnswerCard = styled(Card)`
  padding: 10px;
  font-size: 16px;
  height: 80px;
  &:hover {
    cursor: pointer;
    background: #dcdcdc;
  }
`;

const TrainingPage_2 = ({ switchPageHandler }) => {
  const [questionIndex, setQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);

  const testResults = [
    {
      title: 'Ты Прирожденный лидер',
      description: 'С таким руководителем студия быстро',
      rate: 8
    },
    {
      title: 'Ты Креативный руководитель',
      description: 'Руководитель должен быть нестандартным, ведь как иначе вести за собой армию последователей',
      rate: 5
    },
    {
      title: 'Ты Радикальный управленец',
      description: 'У тебя нестандартные методы, но именно в наше время нужно быстро действовать и контролировать',
      rate: 3
    },
  ]

  const questions = [
    {
      title: 'У команды есть готовая мобильная игра на google play, но она очень тормозит, на нее жалуются игроки, твои действия',
      answers: [
        'Увеличить зарплату разработчкам в 2 раза',
        'Уволить всех разработчиков, ведь они плохо работают',
        'Добавить еще больше функционала в игру, пусть хоть и тормозит, зато столько функионала нет ни у одной игры',
        'Сделать основной упор на оптимизации. Игроки на первом месте!'
      ],
      answerRate: [1, 0, 1, 2]
    },
    {
      title: 'Один из разработчиков устроил бунт и решил свергнуть текущее руководство студии. Лучше всего будет',
      answers: [
        'Поставить его на более высокую должность, пусть управляет командой',
        'Пустить на самотек, все решится само собой!',
        'Нужны радикальные действия, убрать из команды бунтаря привязать его к стулу и отправить в ссылку к тестировщикам на 3 недели',
        'Устроить демонстративный батл в следующий понедельник'
      ],
      answerRate: [2, 1, 0, 1]
    },
    {
      title: 'Сейчас бум симуляторов, команда решила сделать свой. У вас, как у директора студии, спросили какой симулятор выбрать?',
      answers: [
        'Симулятор автобусного контроллера',
        'Симулятор травы',
        'Симулятор разработки симуляторов',
        'Симулятор квантовой физики'
      ],
      answerRate: [1, 0, 0, 2]
    },
    {
      title: 'Команда совсем поникла после последнего релиза игры. Вашу игру захейтили стримеры. Ваши действия',
      answers: [
        'Закрыть проект. Ведь стримеры погубили рейтинг',
        'Стать стримером и раздуть заговор против хейтеров',
        'Сказать, что это не ваша игра и убежать домой',
        'Подбодрить команду, сделать официальное заявление, что вы почините игру и запустите соревнование для стримеров'
      ],
      answerRate: [0, 0, 1, 2]
    },
  ]

  const selectAnswer = (answerId) => {
    if (questionIndex < 4) setQuestionIndex(prev => ++prev);
    setScore(prev => prev + questions[questionIndex].answerRate[answerId]);
  }

  const calcTestResult = () => {
    if (score <= 3) return testResults[2];
    if (score <= 8 && score > 5) return testResults[0];
    return testResults[1];
  }

  return (
    <>
      {
        questionIndex < 4 ? (
          <>
            <Typography variant="h5" color="gray" marginBottom="20px">Мини-тест: "Как раскрутить свою GameDev студию"</Typography>
            <Typography variant="p" color="gray">Вопрос {questionIndex+1} / 4</Typography>
            <div>
              <Card sx={{ margin: '20px auto 40px auto', padding: '20px', maxWidth: '800px' }}>
                <Typography variant="h5" fontSize="24px" textAlign="center">{questions[questionIndex].title}</Typography>
              </Card>
              <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                {
                  questions[questionIndex].answers.map((answer, index) => (
                    <Grid item xs={6}>
                      <AnswerCard
                        onClick={() => selectAnswer(index)}
                        key={index + 'ans'}
                      >
                        {index+1}. {answer}
                      </AnswerCard>
                    </Grid>
                  ))
                }
              </Grid>
            </div>
          </>
        ) : (
          <div>
            Молодец!
            <Typography variant="h5">{calcTestResult().title}</Typography>
            <Typography variant="p" color="secondary">{calcTestResult().description}</Typography>
            <Button
              variant="contained"
              color='success'
              size="large"
              onClick={switchPageHandler}
            >
              Вперед к +2000 GCoin
            </Button>
          </div>
        )
      }
    </>
  )
}

export default TrainingPage_2;