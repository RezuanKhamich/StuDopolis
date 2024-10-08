import React, {useEffect, useState} from "react";
import { Route, Routes } from "react-router-dom";
import styled from "styled-components";

import Home from "./component/Home/Home";
import StudyPlatform from "./component/Learning";
import Navbar from "./component/Header/Navbar";
import Model from "./component/Model";
import Career from "./component/Career";
import Admin from "./component/Admin";
import Rating from "./component/Rating";
import Footer from "./component/Footer";

import {AuthProvider} from "./context/AuthContext";
import {mainColor} from "./constants/colors";
import {app, db} from './firebase'
import Courses from "./component/Courses";
import Modules from "./component/Modules";
import Freelance from "./component/Freelance";
import {doc, getDoc} from "firebase/firestore";
import Messages from "./component/Messages";
import FreelanceTask from "./component/FreelanceTask";
import {useDispatch, useSelector} from "react-redux";
import {setCourseData, setFreelanceData, setShopData, setUserData} from "./utils/reducers/repoReducer";
import Shop from "./component/Shop";
import News from "./component/News";
import teacherData from "./component/Header/Navbar/teacherData.json";
import Student from "./component/Admin/Student";
import LectureProgress from "./component/Admin/LectureProgress";

const AppStyle = styled('div')`
  padding-left: 100px;
  color: ${mainColor};
  position: relative;
  min-height: 100%;
  padding-bottom: 120px;

  @media (max-width: 430px) {
    padding: 0 10px 80px 10px;
  }
`

const App = () => {
  const userAuthData = JSON.parse(localStorage.getItem('st_user_authorized'))
  const dispatch = useDispatch();
  const [currentModuleId, setCurrentModuleId] = useState(0)
  useEffect(async () => {
    if (userAuthData) {
      const courseSnap = await getDoc(doc(db, "courses", userAuthData.uid))
      if (courseSnap.exists()) {
        dispatch(setCourseData(courseSnap.data()));
      } else {
        console.log("Не найдено courseSnap!");
      }

      const userDataSnap = await getDoc(doc(db, "users", userAuthData.uid))
      if (userDataSnap.exists()) {
        dispatch(setUserData(userDataSnap.data()));
      } else {
        console.log("Не найдено userDataSnap!");
      }

      const freelanceDataSnap = await getDoc(doc(db, "freelance", userAuthData.uid))
      if (freelanceDataSnap.exists()) {
        dispatch(setFreelanceData(freelanceDataSnap.data()));
      } else {
        console.log("Не найдено freelanceDataSnap!");
      }

      const shopDataSnap = await getDoc(doc(db, "shop", userAuthData.uid))
      if (shopDataSnap.exists()) {
        dispatch(setShopData(shopDataSnap.data()));
      } else {
        console.log("Не найдено shopDataSnap!");
      }
    }
  }, [userAuthData])

  return (
    <AuthProvider>
      <Navbar />
      <AppStyle>
        <Routes>
          {/*<Route path="/" element={<App />} />*/}
          <Route path='/' element={<Home />} />
          <Route path='courses' element={<Courses />} />
          <Route path='rating' element={<Rating />} />
          <Route path='model' element={<Model />}/>
          {/*<Route path='career' element={<Career />}/>*/}
          <Route path='freelance' element={<Freelance />}/>
          <Route path='freelance/task' element={<FreelanceTask />}/>
          <Route path='administration' element={ teacherData.teacherHash === userAuthData?.uid ? <Admin /> : null}/>
          <Route path='administration/student' element={teacherData.teacherHash === userAuthData?.uid ? <Student /> : null}/>
          <Route path='administration/student/progress' element={teacherData.teacherHash === userAuthData?.uid ? <LectureProgress /> : null}/>
          <Route path='shop' element={<Shop />}/>
          {/*<Route path='messages' element={<Messages />}/>*/}
          <Route path='news' element={<News />}/>

          <Route path='courses/modules' element={<Modules setCurrentModuleId={setCurrentModuleId} />} />
          <Route path='courses/modules/learn' element={<StudyPlatform />} />

          {/*{*/}
          {/*  onAuthStateChanged(auth, (user) => {*/}
          {/*    return user ? 2 : console.log('hi')*/}
          {/*  })*/}
          {/*}*/}

        </Routes>
      </AppStyle>
      {/*Показывать только на главной странице*/}
      {/*<Footer />*/}
    </AuthProvider>
  );
}

export default App;
