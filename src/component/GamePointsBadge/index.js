import React from "react";
import styled from "styled-components";

const PointContainer = styled('span')`
  background-color: ${props => props.color ? props.color : '#2e7d32'};
  color: white;
  padding: 3px 10px;
  border-radius: ${props => props.rectangular ? '5px' : '3px 3px 3px 26px'};
  ${props => props.small && `
    font-size: 14px;
    padding: 2px 8px;
  `}
`;

const GamePointsBadge = ({ count, pointType= 0, small, rectangular }) => {
  const pointsParameters = [
    {title: 'G', color: '#2e7d32'},
    {title: 'Exp', color: '#1976d2'},
  ]
  return (
    <PointContainer color={pointsParameters[pointType].color} small={small} rectangular={rectangular}>
      {`+${count} ${pointsParameters[pointType].title}`}
    </PointContainer>
  );
}

export default GamePointsBadge;