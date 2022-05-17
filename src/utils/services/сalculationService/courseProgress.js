import {useMemo} from "react";
import {doc, getDoc, updateDoc} from "firebase/firestore";
import {db} from "../../../firebase";

export const useAllCoursesProgress = (courseData) => (
  useMemo(() => {
    let totalCountLessons = [];
    let completedLessons = [];

    if(courseData){
      for(let k = 0; k < Object.keys(courseData).length; k++){
        totalCountLessons[k] = 0;
        completedLessons[k] = 0;

        for(let i = 0; i < Object.keys(courseData[`course_${k}`][`modules`]).length; i++){
          for(let j = 0; j < Object.keys(courseData[`course_${k}`][`modules`][i][`lectures`]).length - 1; j++){
            let separateArr = courseData[`course_${k}`][`modules`][i][`lectures`][j].pageProgress.split("")
            separateArr.filter((el) => {
              totalCountLessons[k]++
              if(el === '1') completedLessons[k]++
            })
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

        for(let i = 0; i < Object.keys(courseData[`course_${courseIndex}`][`modules`][j][`lectures`]).length; i++){
          let separateArr = courseData[`course_${courseIndex}`][`modules`][j][`lectures`][i].pageProgress.split("")
          separateArr.filter((el) => {
            totalCountLessons[j]++
            if(el === '1') completedLessons[j]++
          })
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
      for (let i = 0; i < Object.keys(courseData[`course_${courseIndex}`][`modules`][moduleIndex][`lectures`]).length - 1; i++) {
        lessonData.push(courseData[`course_${courseIndex}`][`modules`][moduleIndex][`lectures`][i].pageProgress.split(""))
      }
    }

    return lessonData
  }, [courseData])
)