import {doc, getDoc, updateDoc} from "firebase/firestore";
import {db} from "../../../firebase";
import {useDispatch, useSelector} from "react-redux";
import {setCourseData, setFreelanceData} from "../../reducers/repoReducer";

export const setEmptyPageCells = (data) => {
  let resultPageArray = [];
  for(let section in data){
    resultPageArray[section] = []
    for(let page = 0; page < data[section].pageCount; page++){
      resultPageArray[section][page] = ''
    }
  }
  return resultPageArray
}

export const setDoneSectionCells = (data) => {
  let resultSectionArray = []
  if(data.length){
    data.map((section, index) => {
      resultSectionArray[index] = !section.includes('0')
    })
  }

  return resultSectionArray
}

export const updateLectureProgress = async (isUserAuthorized, courseId, moduleId, lectureId, pageCompletedId, courseData, setCourseData) => {
  const lectureDocRef = doc(db, "courses", isUserAuthorized.uid);

  let currentPageProgress = courseData[`course_${courseId}`][`modules`][moduleId][`lectures`][lectureId].pageProgress.split('')
  currentPageProgress[pageCompletedId] = '1'
  let resultPageProgress = currentPageProgress.join('')

  await updateDoc(lectureDocRef, {
    [`course_${courseId}.modules.${moduleId}.lectures.${lectureId}.pageProgress`]: `${resultPageProgress}`,
  });

  const courseDataNew = await getDoc(lectureDocRef);
  if (courseDataNew.exists()) {
    setCourseData(courseDataNew.data())
  } else {
    console.log("No such document!");
  }
}

export const updateQuizProgress = async (isUserAuthorized, userAnswers, courseId, moduleId, lectureId, pageCompletedId, courseData, setCourseData) => {
  const lectureDocRef = doc(db, "courses", isUserAuthorized.uid);

  let currentQuizProgress = courseData[`course_${courseId}`][`modules`][moduleId][`lectures`][lectureId].quizProgress.split('')
  userAnswers.forEach((elem, index) => {
    currentQuizProgress[index] = elem
  })
  let resultPageProgress = currentQuizProgress.join('')

  await updateDoc(lectureDocRef, {
    [`course_${courseId}.modules.${moduleId}.lectures.${lectureId}.quizProgress`]: `${resultPageProgress}`,
  });

  const courseDataNew = await getDoc(lectureDocRef);
  if (courseDataNew.exists()) {
    setCourseData(courseDataNew.data())
  } else {
    console.log("No such document!");
  }
}

export const updateFreelanceAvailableTasks = async (isUserAuthorized, courseId, moduleId, lectureId, dispatch, setFreelanceData) => {
  const freelanceDocRef = doc(db, "freelance", isUserAuthorized.uid);

  await updateDoc(freelanceDocRef, {
    [`course_${courseId}.modules.${moduleId}.lectures.${lectureId}.task_0.taskAvailable`]: true,
    [`course_${courseId}.modules.${moduleId}.lectures.${lectureId}.task_1.taskAvailable`]: true,
  });

  const freelanceDataNew = await getDoc(freelanceDocRef);
  if (freelanceDataNew.exists()) {
    dispatch(setFreelanceData(freelanceDataNew.data()))
  } else {
    console.log("No such document!");
  }
}

export const saveUsersAward = async (isUserAuthorized, userData, setUserData, greenCoinCount, expCount, goldCoinCount, courseId, moduleId, lectureId, setCourseData) => {
  const courseDocRef = doc(db, "courses", isUserAuthorized.uid);

  await updateDoc(courseDocRef, {
    [`course_${courseId}.modules.${moduleId}.lectures.${lectureId}.isAwardReceived`]: true,
  });

  const courseDataNew = await getDoc(courseDocRef);
  if (courseDataNew.exists()) {
    setCourseData(courseDataNew.data())
  } else {
    console.log("No such document!");
  }

  await saveUsersAwardDB(isUserAuthorized, userData, setUserData, greenCoinCount, expCount, goldCoinCount)
}

export const saveUsersAwardDB = async(isUserAuthorized, userData, setUserData, greenCoinCount, expCount, goldCoinCount) => {
  const userDocRef = doc(db, "users", isUserAuthorized.uid);

  if(greenCoinCount){
    let currentGreenCoinCount = +userData.greenCoinAmount + greenCoinCount;

    await updateDoc(userDocRef, {
      greenCoinAmount: currentGreenCoinCount,
    });
  }

  if(expCount){
    let currentExpCount = +userData.experienceAmount + expCount;

    await updateDoc(userDocRef, {
      experienceAmount: currentExpCount,
    });
  }

  if(goldCoinCount){
    let currentGoldCoinCount = +userData.goldCoinAmount + goldCoinCount;

    await updateDoc(userDocRef, {
      goldCoinAmount: currentGoldCoinCount,
    });
  }


  const userDataNew = await getDoc(userDocRef);
  if (userDataNew.exists()) {
    setUserData(userDataNew.data())
  } else {
    console.log("No such document!");
  }
}

// export const updateLectureProgress = async (isUserAuthorized, courseId, moduleId, lectureId, pageCompletedId, courseData, setCourseData) => {
//   const lectureDocRef = doc(db, "courses", isUserAuthorized.uid);
//
//   let currentPageProgress = courseData[`course_${courseId}`][`modules`][`module_${moduleId}`][`lectures`][`lecture_${lectureId}`].pageProgress.split('')
//   currentPageProgress[pageCompletedId] = '1'
//   let resultPageProgress = currentPageProgress.join('')
//
//   await updateDoc(lectureDocRef, {
//     [`course_${courseId}.modules.module_${moduleId}.lectures.lecture_${lectureId}.pageProgress`]: `${resultPageProgress}`,
//   });
//
//   const courseDataNew = await getDoc(lectureDocRef);
//   if (courseDataNew.exists()) {
//     setCourseData(courseDataNew.data())
//   } else {
//     console.log("No such document!");
//   }
// }
