import FrontEnd_Data from '../../../externalData/FrontEnd/courseInfo.json'
import DigitalArt_Data from '../../../externalData/DigitalArt/courseInfo.json'
import KerbalSpace_Data from '../../../externalData/KerbalSpace/courseInfo.json'
import Minecraft_Data from '../../../externalData/Minecraft/courseInfo.json'
import Modelling_Data from '../../../externalData/Modelling/courseInfo.json'
import Python_Data from '../../../externalData/Python/courseInfo.json'
import Unity_Data from '../../../externalData/Unity/courseInfo.json'
import UnrealEngine_Data from '../../../externalData/UnrealEngine/courseInfo.json'
import WebDesign_Data from '../../../externalData/WebDesign/courseInfo.json'


export const createDBArchitecture = () => {
  let courseArchitecture = {}
  const coursesData = [
    FrontEnd_Data,
    DigitalArt_Data,
    KerbalSpace_Data,
    Minecraft_Data,
    Modelling_Data,
    Python_Data,
    Unity_Data,
    UnrealEngine_Data,
    WebDesign_Data,
  ];  // Изменять значение в зависимости от количества курсов

  for(let i = 0; i < coursesData.length; i++) {
    courseArchitecture[`course_${i}`] = {
      modules: {},
      info: {
        courseName: coursesData[i].courseName,
        modulesName: coursesData[i].modulesName,
        moduleImg: coursesData[i].moduleImg,
        lectureCountDB: coursesData[i].lectureCount_DB,
      },
    }

    for(let j = 0; j < coursesData[i].lectureCount_DB.length; j++){
      courseArchitecture[`course_${i}`][`modules`][j] = {
        lectures: {},
        info: {
          moduleAvailable: j === 0,
        },
      }

      for(let k = 0; k < coursesData[i].lectureCount_DB[j]; k++) {
        courseArchitecture[`course_${i}`][`modules`][j][`lectures`][k] = {
          lectureAvailable: (i === 0 && j=== 0 && k === 0),
          quizProgress: '0000000000',
          pageProgress: '00',
          isAwardReceived: false,
        }
      }
    }
  }

  return courseArchitecture;
}
