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

function MyApp({ message, leftIcon, rightIcon }) {
  const { enqueueSnackbar } = useSnackbar();

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
        { message }
        { rightIcon && <RightIcon src={rightIcon} /> }
      </MessageWrapper>
    )
  }

  return (
    <React.Fragment>
      <Button onClick={handleClickVariant()}>Получить награду</Button>
    </React.Fragment>
  );
}

const Snackbar = ({ message, leftIcon, rightIcon }) => (
  <SnackbarProvider maxSnack={3}>
    <MyApp message={message} leftIcon={leftIcon} rightIcon={rightIcon} />
  </SnackbarProvider>
)

export default Snackbar;