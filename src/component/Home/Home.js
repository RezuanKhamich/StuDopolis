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
    // setCreateAccount(!createAccount);

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

    {/*  const [open, setOpen] = React.useState(false);*/}

    {/*  const handleClickOpen = () => {*/}
    {/*  setOpen(true);*/}
    {/*};*/}

    {/*  const handleClose = () => {*/}
    {/*  setOpen(false);*/}
    {/*};*/}

    {/*  <Button variant="outlined" onClick={handleClickOpen}>*/}
    {/*    Open alert dialog*/}
    {/*  </Button>*/}
    {/*  <Dialog*/}
    {/*    open={open}*/}
    {/*    onClose={handleClose}*/}
    {/*    aria-labelledby="alert-dialog-title"*/}
    {/*    aria-describedby="alert-dialog-description"*/}
    {/*  >*/}
    {/*    <DialogTitle id="alert-dialog-title">*/}
    {/*      {"Use Google's location service?"}*/}
    {/*    </DialogTitle>*/}
    {/*    <DialogContent>*/}
    {/*      <DialogContentText id="alert-dialog-description">*/}
    {/*        Let Google help apps determine location. This means sending anonymous*/}
    {/*        location data to Google, even when no apps are running.*/}
    {/*      </DialogContentText>*/}
    {/*    </DialogContent>*/}
    {/*    <DialogActions>*/}
    {/*      <Button onClick={handleClose}>Disagree</Button>*/}
    {/*      <Button onClick={handleClose} autoFocus>*/}
    {/*        Agree*/}
    {/*      </Button>*/}
    {/*    </DialogActions>*/}
    {/*  </Dialog>*/}
    </>
  )
}

export default Home;