import {collection, doc, limit, onSnapshot, orderBy, query, setDoc, updateDoc} from "firebase/firestore";
import {db} from "../../../firebase";
import {createDBArchitecture} from "../createCourseDBArchitecture";
import {createFreelanceDBArchitecture} from "../createFreelanceDBArchitecture";
import FrontEnd_Data from "../../../externalData/FrontEnd/courseInfo.json";
import DigitalArt_Data from "../../../externalData/DigitalArt/courseInfo.json";
import KerbalSpace_Data from "../../../externalData/KerbalSpace/courseInfo.json";
import Minecraft_Data from "../../../externalData/Minecraft/courseInfo.json";
import Modelling_Data from "../../../externalData/Modelling/courseInfo.json";
import Python_Data from "../../../externalData/Python/courseInfo.json";
import Unity_Data from "../../../externalData/Unity/courseInfo.json";
import UnrealEngine_Data from "../../../externalData/UnrealEngine/courseInfo.json";
import WebDesign_Data from "../../../externalData/WebDesign/courseInfo.json";

const allUsersFirestoreId = async (docName) => {
  const usersRef = collection(db, docName);
  const q = await query(usersRef);
  const usersId = [];

  onSnapshot(q, (snapshot => {
    snapshot.docs.forEach(doc => {
      //Позволяет найти все ключи юзеров
      usersId.push(`${doc._key.path.segments[doc._key.path.segments.length - 1]}`)
    })
  }))
  console.log(usersId)
  return usersId;
}

export const addFieldForAllUsers = async () => {
  const usersRef = collection(db, "users");
  const q = await query(usersRef);

  onSnapshot(q, (snapshot => {
    snapshot.docs.forEach(doc => {
      console.log(doc.data())
    })
  }))

  // await setDoc(doc(db, "users", user.uid), {
  //   firstName: userEnteredData.firstNameRef.current.value,
  //   photoIdRef: userEnteredData.photoSelected,
  //   lastName: userEnteredData.lastNameRef.current.value,
  //   email: user.email,
  //   createdAt: user.metadata.createdAt,
  //   lastLoginAt: user.metadata.lastLoginAt,
  //   experienceAmount: 0,
  //   goldCoinAmount: 10,
  //   greenCoinAmount: 2000,
  //   resolvedFreelanceTaskCount: 0,
  //   careerPosition: 0,
  //   careerAwardDate: 0,
  //   careerAccumulatedAmount: 0,
  // })
}

const updateDBArchitecture = () => {
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
        courseAvailable: false,
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
          moduleAvailable: false,
        },
      }

      for(let k = 0; k < coursesData[i].lectureCount_DB[j]; k++) {
        if(k === (coursesData[i].lectureCount_DB[j] - 1)){
          courseArchitecture[`course_${i}`][`modules`][j][`lectures`][k] = {
            lectureAvailable: false,
            quizProgress: '0000000000',
            pageProgress: '0',
            isAwardReceived: false,
          }
        }else{
          courseArchitecture[`course_${i}`][`modules`][j][`lectures`][k] = {
            lectureAvailable: false,
            quizProgress: '0000000000',
            pageProgress: '000',
            isAwardReceived: false,
          }
        }
      }
    }
  }

  return courseArchitecture;
}

export const updateCourseDataAllUsers = async () => {
  // await allUsersFirestoreId("courses").map(userId => {

    // updateDoc(doc(db, "courses", userId), createDBArchitecture())
  // })
  // await setDoc(doc(db, "freelance", user.uid), createFreelanceDBArchitecture())
}