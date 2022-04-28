import React, {useEffect, useState} from "react";
import {Icon, Typography} from "@mui/material";
import styled from "styled-components";

const TimerWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: end;
  margin-top: 20px;
`;

const Timer = ({ startValue, timeEndHandler }) => {

  const [seconds, setSeconds ] =  useState(startValue);
  const [onceStartTimeEndHandler, setOnceStartTimeEndHandler] = useState(true)

  useEffect(()=>{
    let myInterval = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      }
      if (seconds === 0 && onceStartTimeEndHandler) {
        timeEndHandler()
        setOnceStartTimeEndHandler(false)
      }
    }, 1000)
    return ()=> {
      clearInterval(myInterval);
    };
  });

  return (
    <TimerWrapper>
      <Typography gutterBottom variant="h5" component="div" color="gray" display="flex" alignItems="center">
        <Icon style={{ marginRight: '5px' }} color="warning">timer</Icon>
        {seconds}
      </Typography>
    </TimerWrapper>
  )
}

export default Timer;