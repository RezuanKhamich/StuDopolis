import React, {useContext} from "react";
import styled from "styled-components";
import StudyPlatform from "./containers/StudyPlatform";
import Navbar from "./containers/Header/Navbar";
import Model from "./containers/Model";
import Footer from "./containers/Footer";
import Rating from "./containers/Rating";
import { Route, Routes } from "react-router-dom";
import {mainColor} from "./constants/colors";
import Home from "./containers/Home/Home";
import {useState} from "react";

import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';
import { getAnalytics } from "firebase/analytics";
import { getDatabase, ref, set } from "firebase/database";

const AppStyle = styled('div')`
  padding-left: 100px;
  color: ${mainColor};
  position: relative;
  min-height: 100%;
  padding-bottom: 120px;
`

function App() {


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: "AIzaSyDOk2r7wsQoBqKxaNYpkU6x0r7uuB9-asg",
    authDomain: "studopolis-524ce.firebaseapp.com",
    projectId: "studopolis-524ce",
    storageBucket: "studopolis-524ce.appspot.com",
    messagingSenderId: "633581099980",
    appId: "1:633581099980:web:5b893cc54dd7b512ff1b69",
    measurementId: "G-TE91R645NM"
  };


  // const {auth} = useContext(Context)
  // const [user, loading, error] = useAuthState(auth)
  //
  // if(loading){
  //   return <Loader/>
  // }

  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);
  const [value, setValue] = useState('')

  const handleChange = (event) => {
    setValue(event.target.value)
  }

  async function getCities(db) {
    const citiesCol = collection(db, 'cities');
    const citySnapshot = await getDocs(citiesCol);
    const cityList = citySnapshot.docs.map(doc => doc.data());
    console.log(cityList);
  }

  function writeUserData(userId, name, email, imageUrl) {
    const db = getDatabase();
    set(ref(db, 'users/' + userId), {
      username: name,
      email: email,
      profile_picture : imageUrl
    });
    console.log('hi')
  }

  const handleClick = () => {
    console.log(value)
    // let messageRef = fire.database.ref('messages').orderByKey().limitToLast
    // fire.database.ref('messages').push(value)


    // Get a list of cities from your database
    // const database = getDatabase();
    // console.log(database)
    // getCities(db)

    writeUserData(2, 'Alina', 'kham@mail.ru', 'http')
  }

  return (
    <React.Fragment>
      <Navbar />
      <div>
        <input type="text" value={value} onChange={handleChange}/>
        <button onClick={handleClick} >Send</button>
      </div>
      <AppStyle>
        <Routes>
          {/*<Route path='/' element={<App />} />*/}
          <Route path='home' element={<Home />} />
          <Route path='learn' element={<StudyPlatform />} />
          <Route path='rating' element={<Rating />} />
          <Route path='model' element={<Model />}/>
        </Routes>
      </AppStyle>
      {/*Показывать только на главной странице*/}
      {/*<Footer />*/}
    </React.Fragment>
  );
}

export default App;
