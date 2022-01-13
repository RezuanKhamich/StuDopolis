import React, {useState} from "react";

import SignUp from "../SignUp/SignUp";
import SignIn from "../SignIn/SignIn";

const Home = () => {
  const [createAccount, setCreateAccount] = useState(false)

  const handleClick = () => {
    setCreateAccount(!createAccount);
  }
  return(
    <>
      {
        createAccount ? <SignUp handleClick={handleClick}></SignUp> : <SignIn handleClick={handleClick}></SignIn>
      }
    </>
  )
}

export default Home;