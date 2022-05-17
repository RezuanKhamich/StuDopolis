import Snackbar from "../../component/Shackbar";
import goldCoinImg from "../../media/GoldCoin.png";
import greenCoinImg from "../../media/GreenCoin.png"
import experienceImg from "../../media/experience.png";
import React from "react";

export const giveUserAwards = (awardBtnDisabled, saveUserAwardHandler, greenCoin, experience, goldCoin) => {
  const awardsType = [greenCoin, experience, goldCoin];
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

export const getAllUsers = () => {

}

