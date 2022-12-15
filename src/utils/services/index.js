import Snackbar from "../../component/Shackbar";
import goldCoinImg from "../../media/GoldCoin.png";
import greenCoinImg from "../../media/GreenCoin.png"
import experienceImg from "../../media/experience.png";
import React from "react";
import teacherData from "../../component/Header/Navbar/teacherData.json";

export const giveUserAwards = (awardBtnDisabled, saveUserAwardHandler, greenCoin, experience, goldCoin) => {
  const awardsType = [Math.floor(greenCoin), Math.floor(experience), goldCoin];
  const awardIcons = [greenCoinImg, experienceImg, goldCoinImg];

  return(
    <Snackbar
      awardsType={awardsType}
      rightIcon={awardIcons}
      saveUserAwardHandler={saveUserAwardHandler}
      awardBtnDisabled={awardBtnDisabled}
    />
  )
}

export const isTeacherAccount = () => (
  teacherData.teacherHash === JSON.parse(localStorage.getItem('st_user_authorized'))?.uid
)

