import React from 'react';
import styled from "styled-components";
import Button from '@mui/material/Button';
import { SnackbarProvider, useSnackbar } from 'notistack';

const MessageWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const LeftIcon = styled.img`
  width: 30px;
  margin-right: 15px;
`;

const RightIcon = styled.img`
  width: 30px;
  margin-left: 5px;
`;

const ButtonWrapper = styled.div`
  margin-top: 20px;
  text-align: center;
`;

function MyApp({ awardsType, leftIcon, rightIcon, saveUserAwardHandler, awardBtnDisabled }) {
  const { enqueueSnackbar } = useSnackbar();
  const fillAwardsType = awardsType.filter(el => el !== undefined)
  let awardIndex = 0;

  const handleClickVariant = (variant) => () => {
    enqueueSnackbar(ResultMessage(), {
      variant,
      anchorOrigin: {
        vertical: 'bottom',
        horizontal: 'right',
      }, });
  };

  const ResultMessage = () => {
    return (
      <MessageWrapper>
        { leftIcon && <LeftIcon src={leftIcon} /> }
        Получена награда +{fillAwardsType[awardIndex]}
        { rightIcon && <RightIcon src={rightIcon[awardIndex]} /> }
      </MessageWrapper>
    )
  }

  return (
    <ButtonWrapper>
      <Button
        variant="contained"
        color='success'
        disabled={awardBtnDisabled}
        onClick={() => {
          fillAwardsType.map((elem, index) => {
            awardIndex = index;
            handleClickVariant()();
          })
          saveUserAwardHandler(fillAwardsType[0], fillAwardsType[1], fillAwardsType[3])
        }}>Получить награду</Button>
    </ButtonWrapper>
  );
}

const Snackbar = ({ awardsType, rightIcon, leftIcon, saveUserAwardHandler, awardBtnDisabled }) => (
  <SnackbarProvider maxSnack={3}>
    <MyApp
      awardsType={awardsType}
      leftIcon={leftIcon}
      rightIcon={rightIcon}
      saveUserAwardHandler={saveUserAwardHandler}
      awardBtnDisabled={awardBtnDisabled}
    />
  </SnackbarProvider>
)

export default Snackbar;