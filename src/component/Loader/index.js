import React from "react";
import styled from "styled-components";

const LoaderWrapper = styled('div')`
  margin: 10% auto;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  
  & {
    width: 220px;
    height: 220px;
    position: relative;
  }
  &:after,
  &:before {
    content: "";
    border-radius: 50%;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    transform-origin: center center;
  }
  &:before {
    box-shadow: inset 0 20px 0 rgba(0, 250, 250, 0.6), inset 20px 0 0 rgba(0, 200, 200, 0.6), inset 0 -20px 0 rgba(0, 150, 200, 0.6), inset -20px 0 0 rgba(0, 200, 250, 0.6);
    animation: rotate-before 2s -0.5s linear infinite;
  }
  &:after {
    box-shadow: inset 0 20px 0 rgba(250, 250, 0, 0.6), inset 20px 0 0 rgba(250, 200, 0, 0.6), inset 0 -20px 0 rgba(250, 150, 0, 0.6), inset -20px 0 0 rgba(250, 100, 0, 0.6);
    animation: rotate-after 2s -0.5s linear infinite;
  }
  @keyframes rotate-after {
    0% {transform: rotateZ(0deg) scaleX(1) scaleY(1);}
    50% {transform: rotateZ(180deg) scaleX(0.82) scaleY(0.95);}
    100% {transform: rotateZ(360deg) scaleX(1) scaleY(1);}
  }
  @keyframes rotate-before {
    0% {transform: rotateZ(0deg) scaleX(1) scaleY(1);}
    50% {transform: rotateZ(-180deg) scaleX(0.95) scaleY(0.85);}
    100% {transform: rotateZ(-360deg) scaleX(1) scaleY(1);}
  }
`

const Loader = () => {
  return (
    <LoaderWrapper ></LoaderWrapper>
  )
}

export default Loader