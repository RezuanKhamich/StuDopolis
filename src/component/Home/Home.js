import React, {useState} from "react";

import SignUp from "../SignUp/SignUp";
import SignIn from "../SignIn/SignIn";
import Profile from "./Profile";
import { isTeacherAccount } from "../../utils/services";
import Training from "../Training";

const Home = () => {
  const [createAccount, setCreateAccount] = useState(false)
  // const [showTrainingPopup, setShowTrainingPopup] = useState(true)
  const [isUserAuthorized, setIsUserAuthorized] = useState(localStorage.getItem('st_user_authorized'))

  const handleClick = () => {
    setCreateAccount(!createAccount);
  }

  // const switchToSignIn = () => {
  //   setShowTrainingPopup(false);
  // }

  return(
    <>

      {
        isUserAuthorized ?
          <Profile isUserAuthorized={isUserAuthorized} setIsUserAuthorized={setIsUserAuthorized} />
          :
          createAccount ?
            <SignUp handleClick={handleClick} />
            : <>
                {/*<Training*/}
                {/*  showTrainingPopup={showTrainingPopup}*/}
                {/*  setShowTrainingPopup={setShowTrainingPopup}*/}
                {/*  switchToSignIn={switchToSignIn}*/}
                {/*  switchToSignUp={handleClick}*/}
                {/*/>*/}
                <SignIn handleClick={handleClick} />
              </>
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