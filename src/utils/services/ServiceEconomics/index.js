import JuniorIcon from "../../../media/bronze_3.png";
import MiddleIcon from "../../../media/silver_2.png";
import SeniorIcon from "../../../media/gold_1.png";

import careerPosImg_1 from "../../../media/careerPos_1.png";
import careerPosImg_2 from "../../../media/careerPos_2.png";
import careerPosImg_3 from "../../../media/careerPos_3.png";
import careerPosImg_4 from "../../../media/careerPos_4.png";
import careerPosImg_5 from "../../../media/careerPos_5.png";

const awardsValue = {
  lectureDone: { exp: 200, greenCoin: 1200 },  // Награда за завершение лекции
  moduleControlTestDone: { exp: 300, greenCoin: 1800 }, // Награда за завершение контрольной работы
  // presentationDone: { exp: 19200, greenCoin: 45500 }, // Награда за выполнение презентации
  easyFreelanceTaskDone: { exp: 100, greenCoin: 750 }, // Награда за завершение легкой задачи по фрилансу
  hardFreelanceTaskDone: { exp: 250, greenCoin: 1200 }, // Награда за завершение сложной задачи по фрилансу
  // homeworkDone: { exp: 1920, greenCoin: 4550 }, // Награда за завершение домашнего задания
  // lectureTestDone: { exp: 1200, greenCoin: 2800 }, // Награда за правильный ответ в тесте занятия
  // courseDone: { exp: 26400, greenCoin: 63000 }, // Награда за завершение курса

  careerAward: [
    { name: 'Assistant', greenCoin: 500, needExp: 0, getExp: 100, img: careerPosImg_1 },
    { name: 'Junior', greenCoin: 1000, needExp: 1000, getExp: 150, img: careerPosImg_2 },
    { name: 'Middle', greenCoin: 2000, needExp: 10000, getExp: 200, img: careerPosImg_3 },
    { name: 'Senior', greenCoin: 4000, needExp: 100000, getExp: 250, img: careerPosImg_4 },
    { name: 'TeamLead', greenCoin: 8000, needExp: 1000000, getExp: 500, img: careerPosImg_5 },
  ]
}

export const serviceEconomics = () => awardsValue;

const getReadableValue = (value) => {
  const strValue = value.toString();

  if(strValue.length > 6) return `${(value / 1000000).toFixed(3)}М`
  // else if(strValue.length > 3) return `${(value / 1000).toFixed(2)}К`
  else return value.toString()
}

export const getMaxCourseAward = (lectureCount, moduleCount) => {
  const getMaxAwardValue = (awardType) => ( lectureCount * (
    awardsValue.lectureDone[awardType] +
    awardsValue.easyFreelanceTaskDone[awardType] +
    awardsValue.hardFreelanceTaskDone[awardType]
  ));

  return [getReadableValue(getMaxAwardValue('exp')), getReadableValue(getMaxAwardValue('greenCoin'))]
}

export const getMaxModuleAward = (lectureCount) => {
  const getMaxAwardValue = (awardType) => ( lectureCount * (
      awardsValue.lectureDone[awardType] +
      awardsValue.lectureTestDone[awardType] +
      awardsValue.homeworkDone[awardType]
    ) + awardsValue.moduleControlTestDone[awardType]
  )

  return [getReadableValue(getMaxAwardValue('exp')), getReadableValue(getMaxAwardValue('greenCoin'))]
}