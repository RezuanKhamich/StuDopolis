
const awardsValue = {
  lectureDone: { exp: 1200, greenCoin: 3500 },  // Награда за завершение лекции
  moduleControlTestDone: { exp: 4800, greenCoin: 12250 }, // Награда за завершение контрольной работы
  // presentationDone: { exp: 19200, greenCoin: 45500 }, // Награда за выполнение презентации
  easyFreelanceTaskDone: { exp: 1800, greenCoin: 4200 }, // Награда за завершение легкой задачи по фрилансу
  hardFreelanceTaskDone: { exp: 2400, greenCoin: 5250 }, // Награда за завершение сложной задачи по фрилансу
  homeworkDone: { exp: 1920, greenCoin: 4550 }, // Награда за завершение домашнего задания
  lectureTestDone: { exp: 1200, greenCoin: 2800 }, // Награда за правильный ответ в тесте занятия
  courseDone: { exp: 26400, greenCoin: 63000 }, // Награда за завершение курса

  weekTraineeAward: { needExp: 0, greenCoin: 2000 }, // Награда в неделю за позицию СТАЖЕР
  weekJuniorAward: { needExp: 67950, greenCoin: 4500 }, // Награда в неделю за позицию ДЖУНИОР
  weekMiddleAward: { needExp: 181200, greenCoin: 7000 }, // Награда в неделю за позицию МИДЛ
  weekSeniorAward: { needExp: 294450, greenCoin: 10500 }, // Награда в неделю за позицию СЕНИОР
  weekTeemLeadAward: { needExp: 385050, greenCoin: 13000 }, // Награда в неделю за позицию ТИМЛИД
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
    // awardsValue.easyFreelanceTaskDone[awardType] +
    // awardsValue.hardFreelanceTaskDone[awardType] +
    awardsValue.lectureTestDone[awardType] +
    awardsValue.homeworkDone[awardType]
    ) +
    moduleCount * awardsValue.moduleControlTestDone[awardType] +
    awardsValue.courseDone[awardType]
  )

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