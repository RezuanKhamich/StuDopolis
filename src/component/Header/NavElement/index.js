import React from "react";
import styled from "styled-components";
import {Badge} from "@mui/material";


const ListElem = styled('li')`
  position: relative;
`
const ListRef = styled('button')`
  display: block;
  background-color: transparent;
  width: 100%;
  border: none;
  padding: 0.5rem;
  &:hover{
    cursor: pointer;
    background-color: rgba(256,256,256, 0.2);
  }
  
  @media (max-width: 430px) {
    padding: 0 16px;
    height: 58px;
  }
`
const ListImg = styled('img')`
  width: 28px;
  margin: 0 auto 5px auto;
  &.logo{
    border-radius: 50%;
    width: 80px;
    margin: 0;
  }
  @media (max-width: 430px) {
    &.logo{
      width: 32px;
    }
    margin: 0;
  }
`
const ListText = styled('p')`
  color: white;
  text-align: center;
  font-size: 14px;
`

const NavElement = ({
  titleName, titleImg, titleMsg, isLogo,
}) => {
  const { innerWidth: width, innerHeight: height } = window;

  return(
    <ListElem>
      <ListRef>
        <Badge color="primary" badgeContent={titleMsg ? 1 : null}>
          <ListImg className={isLogo ? "logo" : 'null'} src={titleImg} alt=""/>
        </Badge>
        { width > 520 ? <ListText>{titleName}</ListText> : null }
      </ListRef>
    </ListElem>
  )
}

export default NavElement