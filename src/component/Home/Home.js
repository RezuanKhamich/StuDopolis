import React, {useState} from "react";

import SignUp from "../SignUp/SignUp";
import SignIn from "../SignIn/SignIn";
import Profile from "./Profile";
import {useSelector} from "react-redux";

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
          : createAccount ? <SignUp handleClick={handleClick} /> : <SignIn handleClick={handleClick} />
      }
    </>
  )
}

export default Home;