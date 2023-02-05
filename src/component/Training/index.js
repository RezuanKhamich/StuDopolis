import {Box, Button, Modal, Typography} from "@mui/material";
import styled from "styled-components";
import TrainingPages from "./components/TrainingPages";
import React, {useState} from "react";
import logo from "./media/logo.png";

const Container = styled(Box)`
  width: 80%;
  height: 600px;
  position: fixed;
  background-color: white;
  padding: 30px 20px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  -webkit-transition: box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
  transition: box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
  border-radius: 4px;
  box-shadow: 0px 2px 8px -1px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%);
`;

const ProgressList = styled.ul`
  display: flex;
  justify-content: space-evenly;
  margin-top: 25px;
  padding: 0px;
  & hr {
    width: 62px;
    margin: 0px;
    position: relative;
    top: 15px;
    border: none;
    height: 1px;
    background: #80808047;
  }
`;

const ProgressCell = styled.li`
  list-style-type: none;
  border-radius: 6px;
  border: 1px solid #80808047;
  width: 30px;
  height: 30px;
  text-align: center;
  background: ${props =>
    props.status === 'done' ? 'green'
      : props.status === 'current' ? '#dadada;'
      : 'white'
  };
  color: ${props =>
    props.status === 'done' ? 'white'
      : props.status === 'current' ? 'black'
        : 'black'
  };
`;

const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  & img {
    width: 50px;
    height: 50px;
    margin-right: 10px;
  }
`;

const Training = ({ showTrainingPopup, setShowTrainingPopup, switchToSignIn, switchToSignUp }) => {
  const [pageNum, setPageNum] = useState(0);
  const [progressCells, setProgressCells] = useState([
    { text: 1, state: 'current' },
    { text: 2, state: 'empty' },
    { text: 3, state: 'empty' },
  ])
  return (
    <Modal
      open={showTrainingPopup}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Container>
        <LogoContainer>
          <img src={logo} alt=""/>
          <Typography fontSize={30}>
            StuDopolis
          </Typography>
        </LogoContainer>
        <div style={{ width: '260px', margin: 'auto' }}>
          <ProgressList>
            {
              progressCells.map((el, index) => (
                <>
                  <ProgressCell status={el.state} key={index}>{el.text}</ProgressCell>
                  { index < 2 && <hr/> }
                </>
              ))
            }
          </ProgressList>
        </div>
        <TrainingPages
          setShowTrainingPopup={setShowTrainingPopup}
          setProgressCells={setProgressCells}
          progressCells={progressCells}
          pageNum={pageNum}
          setPageNum={setPageNum}
          switchToSignUp={switchToSignUp}
        />
        {
          pageNum === 0 ? (
            <Button
              style={{display: 'block', margin: 'auto'}}
              variant="outlined"
              onClick={switchToSignIn}
            >
              У меня уже есть аккаунт
            </Button>
          ) : null
        }
      </Container>
    </Modal>
  )
}

export default Training;