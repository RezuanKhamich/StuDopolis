import {useMemo} from "react";

export const useAllCoursesProgress = (courseData) => (
  useMemo(() => {
    let totalCountLessons = [];
    let completedLessons = [];

    if(courseData){
      for(let k = 0; k < Object.keys(courseData).length; k++){
        totalCountLessons[k] = 0;
        completedLessons[k] = 0;
        for(let i = 0; i < Object.keys(courseData[`course_${k}`]).length; i++){
          for(let j = 0; j < Object.keys(courseData[`course_${k}`][`module_${i}`]).length - 1; j++){
            let separateArr = courseData[`course_${k}`][`module_${i}`][`lecture_${j}`].pageProgress.split("")
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

    if(courseData){
      for(let j = 0; j < Object.keys(courseData[`course_${courseIndex}`]).length; j++){
        totalCountLessons[j] = 0;
        completedLessons[j] = 0;

        for(let i = 0; i < Object.keys(courseData[`course_${courseIndex}`][`module_${j}`]).length - 1; i++){
          let separateArr = courseData[`course_${courseIndex}`][`module_${j}`][`lecture_${i}`].pageProgress.split("")
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