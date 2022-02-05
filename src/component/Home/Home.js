import React, {useState} from "react";

import SignUp from "../SignUp/SignUp";
import SignIn from "../SignIn/SignIn";
import Profile from "./Profile";

const Home = () => {
  const [createAccount, setCreateAccount] = useState(false)
  const [isUserAuthorized, setIsUserAuthorized] = useState(false)

  const handleClick = () => {
    setCreateAccount(!createAccount);
  }
  return(
    <>
      {
        isUserAuthorized ? <Profile />
          : createAccount ? <SignUp handleClick={handleClick}></SignUp> : <SignIn handleClick={handleClick}></SignIn>
      }
    </>
  )
}

export default Home;