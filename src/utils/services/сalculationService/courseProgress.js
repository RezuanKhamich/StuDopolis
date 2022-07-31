import {useMemo} from "react";
import {doc, getDoc, updateDoc} from "firebase/firestore";
import {db} from "../../../firebase";
import {materialCollection} from "../../../data/courseData";

export const useAllCoursesProgress = (courseData) => (
  useMemo(() => {
    let totalCountLessons = [];
    let completedLessons = [];

    if(courseData){
      for(let k = 0; k < Object.keys(courseData).length; k++){
        totalCountLessons[k] = 0;
        completedLessons[k] = 0;

        for(let i = 0; i < Object.keys(courseData[`course_${k}`][`modules`]).length; i++){
          totalCountLessons[k] += Object.keys(courseData[`course_${k}`][`modules`][i][`lectures`]).length;
          for(let j = 0; j < Object.keys(courseData[`course_${k}`][`modules`][i][`lectures`]).length; j++){
            let separateArr = courseData[`course_${k}`][`modules`][i][`lectures`][j].pageProgress.split("")
            if (!separateArr.find((el) => el === '0')) completedLessons[k]++
          }
        }
      }
    }
    return [completedLessons, totalCountLessons]
  },[courseData])
)

export const useModulesProgress = (courseData, courseIndex) => (
  useMemo(() => {
    let totalCountLessons = [];
    let completedLessons = [];

    if(courseData[`course_${courseIndex}`]){
      for(let j = 0; j < Object.keys(courseData[`course_${courseIndex}`][`modules`]).length; j++){
        totalCountLessons[j] = 0;
        completedLessons[j] = 0;

        totalCountLessons[j] += Object.keys(courseData[`course_${courseIndex}`][`modules`][j][`lectures`]).length;
        for(let i = 0; i < Object.keys(courseData[`course_${courseIndex}`][`modules`][j][`lectures`]).length; i++){
          let separateArr = courseData[`course_${courseIndex}`][`modules`][j][`lectures`][i].pageProgress.split("")
          if (!separateArr.find((el) => el === '0')) completedLessons[j]++
        }
      }
    }
    return [completedLessons, totalCountLessons]
  },[courseData])
)

export const useLecturesProgress = (courseData, courseIndex, moduleIndex) => (
  useMemo(() => {
    let lessonData = []

    if (courseData[`course_${courseIndex}`]) {
      for (let i = 0; i < Object.keys(courseData[`course_${courseIndex}`][`modules`][moduleIndex][`lectures`]).length; i++) {
        lessonData.push(courseData[`course_${courseIndex}`][`modules`][moduleIndex][`lectures`][i].pageProgress.split(""))
      }
    }

    return lessonData
  }, [courseData])
)

export const getFullLessonCountInCourse = (currentCourseData) => {
  let totalCountLessons = 0;

  if(currentCourseData){
    currentCourseData.info.lectureCountDB.forEach(el => {
      totalCountLessons += el;
    })
  }
  return totalCountLessons;
}

export const getFullModuleCountInCourse = (currentCourseData) => currentCourseData ? Object.keys(currentCourseData[`modules`]).length : null

export const getFullLectureQuestionCount = (currentCourseData, courseIndex) => {
  // const externalData = materialCollection()[courseIndex][elem.moduleId][elem.lectureId].freelanceTasks[elem.taskId]

  let totalQuestionCount = 0

  if(currentCourseData){
    for(let i = 0; i < Object.keys(currentCourseData[`modules`]).length; i++){
      for(let j = 0; j < Object.keys(currentCourseData[`modules`][i][`lectures`]).length; j++){
        totalQuestionCount += materialCollection()[courseIndex][i][j]?.pageFlow?.page2?.[0]?.pageTest.length || 0
      }
    }
  }

  return totalQuestionCount;
}