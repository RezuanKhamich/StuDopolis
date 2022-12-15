import React, {useState} from "react";

import SignUp from "../SignUp/SignUp";
import SignIn from "../SignIn/SignIn";
import Profile from "./Profile";
import {useSelector} from "react-redux";
import {isTeacherAccount} from "../../utils/services";

const Home = () => {
  const [createAccount, setCreateAccount] = useState(false)
  const [isUserAuthorized, setIsUserAuthorized] = useState(localStorage.getItem('st_user_authorized'))

  const handleClick = () => {
    setCreateAccount(!createAccount);
  }

  return(
    <>
      {
        isUserAuthorized ? <Profile setIsUserAuthorized={setIsUserAuthorized} />
          // With create account function
          // : createAccount ? <SignUp handleClick={handleClick} /> : <SignIn handleClick={handleClick} />
          : <SignIn handleClick={handleClick} />
      }
      {
        isTeacherAccount() ? (
          <SignUp handleClick={handleClick} />
        ) : null
      }
    </>
  )
}

export default Home;