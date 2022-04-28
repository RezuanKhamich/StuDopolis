import Snackbar from "../../component/Shackbar";
import goldCoinImg from "../../media/GoldCoin.png";
import greenCoinImg from "../../media/GreenCoin.png"
import experienceImg from "../../media/experience.png";
import React from "react";

export const giveUserAwards = (greenCoin, experience, goldCoin) => {
  const awardsType = [greenCoin, experience, goldCoin];
  return(
    <Snackbar message={`Получена награда в +${greenCoin}`} awardsType={awardsType} rightIcon={greenCoinImg} />
  )
}