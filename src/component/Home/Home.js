import React, {useEffect, useState} from "react";

import SignUp from "../SignUp/SignUp";
import SignIn from "../SignIn/SignIn";
import Profile from "./Profile";
import moment from "moment";

const Home = ({userData, setUserData, setCourseData, courseData}) => {
  const [createAccount, setCreateAccount] = useState(false)
  const [isUserAuthorized, setIsUserAuthorized] = useState(localStorage.getItem('st_user_authorized'))

  const handleClick = () => {
    setCreateAccount(!createAccount);
  }

  return(
    <>
      {
        isUserAuthorized ? <Profile userData={userData} setIsUserAuthorized={setIsUserAuthorized} courseData={courseData}/>
          : createAccount ? <SignUp handleClick={handleClick}></SignUp> : <SignIn setUserData={setUserData} handleClick={handleClick} setCourseData={setCourseData}></SignIn>
      }
    </>
  )
}

export default Home;