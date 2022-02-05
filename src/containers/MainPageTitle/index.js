import React from "react";
import styled from "styled-components";

const ContentMainTitle = styled('h1')`
  text-align: center;
  margin-bottom: 30px;
  margin-top: 30px;
  font-size: 32px;
`

const MainPageTitle = props => {
  return(
    <ContentMainTitle>
      {props.children}
    </ContentMainTitle>
  )
}

export default MainPageTitle