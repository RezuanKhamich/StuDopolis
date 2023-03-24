import Snackbar from "../../component/Shackbar";
import goldCoinImg from "../../media/GoldCoin.png";
import greenCoinImg from "../../media/GreenCoin.png"
import experienceImg from "../../media/experience.png";
import React from "react";
import teacherData from "../../component/Header/Navbar/teacherData.json";
import {useSnackbar} from "notistack";
import styled from "styled-components";

const SnackbarButton = styled('a')`
  border: 1px solid;
  border-radius: 6px;
  padding: 8px;
  background: none;
  color: white;
  font-size: 14px;
  &:hover{
    cursor: pointer;
  }
`;

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

export function UnAuthorizedSnackbarBox() {
  const { enqueueSnackbar } = useSnackbar();
  const action = () => <SnackbarButton href="https://studopolis-school.ru/" > Открыть</SnackbarButton>;

  enqueueSnackbar('Доступ к платформе StuDopolis', { action,
    persist: true,
    variant: 'success',
    anchorOrigin: {
      vertical: 'bottom',
      horizontal: 'right',
    }}
  );
  return <></>
}

