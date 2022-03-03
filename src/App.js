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
import { auth } from './firebase'
import { onAuthStateChanged } from "firebase/auth";
import Courses from "./component/Courses";
import Modules from "./component/Modules";
import Freelance from "./component/Freelance";
import {doc, getDoc} from "firebase/firestore";
import {useCourseData, useUserData} from "./hooks";

const AppStyle = styled('div')`
  padding-left: 100px;
  color: ${mainColor};
  position: relative;
  min-height: 100%;
  padding-bottom: 120px;
`

const App = () => {
  const userAuthData = JSON.parse(localStorage.getItem('st_user_authorized'))

  const [userData, setUserData] = useUserData(userAuthData);
  const [courseData, setCourseData] = useCourseData(userAuthData);

  return (
    <AuthProvider>
      <Navbar />
      <AppStyle>
        <Routes>
          {/*<Route path="/" element={<App />} />*/}
          <Route path='/' element={<Home userData={userData} setUserData={setUserData} setCourseData={setCourseData} courseData={courseData} />} />
          <Route path='courses' element={<Courses courseData={courseData}/>} />
          <Route path='rating' element={<Rating />} />
          <Route path='model' element={<Model />}/>
          <Route path='career' element={<Career />}/>
          <Route path='freelance' element={<Freelance />}/>
          <Route path='administration' element={<Admin />}/>

          <Route path='courses/modules' element={<Modules courseData={courseData} />} />
          <Route path='courses/modules/learn' element={<StudyPlatform courseData={courseData} setCourseData={setCourseData} userData={userData} />} />

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
