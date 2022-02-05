import React from "react";
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
import { app } from './firebase'
import { auth } from './firebase'
import { onAuthStateChanged } from "firebase/auth";
import Courses from "./component/Courses";
import Modules from "./component/Modules";
import Freelance from "./component/Freelance";

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
          <Route path='/' element={<Home />} />
          <Route path='courses' element={<Courses />} />
          <Route path='rating' element={<Rating />} />
          <Route path='model' element={<Model />}/>
          <Route path='career' element={<Career />}/>
          <Route path='freelance' element={<Freelance />}/>
          <Route path='administration' element={<Admin />}/>

          <Route path='courses/modules' element={<Modules />} />
          <Route path='courses/modules/learn' element={<StudyPlatform />} />

          {
            onAuthStateChanged(auth, (user) => {
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
