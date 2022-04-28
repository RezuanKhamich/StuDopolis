import FrontEnd_Data from '../../../externalData/FrontEnd/courseInfo.json'


export const createDBArchitecture = () => {
  let courseArchitecture = {}
  const coursesData = [
    FrontEnd_Data,
  ];  // Изменять значение в зависимости от количества курсов

  for(let i = 0; i < coursesData.length; i++) {
    courseArchitecture[`course_${i}`] = {
      modules: {},
      info: {
        courseName: coursesData[i].courseName,
      },
    }

    for(let j = 0; j < coursesData[i].lectureCount_DB.length; j++){
      courseArchitecture[`course_${i}`][`modules`][`module_${j}`] = {
        lectures: {},
        info: {
          moduleAvailable: j === 0,
        },
      }

      for(let k = 0; k < coursesData[i].lectureCount_DB[j]; k++) {
        courseArchitecture[`course_${i}`][`modules`][`module_${j}`][`lectures`][`lecture_${k}`] = {
          lectureAvailable: (i === 0 && j=== 0 && k === 0),
          quizProgress: '0000000000',
          pageProgress: '00',
          isAwardReceived: true,
        }
      }
    }
  }

  return courseArchitecture;
}
