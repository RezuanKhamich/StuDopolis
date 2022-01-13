import React from "react";
import { Route, Routes } from "react-router-dom";
import styled from "styled-components";

import Home from "./containers/Home/Home";
import StudyPlatform from "./containers/Learning";
import Navbar from "./containers/Header/Navbar";
import Model from "./containers/Model";
import Career from "./containers/Career";
import Admin from "./containers/Admin";
import Rating from "./containers/Rating";
import Footer from "./containers/Footer";

import {AuthProvider} from "./context/AuthContext";
import {mainColor} from "./constants/colors";
import { app } from './firebase'
import { auth } from './firebase'
import { onAuthStateChanged } from "firebase/auth";
import Courses from "./containers/Courses";
import Modules from "./containers/Modules";

const AppStyle = styled('div')`
  padding-left: 100px;
  color: ${mainColor};
  position: relative;
  min-height: 100%;
  padding-bottom: 120px;
`

function App() {
  return (
    <AuthProvider>
      <Navbar />
      <AppStyle>
        <Routes>
          {/*<Route path="/" element={<App />} />*/}
          <Route path='home' element={<Home />} />
          <Route path='courses' element={<Courses />} />
          <Route path='rating' element={<Rating />} />
          <Route path='model' element={<Model />}/>
          <Route path='career' element={<Career />}/>
          <Route path='administration' element={<Admin />}/>

          <Route path='courses/modules' element={<Modules />} />
          <Route path='courses/modules/learn' element={<StudyPlatform />} />

          {
            onAuthStateChanged(auth, (user) => {
              console.log(user)
              return user ? 2 : console.log('hi')
            })
          }

        </Routes>
      </AppStyle>
      {/*Показывать только на главной странице*/}
      {/*<Footer />*/}
    </AuthProvider>
  );
}

export default App;
