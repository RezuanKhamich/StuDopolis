import React from "react";
import {styled} from "@mui/material";

const BadgeContent = styled('span')`
  background-color: ${props => props.color ? props.color : '#d2d2d2'};
  border-radius: 5px;
  padding: 3px 10px;
  font-weight: 500;
  color: ${props => props.color === '#d2d2d2' ? '#323232' : 'white'};
  ${props => props.small && `
    font-size: 14px;
    padding: 2px 8px;
  `}
`;

const CustomBadge = ({ sx, message, colorType, small }) => {
  const colorParameters = [
    {title: 'default', color: '#d2d2d2'},
    {title: 'success', color: '#2e7d32'},
    {title: 'warning', color: '#ed6c02'},
    {title: 'primary', color: '#1976d2'},
  ]

  return(
    <BadgeContent style={sx} color={colorParameters[colorType].color} small={small}>
      {message}
    </BadgeContent>
  );
}

export default CustomBadge;