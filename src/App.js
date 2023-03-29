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
import {doc, getDoc, setDoc} from "firebase/firestore";
import Messages from "./component/Messages";
import FreelanceTask from "./component/FreelanceTask";
import {useDispatch, useSelector} from "react-redux";
import {
  setCourseData,
  setFreelanceData,
  setShopData,
  setUserData,
  setUsersAuthData
} from "./utils/reducers/repoReducer";
import Shop from "./component/Shop";
import News from "./component/News";
import teacherData from "./component/Header/Navbar/teacherData.json";
import Student from "./component/Admin/Student";
import LectureProgress from "./component/Admin/LectureProgress";
import {SnackbarProvider} from 'notistack';
import {UnAuthorizedSnackbarBox} from "./utils/services";
import {createDBArchitecture} from "./utils/services/createCourseDBArchitecture";
import {createFreelanceDBArchitecture} from "./utils/services/createFreelanceDBArchitecture";

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

const SnackbarProviderContainer = styled(SnackbarProvider)`
  @media (max-width: 430px) {
    margin-bottom: 60px;
    position: absolute;
    bottom: 20px;
    left: 50%;
    width: 100%;
    transform: translate(-50%, 0) !important;
  }
`;

const smartUpdateDBStructure = (userStructure, updatedStructure, structName, userAuthData, isMissingStructure, reduxAction, bannedFields, dispatch) => {
  function copyValuesWithDifferences(obj1, obj2, bannedFields) {
    // for (let key in obj1) {
    //   if (typeof obj1[key] === 'object') {
    //     if (!obj2[key]) {
    //       obj2[key] = {};
    //     }
    //     copyValuesWithDifferences(obj1[key], obj2[key], differences ? differences[key] : null);
    //   } else {
    //     obj2[key] = differences && differences[key] !== undefined ? differences[key] : obj1[key];
    //   }
    // }
    for (let key in obj1) {
      if (typeof obj1[key] === 'object' && obj1[key] !== null) {
        if (!obj2[key]) {
          obj2[key] = {};
        }
        copyValuesWithDifferences(obj1[key], obj2[key], bannedFields);
      } else {
        if (!(bannedFields.length && bannedFields.includes(key))) obj2[key] = obj1[key];
      }
    }
  }

  function compareObjectsByKeys(obj1, obj2) {
    const keys1 = Object.keys(obj1);
    const keys2 = Object.keys(obj2);

    if (keys1.length !== keys2.length) {
      return true;
    }

    for (let key of keys1) {
      if (!keys2.includes(key)) {
        return true;
      }
    }

    return false;
  }

  const saveInDBNewStructure = async () => {
    await setDoc(doc(db, structName, userAuthData.uid), updatedStructure);
    dispatch(reduxAction(updatedStructure));
  }
  console.log(compareObjectsByKeys(userStructure, updatedStructure))

  if (isMissingStructure) {
    saveInDBNewStructure();
    // console.log(`${structName} отсутстует: сохранение новой в бд`);
  } else {
    if (compareObjectsByKeys(userStructure, updatedStructure)) {
      copyValuesWithDifferences(userStructure, updatedStructure, bannedFields)
      saveInDBNewStructure();
      // console.log(`${structName} обновлена: сохранение обновленной в бд`)
    } else {
      // console.log(`${structName} не изменена`)
      dispatch(reduxAction(userStructure));
    }
  }
};
// ['courseName', 'modulesName']
const App = () => {
  const userAuthData = useSelector(state => state.repos.userAuthData);
  const dispatch = useDispatch();
  const [currentModuleId, setCurrentModuleId] = useState(0)

  useEffect(() => {
    dispatch(setUsersAuthData(JSON.parse(localStorage.getItem('st_user_authorized'))));
  }, [])

  useEffect(async () => {
    if (userAuthData) {
      const courseSnap = await getDoc(doc(db, "courses", userAuthData.uid))
      if (courseSnap.exists()) {
        dispatch(setCourseData(courseSnap.data()));
        // console.log('данные юзера', courseSnap.data())
        // console.log('данные ожидаемой структуры', createDBArchitecture())
        // smartUpdateDBStructure(courseSnap.data(), createDBArchitecture(), "courses", userAuthData, false, setCourseData, ['courseName', 'modulesName'], dispatch);
      } else {
        smartUpdateDBStructure(courseSnap.data(), createDBArchitecture(), "courses", userAuthData, true, setCourseData, ['courseName', 'modulesName'], dispatch);
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
        // smartUpdateDBStructure(freelanceDataSnap.data(), createFreelanceDBArchitecture(), "freelance", userAuthData, false, setFreelanceData, ['courseName', 'modulesName'], dispatch);
        dispatch(setFreelanceData(freelanceDataSnap.data()));
      } else {
        smartUpdateDBStructure(freelanceDataSnap.data(), createFreelanceDBArchitecture(), "freelance", userAuthData, true, setFreelanceData, ['courseName', 'modulesName'], dispatch);
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
          <Route path='/' element={<Home />} />
          <Route path='courses' element={<Courses />} />
          <Route path='administration' element={ teacherData.teacherHash === userAuthData?.uid ? <Admin /> : null}/>
          <Route path='administration/student' element={teacherData.teacherHash === userAuthData?.uid ? <Student /> : null}/>
          <Route path='administration/student/progress' element={teacherData.teacherHash === userAuthData?.uid ? <LectureProgress /> : null}/>

          {
            userAuthData?.uid ? (
              <>
                <Route path='rating' element={<Rating />} />
                {/*<Route path='model' element={<Model />}/>*/}
                {/*<Route path='career' element={<Career />}/>*/}
                <Route path='freelance' element={<Freelance />}/>
                <Route path='freelance/task' element={<FreelanceTask />}/>
                <Route path='shop' element={<Shop />}/>
                {/*<Route path='messages' element={<Messages />}/>*/}
                <Route path='news' element={<News />}/>
                <Route path='courses/modules' element={<Modules setCurrentModuleId={setCurrentModuleId} />} />
                <Route path='courses/modules/learn' element={<StudyPlatform />} />
              </>
            ) : null
          }
        </Routes>
        {
          !userAuthData?.uid ? (
            <SnackbarProviderContainer persist>
              <UnAuthorizedSnackbarBox />
            </SnackbarProviderContainer>
          ) : null
        }
      </AppStyle>
    </AuthProvider>
  );
}

export default App;
