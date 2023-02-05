import TrainingPage_1 from "../TrainingPage_1";
import {Button} from "@mui/material";
import React, {useState} from "react";
import TrainingPage_2 from "../TrainingPage_2";
import TrainingPage_3 from "../TrainingPage_3";

const TrainingPages = ({ setShowTrainingPopup, setProgressCells, progressCells, pageNum, setPageNum, switchToSignUp }) => {
  const switchPageHandler = () => {
    if (pageNum < 2) {
      const newPageNum = pageNum + 1;
      const nextCellState = [...progressCells]
      nextCellState[newPageNum - 1].state = 'done';
      nextCellState[newPageNum].state = 'current';

      setPageNum(newPageNum);
      setProgressCells([...nextCellState]);
    }
    else {
      setShowTrainingPopup(false);
      switchToSignUp();
    }
  }

  return (
    <>
      { pageNum === 0 ? <TrainingPage_1 /> : null}
      { pageNum === 1 ? <TrainingPage_2 switchPageHandler={switchPageHandler} /> : null}
      { pageNum === 2 ? <TrainingPage_3 /> : null}

      {
        pageNum !== 1 ? (
          <Button
            variant="contained"
            color='success'
            size="large"
            onClick={switchPageHandler}
          >
            Получить +2000 GCoin
          </Button>
        ) : null
      }
    </>
  )
}

export default TrainingPages;