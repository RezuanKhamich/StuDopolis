import React from "react";
import styled from "styled-components";
import GoldCoin from '../../media/GoldCoin.png'
import GreenCoin from '../../media/GreenCoin.png'
import Experience from '../../media/experience.png'

const IconWrapper = styled('img')`
  display: inline-block;
  width: 30px;
  margin: 5px;
  vertical-align: middle;
`

const GameIcon = ({
  icon,
}) => {
  const icons = [
    Experience,
    GoldCoin,
    GreenCoin
  ]

  return(
    <IconWrapper src={icons[icon]}/>
  )
}

export default GameIcon