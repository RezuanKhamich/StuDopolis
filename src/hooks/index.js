import {useEffect, useState} from "react";
import {doc, getDoc} from "firebase/firestore";
import {db} from "../firebase";

export const useUserData = (userAuthData) => {
  const [userData, setUserData] = useState('');

  useEffect(async () => {
    if (userAuthData) {
      const userDataSnap = await getDoc(doc(db, "users", userAuthData.uid))
      if (userDataSnap.exists()) {
        setUserData(userDataSnap.data());
      } else {
        console.log("Не найдено userDataSnap!");
      }
    }
  }, [])

  return [userData, setUserData]
}

export const useCourseData = (userAuthData) => {
  const [courseData, setCourseData] = useState('');

  useEffect(async () => {
    if (userAuthData) {
      const courseSnap = await getDoc(doc(db, "courses", userAuthData.uid))
      if (courseSnap.exists()) {
        console.log(`all`, courseSnap)
        setCourseData(courseSnap.data());
      } else {
        console.log("Не найдено courseSnap!");
      }
    }
  }, [])

  return [courseData, setCourseData]
}